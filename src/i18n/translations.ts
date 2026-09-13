export type Language = 'ar' | 'en';

export interface Translations {
  // Navigation
  brandName: string;
  studios: string;
  navDevices: string;
  navTaht: string;
  navEfteker: string;
  navMatrix: string;
  navPhilosophy: string;
  navCalculator: string;
  liveDemo: string;
  encryptedLocally: string;
  toggleLangBtn: string;
  langName: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  allPillar: string;
  tahtPillar: string;
  eftekerPillar: string;
  allPillarCardTitle: string;
  allPillarCardDesc: string;
  tahtPillarCardTitle: string;
  tahtPillarCardDesc: string;
  eftekerPillarCardTitle: string;
  eftekerPillarCardDesc: string;
  explore3d: string;
  exploreMatrix: string;
  scrollDown: string;
  trustLocal: string;
  trustZeroAds: string;
  trustOffline: string;
  trustAndroid: string;

  // 3D Devices Showcase
  showcaseBadge: string;
  showcaseTitle1: string;
  showcaseTitle2: string;
  showcaseDesc: string;
  modeScreenshots: string;
  modeInteractive: string;
  view3d: string;
  viewFlat: string;
  focusTaht: string;
  focusEfteker: string;
  simulateAirDrop: string;
  resetSim: string;
  airDropRadar: string;
  airDropBeaming: string;
  airDropReceived: string;
  airDropDesc: string;
  tahtBadgeShowcase: string;
  eftekerBadgeShowcase: string;

  // Download Modal & Google Play
  modalBadge: string;
  modalTitle: string;
  modalDesc: string;
  getOnPlay: string;
  googlePlay: string;
  tahtTag: string;
  eftekerTag: string;
  supportsAndroidOnly: string;
  freeForAll: string;
  comingSoonTitle: string;
  comingSoonMsg: string;
  closeBtn: string;

  // Taht El Balata Experience
  tahtExpBadge: string;
  tahtExpTitle: string;
  tahtExpTitleAccent: string;
  tahtExpDesc: string;
  tahtCardHeader: string;
  tahtVaultEmergency: string;
  tahtVaultGold: string;
  tahtVaultTravel: string;

  // Eftekir Experience
  eftekerExpBadge: string;
  eftekerExpTitle: string;
  eftekerExpTitleAccent: string;
  eftekerExpDesc: string;
  eftekerTryTitle: string;
  eftekerClarityMeter: string;

  // Synergy Matrix
  matrixBadge: string;
  matrixTitle: string;
  matrixTitleAccent: string;
  matrixDesc: string;

  // Philosophy
  philosophyBadge: string;
  philosophyTitle: string;
  philosophyDesc: string;

  // Calculator
  calcBadge: string;
  calcTitle1: string;
  calcTitle2: string;
  calcDesc: string;
  incomeLabel: string;
  savingsRateLabel: string;
  monthlySave: string;
  yearlySave: string;
  emergencyMonthsCovered: string;
  monthsCount: string;
  currency: string;

  // Footer
  footerDisclaimer1: string;
  footerDisclaimer2: string;
  footerEcosystemHeader: string;
  footerPhilosophyHeader: string;
  footerValuesHeader: string;
  footerAboutHeader: string;
  footerCopyright: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSupport: string;
  madeInEgypt: string;

  // Floating Dock
  dock3d: string;
  dockTaht: string;
  dockEfteker: string;
  dockPhilosophy: string;
  dockGetApps: string;

  // Stories Section
  storiesBadge: string;
  storiesTitle1: string;
  storiesTitle2: string;
  storiesDesc: string;
  story1Name: string;
  story1Role: string;
  story1Badge: string;
  story1Quote: string;
  story2Name: string;
  story2Role: string;
  story2Badge: string;
  story2Quote: string;
  story3Name: string;
  story3Role: string;
  story3Badge: string;
  story3Quote: string;

  // The Lab Secrets
  labBadge: string;
  labTitle1: string;
  labTitle2: string;
  labDesc: string;
  labProject1Code: string;
  labProject1Name: string;
  labProject1Subtitle: string;
  labProject1Desc: string;
  labProject1Badge: string;
  labProject2Code: string;
  labProject2Name: string;
  labProject2Subtitle: string;
  labProject2Desc: string;
  labProject2Badge: string;
  labProject3Code: string;
  labProject3Name: string;
  labProject3Subtitle: string;
  labProject3Desc: string;
  labProject3Badge: string;
  labBannerTitle: string;
  labBannerDesc: string;
  labBannerBtn: string;

  // FAQ Section
  faqBadge: string;
  faqTitle: string;
  faqDesc: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqAssurance: string;

  // Privacy Policy Modal
  privacyModalTitle: string;
  privacyModalSubtitle: string;
  privacyLastUpdated: string;
  privacyPrintBtn: string;
  privacyCloseBtn: string;

