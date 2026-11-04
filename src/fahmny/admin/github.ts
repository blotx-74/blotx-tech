import type { Content } from '../data';

export interface GhConfig {
  token: string;
  repo: string; // owner/name
  branch: string;
  api?: string; // للاختبار المحلي بس
}

export const DEFAULT_REPO = 'blotx-74/blotx-tech';
export const CONTENT_PATH = 'src/fahmny/content.json';
export const SITEMAP_PATH = 'public/sitemap.xml';
export const SITE = 'https://blotxtech.site';

const CFG_KEY = 'fh_admin_cfg';

export const loadCfg = (): GhConfig | null => {
  try {
    const raw = localStorage.getItem(CFG_KEY);
    return raw ? (JSON.parse(raw) as GhConfig) : null;
  } catch { return null; }
};
export const saveCfg = (c: GhConfig) => {
  try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch { /* ignore */ }
};
export const clearCfg = () => {
  try { localStorage.removeItem(CFG_KEY); } catch { /* ignore */ }
};

async function gh<T>(c: GhConfig, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${c.api ?? 'https://api.github.com'}/repos/${c.repo}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${c.token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
  if (!res.ok) {
    let msg = res.statusText;
    try { msg = (await res.json()).message || msg; } catch { /* ignore */ }
    if (res.status === 401) msg = 'التوكن غلط أو منتهي';
    else if (res.status === 403 || res.status === 404) msg = `مفيش صلاحية أو الريبو/البرانش مش موجود (${msg})`;
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

const decodeUtf8 = (b64: string) => {
  const bin = atob(b64.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(bin, (ch) => ch.charCodeAt(0)));
};

export const blobToBase64 = (b: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] ?? '');
    r.onerror = () => reject(r.error);
    r.readAsDataURL(b);
  });

const textToBase64 = (t: string) => {
  const bytes = new TextEncoder().encode(t);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
};

/** تأكد إن التوكن شغال ويقدر يكتب على الريبو */
export async function verify(c: GhConfig) {
  const r = await gh<{ permissions?: { push?: boolean }; full_name: string }>(c, '');
  if (r.permissions && !r.permissions.push) throw new Error('التوكن ده للقراءة بس. اختار Contents: Read and write');
  await gh(c, `/git/ref/heads/${c.branch}`);
  return r.full_name;
}

export async function loadContent(c: GhConfig): Promise<Content> {
  const r = await gh<{ content: string }>(c, `/contents/${CONTENT_PATH}?ref=${encodeURIComponent(c.branch)}`);
  return JSON.parse(decodeUtf8(r.content)) as Content;
}

async function loadText(c: GhConfig, path: string): Promise<string | null> {
  try {
    const r = await gh<{ content: string }>(c, `/contents/${path}?ref=${encodeURIComponent(c.branch)}`);
    return decodeUtf8(r.content);
  } catch { return null; }
}

export const buildSitemap = (current: string, content: Content) => {
  const urls = ['', '/episodes', '/paths', '/glossary', '/about', ...content.episodes.map((e) => `/episodes/${e.slug}`)];
  const block = urls
    .map((u) => `  <url>\n    <loc>${SITE}/fahmny${u}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>\n`)
    .join('');
  const cleaned = current.replace(/\s*<url>\s*<loc>[^<]*\/fahmny[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  return cleaned.replace('</urlset>', `${block}</urlset>`);
};

export interface PendingFile {
  path: string;
  blob: Blob;
}

/** ينشر كل التغييرات (محتوى + ملفات + مسح) في commit واحد */
export async function publish(
  c: GhConfig,
  message: string,
  content: Content,
  files: PendingFile[],
  deletes: string[],
  onStep?: (s: string) => void,
) {
  onStep?.('بقرأ آخر نسخة من الموقع...');
  const ref = await gh<{ object: { sha: string } }>(c, `/git/ref/heads/${c.branch}`);
  const head = await gh<{ tree: { sha: string } }>(c, `/git/commits/${ref.object.sha}`);

  const entries: { path: string; mode: string; type: string; sha: string | null }[] = [];
  const post = async (b64: string) =>
    (await gh<{ sha: string }>(c, '/git/blobs', { method: 'POST', body: JSON.stringify({ content: b64, encoding: 'base64' }) })).sha;

  let i = 0;
  for (const f of files) {
    onStep?.(`برفع الملفات (${++i}/${files.length})...`);
    entries.push({ path: f.path, mode: '100644', type: 'blob', sha: await post(await blobToBase64(f.blob)) });
  }
  for (const p of deletes) entries.push({ path: p, mode: '100644', type: 'blob', sha: null });

  onStep?.('بحدّث الداتا والـ sitemap...');
  entries.push({ path: CONTENT_PATH, mode: '100644', type: 'blob', sha: await post(textToBase64(JSON.stringify(content, null, 2) + '\n')) });
  const sm = await loadText(c, SITEMAP_PATH);
  if (sm) entries.push({ path: SITEMAP_PATH, mode: '100644', type: 'blob', sha: await post(textToBase64(buildSitemap(sm, content))) });

  onStep?.('بعمل commit...');
  const tree = await gh<{ sha: string }>(c, '/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: head.tree.sha, tree: entries }) });
  const commit = await gh<{ sha: string }>(c, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }),
  });
  await gh(c, `/git/refs/heads/${c.branch}`, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha }) });
  return commit.sha;
}
