// Hardcoded JSON data to power the static frontend

const isBrowser = typeof window !== "undefined";
const getStoredData = () => {
  if (isBrowser) {
    const stored = localStorage.getItem("beit-alordon-admin-data");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
  }
  return null;
};

const storedData = getStoredData();

export const COMPANY_INFO = storedData?.company || {
  name: "بيت الأردن للتكييف المركزي",
  address: "دوار الياسمين، عمّان، الأردن",
  hours: "السبت إلى الخميس، 8:00 صباحاً - 6:00 مساءً",
  phone: "0795215525",
  email: "info@beitalordon.com",
  logo: "/images/site-logo.png",
};

export const SERVICES = [
  {
    id: "central-ac",
    title: "تكييف مركزي",
    shortDesc: "أنظمة تكييف متطورة للمباني الكبيرة والمرافق التجارية.",
    longDesc: "نقدم حلول تكييف مركزي متكاملة تعتمد على أحدث التقنيات لضمان توزيع مثالي للهواء وتوفير استهلاك الطاقة. نستخدم أجهزة ذات كفاءة عالية تتناسب مع متطلبات المباني الكبيرة، الفنادق، والمستشفيات.",
    icon: "Fan",
    coverImage: "/images/hero-chiller.png",
    images: [
      "https://images.unsplash.com/photo-1621213038663-d142171120eb?w=1200&q=80",
      "https://images.unsplash.com/photo-1594951664366-2342817457cb?w=1200&q=80",
      "https://images.unsplash.com/photo-1595180183186-b48d2d93e1ea?w=1200&q=80"
    ]
  },
  {
    id: "core-holes",
    title: "فتحات الكور",
    shortDesc: "خدمات تخريم وحفر خرساني بدقة عالية لجميع التمديدات.",
    longDesc: "خدمة فتحات الكور (Core Drilling) باستخدام معدات ألمانية دقيقة لحفر الخرسانة المسلحة بدون اهتزازات تؤثر على البنية التحتية، لتمرير مواسير التكييف والتهوية.",
    icon: "Drill",
    coverImage: "/images/hero-core.png",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      "https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?w=1200&q=80"
    ]
  },
  {
    id: "duct-systems",
    title: "أنظمة الدكت",
    shortDesc: "تصنيع وتركيب مجاري الهواء (الدكت) بمواصفات عالمية.",
    longDesc: "مصنعنا مزود بأحدث ماكينات تشكيل الصاج المجلفن لتصنيع الدكت بأشكال ومقاسات دقيقة تلبي احتياجات المشاريع كافة مع توفير العزل الحراري والصوتي اللازم.",
    icon: "AlignVerticalJustifyStart",
    coverImage: "/images/hero-duct.png",
    images: [
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1200&q=80",
      "https://images.unsplash.com/photo-1508605330364-55cbfbdc1221?w=1200&q=80"
    ]
  },
  {
    id: "maintenance",
    title: "تركيب وصيانة",
    shortDesc: "فريق هندسي متخصص للتركيب وبرامج صيانة دورية.",
    longDesc: "لا تنتهي مهمتنا عند التركيب، بل تمتد لتشمل برامج صيانة دورية ووقائية لضمان عمل الأنظمة بكفاءة عالية على مدار الساعة وإطالة العمر الافتراضي للمعدات.",
    icon: "Wrench",
    coverImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80"
    ]
  },
  {
    id: "commercial",
    title: "مشاريع تجارية",
    shortDesc: "حلول تهوية وتكييف مخصصة للمولات التجارية والشركات.",
    longDesc: "نقوم بدراسة وتنفيذ أنظمة التكييف المركزية للمباني التجارية، المكاتب، والمولات، بما يتوافق مع معايير السلامة والجودة وبأقل مستوى من الضوضاء.",
    icon: "Building2",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
    ]
  },
  {
    id: "residential",
    title: "مشاريع سكنية",
    shortDesc: "أنظمة تكييف مخفية وعصرية للفلل والقصور.",
    longDesc: "نصمم أنظمة التكييف المخفي (Concealed) للفلل والمنازل الراقية، مما يحافظ على جمالية الديكور الداخلي مع توفير أقصى درجات الراحة والتبريد الموزع بشكل متساوٍ.",
    icon: "Home",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
    ]
  }
];

export const PROJECTS = [
  {
    id: "hotel-hvac",
    title: "مشروع فندق الأردن الكبير",
    client: "مجموعة الفنادق الوطنية",
    date: "أغسطس 2023",
    description: "تم تنفيذ وتصميم نظام تكييف مركزي متكامل يخدم أكثر من 300 غرفة فندقية بالإضافة إلى صالات الأفراح والمطاعم، مع استخدام نظام إدارة المباني الذكي (BMS).",
    coverImage: "/images/project-hotel.png",
    images: [
      "/images/project-hotel.png"
    ]
  },
  {
    id: "mall-hvac",
    title: "مشروع مجمع الياسمين التجاري",
    client: "شركة الاستثمارات العقارية",
    date: "مارس 2024",
    description: "توريد وتركيب شبكات الدكت ومبردات الهواء لخدمة مساحات تجارية تزيد عن 50 ألف متر مربع، لضمان بيئة تسوق منعشة ومريحة.",
    coverImage: "/images/hero-chiller.png",
    images: [
      "/images/hero-chiller.png"
    ]
  },
  {
    id: "residential-tower",
    title: "مشروع برج الجبيهة السكني",
    client: "الأفق للتطوير العمراني",
    date: "يناير 2024",
    description: "تنفيذ أنظمة التكييف المخفي (VRF) المتطورة لجميع الشقق السكنية في البرج، مما يوفر تحكماً دقيقاً لدرجات الحرارة لكل غرفة بشكل مستقل.",
    coverImage: "/images/hero-vrf.png",
    images: [
      "/images/hero-vrf.png"
    ]
  },
  {
    id: "hospital-hvac",
    title: "مشروع مستشفى الإسراء الجديد",
    client: "وزارة الصحة (تعاقد خاص)",
    date: "أكتوبر 2023",
    description: "تركيب أنظمة تهوية وتكييف طبية متخصصة (HEPA Filters) لغرف العمليات والعناية الحثيثة لضمان تنقية هواء بنسبة 99.99%.",
    coverImage: "/images/hero-duct.png",
    images: [
      "/images/hero-duct.png"
    ]
  }
];

export const STATS = [
  { label: "سنة خبرة", value: "+15" },
  { label: "مشروع منجز", value: "+250" },
  { label: "عميل راضٍ", value: "+400" },
  { label: "فني ومهندس", value: "50" },
];