  // Support & Docs Modal
  supportModalTitle: string;
  supportModalSubtitle: string;
  supportTabTeam: string;
  supportTabDeveloper: string;
  supportTabDocs: string;
  supportTeamHeading: string;
  supportTeamSubheading: string;
  supportDevHeading: string;
  supportDevSubheading: string;
  supportDocsHeading: string;
  supportDocsSubheading: string;
  supportEmailLabel: string;
  supportWhatsAppLabel: string;
  supportCopyBtn: string;
  supportCopiedBtn: string;
  supportOpenChat: string;
  supportSendEmail: string;
  supportFastResponse: string;
  supportDevDirectBadge: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    // Navigation
    brandName: 'Blotx Tech',
    studios: 'STUDIOS',
    navDevices: 'الأجهزة 3D',
    navTaht: 'تحت البلاطة',
    navEfteker: 'افتكر',
    navMatrix: 'المعمارية المتكاملة',
    navPhilosophy: 'الفلسفة والبيان',
    navCalculator: 'الحاسبة',
    liveDemo: 'التجربة الحية',
    encryptedLocally: 'مشفر محلياً',
    toggleLangBtn: 'English',
    langName: 'العربية',

    // Hero Section
    heroBadge: 'مختبر Blotx Tech • المنظومة الإنسانية المتكاملة',
    heroTitle1: 'أسلوب حياة يفهم تفاصيلك..',
    heroTitle2: 'والتجربة تحاكي الواقع بالمللي.',
    heroDesc:
      'منظومة إيكوسيستم متناغمة تجمع بين «تحت البلاطة» لإدارة أمانك المالي وخزناتك، و«افتكر» كعقل ثانٍ لحفظ فواتيرك وضماناتك وأولوياتك. تعمل أوفلاين تماماً وتتخاطب لاسلكياً عبر AirDrop بدون خوادم تتجسس عليك.',
    allPillar: 'المنظومة كاملة',
    tahtPillar: 'الأمان المالي («تحت البلاطة»)',
    eftekerPillar: 'الصفاء الذهني («افتكر»)',
    allPillarCardTitle: 'المنظومة الثنائية المتكاملة',
    allPillarCardDesc: 'تنسيق تلقائي لحظي بين مواعيدك وخزناتك بأمان تام بدون أي خوادم خارجية.',
    tahtPillarCardTitle: 'حصن «تحت البلاطة» المالي',
    tahtPillarCardDesc: 'خزنات طوارئ وذهب ومصروفات محصنة وأمان حقيقي ضد التضخم والمفاجآت.',
    eftekerPillarCardTitle: 'عقل «افتكر» الإدراكي الثاني',
    eftekerPillarCardDesc: 'تفريغ الأفكار، فحص الفواتير بـ OCR، وتوثيق بطاقات الضمان ثلاثية الأبعاد.',
    explore3d: 'استكشف الأجهزة الحية 3D',
    exploreMatrix: 'المعمارية المتكاملة للإيكوسيستم',
    scrollDown: 'انزل واستمتع بالقصة التفاعلية',
    trustLocal: 'تشفير محلي مستقل 100%',
    trustZeroAds: 'خصوصية مشفرة وترقية Pro',
    trustOffline: 'يعمل بالكامل بدون إنترنت',
    trustAndroid: 'يدعم Android حالياً',

    // 3D Devices Showcase
    showcaseBadge: 'معرض الأجهزة والتجربة المحمولة • Handheld Flagships',
    showcaseTitle1: 'الأجهزة في يدك..',
    showcaseTitle2: 'والتجربة تحاكي الواقع بالمللي.',
    showcaseDesc:
      'استكشف واجهة التطبيقين الحقيقية في هواتف ثلاثية الأبعاد بتفاصيل دقيقة. جرّب التفاعل المباشر مع الخزنات، والجدول الذكي، وشاهد كيف يتخاطب التليفونان لحظياً بنظام AirDrop اللاسلكي.',
    modeScreenshots: 'لقطات شاشات التطبيقات الحقيقية (Real Screens)',
    modeInteractive: 'المحاكاة التفاعلية الحية (Interactive)',
    view3d: 'منظور ثلاثي الأبعاد متوازي (3D Dual)',
    viewFlat: 'عرض واجهات مباشر (Frontal Studio)',
    focusTaht: 'تركيز: «تحت البلاطة»',
    focusEfteker: 'تركيز: «افتكر»',
    simulateAirDrop: 'محاكاة مزامنة AirDrop بين التطبيقين ✦',
    resetSim: 'إعادة ضبط المحاكاة',
    airDropRadar: 'AirDrop: جاري استشعار الرادار...',
    airDropBeaming: 'AirDrop: بث الكبسولة عبر الأثير...',
    airDropReceived: 'AirDrop: تم الاستلام في الخزنة ✓',
    airDropDesc:
      'تأثير AirDrop الحقيقي: رادار لحظي ينقل الالتزام من افتكر إلى خزنة تحت البلاطة لاسلكياً وبدون أي سحابة تتجسس عليك.',
    tahtBadgeShowcase: '«تحت البلاطة» • حصن أمانك المالي',
    eftekerBadgeShowcase: '«افتكر» • عقلك الثاني وصفاء ذهنك',

    // Download Modal & Google Play
    modalBadge: 'إيكوسيستم متوفر للجميع',
    modalTitle: 'احصل على تطبيقات Blotx Tech',
    modalDesc: 'اختر التطبيق للتنزيل المباشر من Google Play على أجهزة الأندرويد:',
    getOnPlay: 'تحميل من',
    googlePlay: 'Google Play',
    tahtTag: 'الأمان المالي وإدارة الخزنات',
    eftekerTag: 'العقل الثاني وحفظ الضمانات',
    supportsAndroidOnly: 'يدعم نظام Android حالياً (وقريباً على iOS)',
    freeForAll: 'متاح مجاناً للجميع بدون اشتراكات',
    comingSoonTitle: 'النسخة الرسمية متاحة وقيد الاعتماد 🚀',
    comingSoonMsg: 'يتم تجهيز صفحة التحميل الرسمية على Google Play وسيتم تفعيل الرابط المباشر فور الاعتماد.',
    closeBtn: 'إغلاق',

