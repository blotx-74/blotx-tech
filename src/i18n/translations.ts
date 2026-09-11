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
    trustZeroAds: '0 إعلانات أو بيع بيانات',
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
    trustZeroAds: 'Zero Ads & Zero Data Selling',
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
  },
};