    // Taht El Balata Experience
    tahtExpBadge: 'حكاية تحت البلاطة • The Financial Fortress',
    tahtExpTitle: 'القرش الأبيض..',
    tahtExpTitleAccent: 'لليوم الأبيض!',
    tahtExpDesc:
      'أجدادنا زمان لما كانوا يحبوا يحموا شقاهم، كانوا يحطوه "تحت البلاطة" بعيداً عن الطمع والتعقيد. إحنا أخدنا الحكمة المصرية الأصيلة دي، وبنينا تطبيق ذكي يحمي أمانك المالي ويديك استقرار نفسي حقيقي.',
    tahtCardHeader: 'خزناتك المحصنة تحت البلاطة',
    tahtVaultEmergency: 'خزنة طوارئ البيت والأسرة',
    tahtVaultGold: 'حصالة حفظ القيمة والذهب',
    tahtVaultTravel: 'خزنة مناسبات وسفر العائلة',

    // Eftekir Experience
    eftekerExpBadge: 'حكاية افتكر • The Cognitive Second Brain',
    eftekerExpTitle: 'مخك علشان يبدع..',
    eftekerExpTitleAccent: 'مش علشان يشيل هم!',
    eftekerExpDesc:
      'الإنسان العصري مخه مجهد بآلاف المواعيد والأوراق والأفكار اللي بتضيع في زحمة اليوم. تطبيق «افتكر» اتصمم ليكون عقل ثانٍ حقيقي وهادئ؛ يلتقط فكرتك في ثانية، ويحفظ أولوياتك بأمان، ويفكرك في الوقت والسياق المظبوط.',
    eftekerTryTitle: 'جرّب بنفسك: التقط الأفكار المتطايرة',
    eftekerClarityMeter: 'مؤشر تصفية الذهن والتركيز',

    // Synergy Matrix
    matrixBadge: 'المعمارية المتكاملة للإيكوسيستم • Executive Architecture',
    matrixTitle: 'تنسيق هندسي فائق..',
    matrixTitleAccent: 'بين حصنك المالي وعقلك الثاني.',
    matrixDesc:
      'معمارية متماثلة بدقة متناهية تربط بين «تحت البلاطة» و«افتكر» عبر محرك Blotx Stack المركزي؛ ليعمل التطبيقان ككيان واحد متناغم يدير التزاماتك ويحمي أمانك في صمت.',

    // Philosophy
    philosophyBadge: 'البيان الفلسفي لمنظومة Blotx',
    philosophyTitle: 'لماذا بنينا هذه المنظومة؟',
    philosophyDesc:
      'التكنولوجيا المعاصرة تحولت إلى أدوات تشتيت واستنزاف للتركيز وبيع للبيانات. في Blotx Tech، نصنع أدوات رقمية صامتة تحترم عقلك، وتحفظ كرامتك المالية، وتمنحك راحة البال الحقيقية.',

    // Calculator
    calcBadge: 'حاسبة الأمان المالي • التخطيط الحي',
    calcTitle1: 'احسب هتوفر كام',
    calcTitle2: '«تحت البلاطة» هالسنة؟',
    calcDesc:
      'حرّك المؤشرات وشوف إزاي خطوة بسيطة ومنتظمة في إدارة مصاريفك تقدر تبنيلك حصن أمان مالي حقيقي يحميك أنت وعائلتك.',
    incomeLabel: 'متوسط دخلك الشهري التقريبي:',
    savingsRateLabel: 'نسبة الادخار المستهدفة من الدخل:',
    monthlySave: 'التوفير الشهري المتوقع:',
    yearlySave: 'إجمالي الادخار السنوي المحصن:',
    emergencyMonthsCovered: 'شهور أمان وطوارئ مغطاة بالكامل:',
    monthsCount: 'شهور استقرار مالي',
    currency: 'ج.م',

    // Footer
    footerDisclaimer1:
      '* «تحت البلاطة» و«افتكر» هما تطبيقات مملوكة ومطورة بالكامل بواسطة Blotx Tech Studios. جميع حقوق الملكية الفكرية والابتكار محفوظة.',
    footerDisclaimer2:
      'Blotx Tech ملتزمة بأعلى معايير الخصوصية الرقمية؛ لا يتم مشاركة أي بيانات شخصية أو مالية مع أي طرف ثالث على الإطلاق.',
    footerEcosystemHeader: 'الإيكوسيستم والتطبيقات',
    footerPhilosophyHeader: 'فلسفة Blotx Tech',
    footerValuesHeader: 'القيم والخصوصية',
    footerAboutHeader: 'عن استوديو Blotx',
    footerCopyright: 'حقوق النشر © 2026 Blotx Tech. جميع الحقوق محفوظة. صُنع بعناية وشغف للإنسان.',
    footerPrivacy: 'سياسة الخصوصية',
    footerTerms: 'الشروط والأحكام',
    footerSupport: 'الدعم الفني والتوثيق',
    madeInEgypt: 'صُنع في مصر • للعالم كله',

    // Floating Dock
    dock3d: 'الأجهزة 3D',
    dockTaht: 'تحت البلاطة',
    dockEfteker: 'افتكر',
    dockPhilosophy: 'الفلسفة',
    dockGetApps: 'احصل على التطبيقات',

    // Stories Section
    storiesBadge: 'حكايات حقيقية من واقع الحياة',
    storiesTitle1: 'ناس حقيقية.. عاشت التجربة',
    storiesTitle2: 'وفرقت في راحة بالهم.',
    storiesDesc: 'الهدف مش أرقام تحميلات وخلاص؛ الهدف هو الأثر الإيجابي اللي بيعيشه كل شخص بيعتمد على إيكوسيستم Blotx Tech في حياته اليومية.',
    story1Name: 'أحمد مهران',
    story1Role: 'مهندس ديكور ومصمم حر • القاهرة',
    story1Badge: 'مستخدم تحت البلاطة منذ 14 شهراً',
    story1Quote: 'كنت دايماً بستلم مستحقاتي وبضيعها في كماليات بدون وعي، ويجي آخر الشهر ألاقي نفسي مزنوق. «تحت البلاطة» كشفلي خروقات كانت بتسرب أكتر من 7 آلاف جنيه شهرياً. في سنة واحدة قدرت أشتري سبائك دهب وأجهز شقتي وأنا مرتاح البال.',
    story2Name: 'د. سارة خليل',
    story2Role: 'طبيبة وأم لطفلين • الإسكندرية',
    story2Badge: 'تستخدم افتكر لإدارة يومها وعيادتها',
    story2Quote: 'بين مواعيد العيادة، وتفاصيل البيت، ومصاريف مدارس الأولاد، كنت حاسة إن مخي شغال 24 ساعة بدون راحة وبنسى حاجات مهمة. «افتكر» شال عني هم التذكر والضغط، وبقى عيني التانية اللي بتفكرني في الوقت المضبوط بدون أي إزعاج.',
    story3Name: 'كريم الشريف',
    story3Role: 'رائد أعمال تقني ومؤسس استوديو • الجيزة',
    story3Badge: 'يعتمد على الإيكوسيستم المتكامل',
    story3Quote: 'أكتر حاجة أبهرتني هي فلسفة الربط بين التطبيقين؛ لما بيجي ميعاد تجديد اشتراك أو فاتورة في «افتكر»، «تحت البلاطة» بيكون حاجز المبلغ في الخزنة مقدماً. ده فعلاً أسلوب حياة مريح بيلغي التشتت المالي والذهني.',

    // The Lab Secrets
    labBadge: 'معمل أفكار Blotx Tech • The Secret Lab',
    labTitle1: 'عقولنا مش بتبطل تفكير.',
    labTitle2: 'إيه اللي بنجهزه لخدمتك بعد كده؟',
    labDesc: 'الرحلة بدأت بـ «تحت البلاطة» و«افتكر»، لكن الإيكوسيستم بيكبر كل يوم علشان يغطي كل ثغرة ممكن تقلقك أو تعطل حياتك.',
    labProject1Code: 'NODE 03 // UNDER RESEARCH',
    labProject1Name: 'شباك (Shebbak)',
    labProject1Subtitle: 'نافذة تواصل إنساني هادئ للعائلات',
    labProject1Desc: 'سد ثغرة البعد والانفصال الإنساني؛ مساحة دافئة تشارك فيها لحظاتك مع دايرتك المقربة بدون خوارزميات رخيصة، ولا إعلانات، ولا دوشة السوشيال ميديا.',
    labProject1Badge: 'مرحلة النماذج الأولية',
    labProject2Code: 'NODE 04 // IN DEVELOPMENT',
    labProject2Name: 'المسطرة (El-Mastara)',
    labProject2Subtitle: 'معايرة العادات وإلغاء المماطلة',
    labProject2Desc: 'أداة ضبط وقياس صارمة للعادات اليومية، بتفهم سلوكك وبتساعدك تبني انضباط حقيقي بدون جلد ذات وبطريقة ممتعة ومستدامة.',
    labProject2Badge: 'قيد التطوير الفعلي',
    labProject3Code: 'NODE 05 // EXPERIMENTAL',
    labProject3Name: 'الكبسولة (El-Capsule)',
    labProject3Subtitle: 'التشفير والتوريث الرقمي الآمن',
    labProject3Desc: 'كبسولة تشفير محصنة لحفظ المستندات الحيوية، أسرار العمل، والذكريات الثمينة مع نظام ذكي لتسليمها لأحبائك في حالات الطوارئ.',
    labProject3Badge: 'أبحاث الأمان والتشفير',
    labBannerTitle: 'شايف مشكلة أو حاجة ناقصة الناس في حياتهم؟',
    labBannerDesc: 'معمل Blotx مفتوح للأفكار الحقيقية اللي بتنبع من قلب الشارع وتفاصيل الحياة اليومية. شاركنا فكرتك وسيبنا نهندسها.',
    labBannerBtn: 'شارك فكرتك مع المعمل',

    // FAQ Section
    faqBadge: 'إجابات واضحة لراحة بالك',
    faqTitle: 'الأسئلة الشائعة والأمان',
    faqDesc: 'كل ما يدور في ذهنك حول الأمان، والخصوصية، وكيفية عمل الإيكوسيستم.',
    faqQ1: 'هل بياناتي وفلوسي في أمان تام؟ وهل التطبيقات تتطلب ربط حسابات بنكية حساسة؟',
    faqA1: 'لا نطلب أبداً أي أرقام حسابات بنكية أو كلمات مرور سرية (OTP/PIN). «تحت البلاطة» و«افتكر» مصممان بمبدأ (الخصوصية أولاً)؛ كافة بيانات مدخراتك وملاحظاتك ومواعيدك يتم تشفيرها محلياً وبأعلى معايير الأمان. لا نبيع بياناتك لأي طرف ثالث، وتطبيقنا يوفر تجربة نظيفة وخيار ترقية Pro لإزالة الإعلانات بالكامل.',
    faqQ2: 'ما هي خطط الأسعار والاشتراكات في «تحت البلاطة» و«افتكر»؟',
    faqA2: 'يوفر كلا التطبيقين نسخة مجانية تشمل كافة الميزات الحيوية مع إعلانات خفيفة وغير متطفلة. كما نوفر باقة «المميز برو (Pro VIP)» باشتراكات مرنة (شهرية، سنوية، وترخيص مدى الحياة) تتيح لك إزالة الإعلانات بالكامل، والنسخ الاحتياطي السحابي غير المحدود، وأولوية الميزات الجديدة عبر Google Play Billing.',
    faqQ3: 'كيف يتواصل «تحت البلاطة» مع «افتكر» تلقائياً وبسلاسة؟',
    faqA3: 'بمجرد تنزيل التطبيقين على نفس الجهاز، يتعرفان على بعضهما عبر بروتوكول الربط الذكي المدمج في نواة Blotx Stack. لا تحتاج لخطوات تسجيل معقدة؛ عندما تسجل التزاماً أو قسطاً في افتكر، يتم التنسيق مع تحت البلاطة لحجز ميزانيته بهدوء في الخلفية.',
    faqQ4: 'هل يمكنني استخدام التطبيقات بدون اتصال بالإنترنت (أوفلاين)؟',
    faqA4: 'بكل تأكيد! كلا التطبيقين يعملان بكامل وظائفهما في أي مكان بدون اتصال بالإنترنت (أثناء السفر، أو في الأماكن ضعيفة الشبكة)، ويتم حفظ كافة المدخرات والمهام محلياً بسرعة فائقة.',
    faqQ5: 'ما هو الهدف من كيان Blotx Tech؟ ومن يقف وراءه؟',
    faqA5: 'Blotx Tech هو مختبر تصميم وهندسة برمجية تأسس بهدف إنساني خالص: رصد ما ينقص الناس في تفاصيل حياتهم اليومية وهندسة أدوات فائقة الجمال والسهولة تسد هذه الفجوات وتتحول لأسلوب حياة هادئ ومستقر.',
    faqAssurance: 'التزام صريح من Blotx Tech: خصوصيتك وراحة بالك خط أحمر لا مساومة عليه أبداً.',

    // Privacy Policy Modal
    privacyModalTitle: 'سياسة الخصوصية والشفافية الرقمية',
    privacyModalSubtitle: 'وثيقة قانونية صارمة لحماية كرامتك وبياناتك الشخصية وفق أعلى المعايير الدولية والقوانين المصرية',
    privacyLastUpdated: 'آخر تحديث: مارس 2026 • الإصدار القانوني 2.4',
    privacyPrintBtn: 'طباعة الوثيقة الرسمية',
    privacyCloseBtn: 'إغلاق ومتابعة التصفح',

    // Support & Docs Modal
    supportModalTitle: 'مركز الدعم الفني والتوثيق',
    supportModalSubtitle: 'نحن هنا لمساعدتك والإجابة عن أي استفسار حول إيكوسيستم Blotx Tech وتطبيقاته',
    supportTabTeam: 'فريق الدعم للموقع',
    supportTabDeveloper: 'التواصل المباشر مع المطور',
    supportTabDocs: 'التوثيق والأمان',
    supportTeamHeading: 'فريق دعم موقع ومنظومة Blotx Tech',
    supportTeamSubheading: 'فريقنا متاح للرد على أي استفسارات عامة، مشاكل التشغيل، والتراخيص على مدار الساعة.',
    supportDevHeading: 'التواصل المباشر مع مطور المنظومة',
    supportDevSubheading: 'للمحادثات التقنية العميقة، الأفكار البرمجية، والشراكات الهندسية والاستثمارية مباشرة.',
    supportDocsHeading: 'التوثيق الفني ومعايير الأمان',
    supportDocsSubheading: 'دليل شامل للبنية التحتية البرمجية، آليات التشفير العسكري، وتدفق البيانات المحلي بالكامل.',
    supportEmailLabel: 'البريد الإلكتروني (Gmail):',
    supportWhatsAppLabel: 'واتساب مباشر (WhatsApp):',
    supportCopyBtn: 'نسخ',
    supportCopiedBtn: 'تم النسخ!',
    supportOpenChat: 'بدء محادثة واتساب',
    supportSendEmail: 'إرسال بريد إلكتروني',
    supportFastResponse: 'متوسط وقت الرد: خلال ساعات معدودة',
    supportDevDirectBadge: 'خط اتصال مباشر بالهندسة والقيادة التقنية',
  },

  en: {
    // Navigation
    brandName: 'Blotx Tech',
    studios: 'STUDIOS',
    navDevices: '3D Devices',
    navTaht: 'Taht El Balata',
    navEfteker: 'Eftekir',
    navMatrix: 'Synergy Matrix',
    navPhilosophy: 'Philosophy',
    navCalculator: 'Calculator',
    liveDemo: 'Live Demo',
    encryptedLocally: 'Encrypted Locally',
    toggleLangBtn: 'العربية',
    langName: 'English',

    // Hero Section
    heroBadge: 'Blotx Tech Labs • The Human Ecosystem',
    heroTitle1: 'A lifestyle that understands you..',
    heroTitle2: 'Engineered with absolute precision.',
    heroDesc:
      'A harmonious dual ecosystem uniting "Taht El Balata" for financial security & vaults, and "Eftekir" as your cognitive second brain for warranties and priorities. 100% offline, privately bridged via AirDrop with zero tracking clouds.',
    allPillar: 'Complete Ecosystem',
    tahtPillar: 'Financial Fortress (Taht El Balata)',
    eftekerPillar: 'Cognitive Clarity (Eftekir)',
    allPillarCardTitle: 'Unified Dual Ecosystem',
    allPillarCardDesc: 'Instant automated coordination between your deadlines and vaults with total offline privacy.',
    tahtPillarCardTitle: 'Taht El Balata Financial Fortress',
    tahtPillarCardDesc: 'Fortified emergency, gold, and expense vaults providing resilient shelter against inflation.',
    eftekerPillarCardTitle: 'Eftekir Cognitive Second Brain',
    eftekerPillarCardDesc: 'Declutter your mind, extract receipts with smart OCR, and preserve 3D digital warranty passports.',
    explore3d: 'Explore 3D Handhelds',
    exploreMatrix: 'Integrated Architecture',
    scrollDown: 'Scroll down to explore the story',
    trustLocal: '100% On-Device Encryption',
    trustZeroAds: 'Encrypted Privacy & Pro Tier',
    trustOffline: 'Works Fully Offline',
    trustAndroid: 'Supports Android Now',

    // 3D Devices Showcase
    showcaseBadge: 'Handheld Devices & Live Experience • Flagships',
    showcaseTitle1: 'Devices in your hands..',
    showcaseTitle2: 'Pixel-perfect live simulation.',
    showcaseDesc:
      'Explore the authentic interface of both native apps inside interactive 3D smartphones. Test dynamic vaults, month selectors, and watch both phones communicate live via wireless AirDrop.',
    modeScreenshots: 'Original App Screenshots (Real Screens)',
    modeInteractive: 'Live Interactive Simulation',
    view3d: '3D Dual Perspective',
    viewFlat: 'Frontal Studio View',
    focusTaht: 'Focus: Taht El Balata',
    focusEfteker: 'Focus: Eftekir',
    simulateAirDrop: 'Simulate AirDrop Sync ✦',
    resetSim: 'Reset Simulator',
    airDropRadar: 'AirDrop: Scanning local radar...',
    airDropBeaming: 'AirDrop: Beaming encrypted capsule...',
    airDropReceived: 'AirDrop: Safely received in vault ✓',
    airDropDesc:
      'Authentic AirDrop experience: Local wireless radar beaming commitments from Eftekir directly into Taht El Balata vault without any spying third-party cloud.',
    tahtBadgeShowcase: '«Taht El Balata» • Your Financial Fortress',
    eftekerBadgeShowcase: '«Eftekir» • Your Cognitive Second Brain',

    // Download Modal & Google Play
    modalBadge: 'Ecosystem Available for Everyone',
    modalTitle: 'Get Blotx Tech Applications',
    modalDesc: 'Select an application to download directly on Google Play for Android devices:',
    getOnPlay: 'GET IT ON',
    googlePlay: 'Google Play',
    tahtTag: 'Financial Security & Smart Vaults',
    eftekerTag: 'Second Brain & Warranties Tracker',
    supportsAndroidOnly: 'Currently supports Android (iOS version coming soon)',
    freeForAll: 'Available free of charge for all users',
    comingSoonTitle: 'Official Release Pending on Store 🚀',
    comingSoonMsg: 'The Google Play Store package is prepared and direct store links will activate upon store publication.',
    closeBtn: 'Close',

    // Taht El Balata Experience
    tahtExpBadge: 'The Story of Taht El Balata • Financial Fortress',
    tahtExpTitle: 'Saving for a Rainy Day..',
    tahtExpTitleAccent: 'Made Effortless and Dignified.',
    tahtExpDesc:
      'Historically in Egypt, people safeguarded their hard-earned money "under the tile" (Taht El Balata) away from greed and bureaucracy. We evolved this timeless ancestral wisdom into a modern private tool that shields your family and brings financial peace.',
    tahtCardHeader: 'Your Fortified Vaults Inside Taht El Balata',
    tahtVaultEmergency: 'Family & Home Emergency Vault',
    tahtVaultGold: 'Inflation Hedge & Gold Reserves',
    tahtVaultTravel: 'Family Vacation & Celebrations Vault',

    // Eftekir Experience
    eftekerExpBadge: 'The Story of Eftekir • Cognitive Second Brain',
    eftekerExpTitle: 'Your brain is built to create..',
    eftekerExpTitleAccent: 'Not to carry mental clutter!',
    eftekerExpDesc:
      'Modern life bombards human memory with thousands of receipts, warranties, and deadlines that get lost in daily noise. Eftekir is designed as a calm second brain: capturing your thought in a second, securing paper proofs, and prompting you at the exact context.',
    eftekerTryTitle: 'Try it yourself: Capture floating thoughts',
    eftekerClarityMeter: 'Mental Clarity & Focus Index',

    // Synergy Matrix
    matrixBadge: 'Executive Architecture • Symbiotic Integration',
    matrixTitle: 'Exquisite Engineering..',
    matrixTitleAccent: 'Bridging Your Fortress and Second Brain.',
    matrixDesc:
      'Symmetric architectural harmony connecting "Taht El Balata" and "Eftekir" via the Blotx Stack kernel; empowering both apps to function as one coherent entity that manages your life in dignified silence.',

    // Philosophy
    philosophyBadge: 'The Blotx Tech Manifesto',
    philosophyTitle: 'Why did we build this ecosystem?',
    philosophyDesc:
      'Contemporary technology has degraded into extractive dopamine traps that sell user privacy. At Blotx Tech, we build quiet, offline-first tools that respect human dignity and restore genuine mental peace.',

    // Calculator
    calcBadge: 'Financial Security Calculator • Live Forecasting',
    calcTitle1: 'Calculate how much you will save',
    calcTitle2: 'with «Taht El Balata» this year',
    calcDesc:
      'Adjust the sliders to see how disciplined budgeting builds a resilient financial fortress to protect you and your family.',
    incomeLabel: 'Approximate Monthly Income:',
    savingsRateLabel: 'Target Savings Allocation (%):',
    monthlySave: 'Projected Monthly Savings:',
    yearlySave: 'Total Annual Fortified Capital:',
    emergencyMonthsCovered: 'Months of Living Expenses Covered:',
    monthsCount: 'Months of Runway',
    currency: 'EGP',

    // Footer
    footerDisclaimer1:
      '* «Taht El Balata» and «Eftekir» are proprietary applications developed by Blotx Tech Studios. All rights and intellectual property reserved.',
    footerDisclaimer2:
      'Blotx Tech is strictly committed to digital privacy; personal and financial data never leaves your device.',
    footerEcosystemHeader: 'Ecosystem & Applications',
    footerPhilosophyHeader: 'Blotx Philosophy',
    footerValuesHeader: 'Values & Privacy',
    footerAboutHeader: 'About Blotx Tech',
    footerCopyright: 'Copyright © 2026 Blotx Tech Studios. All rights reserved. Crafted with care for humanity.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerSupport: 'Documentation & Support',
    madeInEgypt: 'Made in Egypt • Built for the World',

    // Floating Dock
    dock3d: '3D Devices',
    dockTaht: 'Taht El Balata',
    dockEfteker: 'Eftekir',
    dockPhilosophy: 'Philosophy',
    dockGetApps: 'Get Apps',

    // Stories Section
    storiesBadge: 'Real Stories From Everyday Life',
    storiesTitle1: 'Real people.. who experienced it',
    storiesTitle2: 'and reclaimed their peace of mind.',
    storiesDesc: 'Our benchmark is not inflated download metrics; it is the tangible positive calm experienced by real individuals relying on Blotx Tech daily.',
    story1Name: 'Ahmed Mahran',
    story1Role: 'Interior Architect & Freelancer • Cairo',
    story1Badge: 'Taht El Balata user for 14 months',
    story1Quote: 'I used to receive project payouts and unconsciously leak them on non-essentials, ending every month stressed. Taht El Balata revealed blind spots that were draining over 7,000 EGP every month. Within one disciplined year, I secured physical gold bars and furnished my home with pure serenity.',
    story2Name: 'Dr. Sarah Khalil',
    story2Role: 'Physician & Mother of two • Alexandria',
    story2Badge: 'Uses Eftekir for clinic & home life',
    story2Quote: 'Between patient schedules, domestic duties, and school deadlines, I felt my brain was racing 24/7 without rest. Eftekir lifted the cognitive weight of remembering; it became a trustworthy second pair of eyes prompting me at the exact moment without annoying notifications.',
    story3Name: 'Karim El-Sherif',
    story3Role: 'Tech Entrepreneur & Studio Founder • Giza',
    story3Badge: 'Relies on the unified ecosystem',
    story3Quote: 'What stunned me most was the symbiosis between both apps. When a warranty renewal or invoice is due in Eftekir, Taht El Balata has already quietly ring-fenced the required capital in its vault. It is a dignified, effortless lifestyle that eliminates financial and cognitive chaos.',

    // The Lab Secrets
    labBadge: 'Blotx Tech Idea Lab • The Secret Lab',
    labTitle1: 'Our minds never rest.',
    labTitle2: 'What are we engineering for you next?',
    labDesc: 'The journey began with Taht El Balata and Eftekir, but the ecosystem expands continually to address every friction point that threatens your daily peace of mind.',
    labProject1Code: 'NODE 03 // UNDER RESEARCH',
    labProject1Name: 'Shebbak (Window)',
    labProject1Subtitle: 'A quiet, ambient connection for families',
    labProject1Desc: 'Bridging emotional distance; a warm private digital room to share memories with your closest inner circle without exploitative feeds, algorithms, or invasive social media noise.',
    labProject1Badge: 'Prototype Phase',
    labProject2Code: 'NODE 04 // IN DEVELOPMENT',
    labProject2Name: 'El-Mastara (The Ruler)',
    labProject2Subtitle: 'Habit calibration & eliminating procrastination',
    labProject2Desc: 'A calibrated, zero-friction habit measurement system that understands human behavior and fosters sustainable self-discipline without guilt or burnout.',
    labProject2Badge: 'Active Development',
    labProject3Code: 'NODE 05 // EXPERIMENTAL',
    labProject3Name: 'El-Capsule (The Vault)',
    labProject3Subtitle: 'Safe digital legacy & hardware encryption',
    labProject3Desc: 'A fortified offline encryption capsule preserving vital legal documents, trade secrets, and life memories with an automated zero-knowledge legacy handover in emergencies.',
    labProject3Badge: 'Cryptographic Research',
    labBannerTitle: 'Noticed an unresolved problem in daily life?',
    labBannerDesc: 'The Blotx Lab is receptive to real human problems rooted in daily routines. Share your observation and let our studio engineer an elegant solution.',
    labBannerBtn: 'Share Your Idea with the Lab',

    // FAQ Section
    faqBadge: 'Clear Answers for Your Peace of Mind',
    faqTitle: 'Frequently Asked Questions & Security',
    faqDesc: 'Everything you need to know regarding data integrity, privacy, and how the offline ecosystem functions.',
    faqQ1: 'Are my data and finances completely safe? Do the apps require linking bank credentials?',
    faqA1: 'Never. We never ask for bank credentials, card numbers, or secret passwords. Taht El Balata and Eftekir are architected on strict Privacy-First and Zero-Knowledge principles. All savings, notes, and records are strictly encrypted. We never sell data to third parties, and both apps offer a clean experience with an ad-free Pro upgrade tier.',
    faqQ2: 'What are the pricing and subscription plans for Taht El Balata & Eftekir?',
    faqA2: 'Both apps offer a powerful free tier featuring essential tools supported by light, non-intrusive ads. We also provide "Pro VIP" subscriptions (Monthly, Annual, and Lifetime License) that completely remove ads, unlock unlimited cloud backups, and grant priority access to future features via Google Play Billing.',
    faqQ3: 'How do Taht El Balata and Eftekir synchronize automatically without servers?',
    faqA3: 'Once installed on your device, both applications communicate seamlessly via the Blotx Stack kernel protocol. No tedious account registrations are needed; whenever a commitment is logged in Eftekir, it wirelessly coordinates with Taht El Balata to allocate the budget in the background.',
    faqQ4: 'Can I use the applications completely offline without an internet connection?',
    faqA4: 'Absolutely! Both applications are offline-first and function with 100% fidelity anywhere in the world without connectivity (during flights, rural travel, or weak cellular zones). All state is saved locally with sub-millisecond response times.',
    faqQ5: 'What is Blotx Tech? Who stands behind this ecosystem?',
    faqA5: 'Blotx Tech is an independent design and software engineering studio established with a dedicated humanistic mission: observing the friction points in everyday human life and building refined, tranquil tools that bridge these gaps into a serene lifestyle.',
    faqAssurance: 'Blotx Tech Firm Commitment: Your digital privacy and human dignity are unconditional red lines.',

    // Privacy Policy Modal
    privacyModalTitle: 'Digital Privacy Policy & Transparency',
    privacyModalSubtitle: 'A legally binding charter protecting your dignity and personal sovereignty under Egyptian Law 151/2020 & international GDPR standards',
    privacyLastUpdated: 'Last Updated: March 2026 • Legal Revision 2.4',
    privacyPrintBtn: 'Print Official Policy',
    privacyCloseBtn: 'Close & Continue Browsing',

    // Support & Docs Modal
    supportModalTitle: 'Support Center & Documentation',
    supportModalSubtitle: 'We are here to assist you with any inquiries regarding the Blotx Tech ecosystem and its native applications',
    supportTabTeam: 'Website Support Team',
    supportTabDeveloper: 'Direct Developer Line',
    supportTabDocs: 'Technical Documentation',
    supportTeamHeading: 'Blotx Tech Ecosystem & Web Support Team',
    supportTeamSubheading: 'Our support team is available 24/7 for general inquiries, troubleshooting, license assistance, and operational questions.',
    supportDevHeading: 'Direct Developer & Engineering Line',
    supportDevSubheading: 'Direct access to the lead developer for deep technical inquiries, code discussions, system architecture, and strategic partnerships.',
    supportDocsHeading: 'Technical Documentation & Security Standards',
    supportDocsSubheading: 'Comprehensive architectural guides, zero-knowledge encryption protocols, and purely local data pipelines.',
    supportEmailLabel: 'Email Address (Gmail):',
    supportWhatsAppLabel: 'Direct WhatsApp Line:',
    supportCopyBtn: 'Copy',
    supportCopiedBtn: 'Copied!',
    supportOpenChat: 'Open WhatsApp Chat',
    supportSendEmail: 'Send Direct Email',
    supportFastResponse: 'Average response turnaround: Within a few hours',
    supportDevDirectBadge: 'Direct Line to Lead Software Architect',
  },
};
