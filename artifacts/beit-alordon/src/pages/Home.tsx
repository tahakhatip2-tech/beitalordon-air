import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { SERVICES, PROJECTS, STATS } from "@/lib/data";
import { useState, useEffect, useCallback } from "react";

const HERO_SLIDES = [
  {
    id: "intro",
    tag: "الخيار الأول في الأردن",
    title: "رواد التكييف المركزي",
    titleHighlight: "وأنظمة التهوية",
    description: "في مصنع بيت الأردن، نجمع بين الدقة الهندسية وأعلى معايير الجودة لتنفيذ مشاريع التكييف للقطاعات التجارية والسكنية.",
    image: "https://images.unsplash.com/photo-1621213038663-d142171120eb?w=1600&q=85",
    accent: "#FF6B35",
    cta: { label: "احجز استشارة مجانية", href: "/booking" },
    cta2: { label: "تصفح خدماتنا", href: "/services" },
    badge: "+15 عاماً من الخبرة",
  },
  {
    id: "central-ac",
    tag: "تكييف مركزي",
    title: "أنظمة تكييف مركزي",
    titleHighlight: "بأحدث التقنيات",
    description: "نصمم وننفذ أنظمة VRF وChiller للفنادق والمستشفيات والمولات بكفاءة طاقة عالية وأداء موثوق على مدار الساعة.",
    image: "https://images.unsplash.com/photo-1594951664366-2342817457cb?w=1600&q=85",
    accent: "#FF6B35",
    cta: { label: "اكتشف الخدمة", href: "/services/central-ac" },
    cta2: { label: "احجز استشارة", href: "/booking" },
    badge: "VRF · Chiller · BMS",
  },
  {
    id: "core-holes",
    tag: "فتحات الكور",
    title: "حفر خرساني دقيق",
    titleHighlight: "بمعدات ألمانية",
    description: "خدمة فتحات الكور بتقنية Core Drilling المتطورة — حفر بدون اهتزازات يضر بالبنية التحتية، بمقاسات دقيقة حسب احتياج مشروعك.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
    accent: "#1E3A8A",
    cta: { label: "اكتشف الخدمة", href: "/services/core-holes" },
    cta2: { label: "احجز استشارة", href: "/booking" },
    badge: "دقة ميليمترية",
  },
  {
    id: "duct-systems",
    tag: "أنظمة الدكت",
    title: "تصنيع وتركيب",
    titleHighlight: "مجاري الهواء",
    description: "مصنعنا مجهز بأحدث ماكينات تشكيل الصاج المجلفن لتصنيع الدكت بمواصفات عالمية مع عزل حراري وصوتي متكامل.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
    accent: "#FF6B35",
    cta: { label: "اكتشف الخدمة", href: "/services/duct-systems" },
    cta2: { label: "احجز استشارة", href: "/booking" },
    badge: "مواصفات عالمية",
  },
  {
    id: "commercial",
    tag: "مشاريع تجارية",
    title: "حلول تكييف",
    titleHighlight: "للقطاع التجاري",
    description: "نُنفذ أنظمة التكييف المركزية للمولات التجارية والفنادق والمكاتب بأعلى معايير الجودة وأقل مستوى من الضوضاء.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85",
    accent: "#1E3A8A",
    cta: { label: "شاهد مشاريعنا", href: "/projects" },
    cta2: { label: "احجز استشارة", href: "/booking" },
    badge: "+250 مشروع منجز",
  },
  {
    id: "residential",
    tag: "مشاريع سكنية",
    title: "تكييف فاخر",
    titleHighlight: "للفلل والمجمعات",
    description: "نصمم أنظمة التكييف المخفي للفلل والمنازل الراقية، مما يحافظ على جمالية الديكور مع توفير أقصى درجات الراحة والتبريد.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85",
    accent: "#FF6B35",
    cta: { label: "شاهد مشاريعنا", href: "/projects" },
    cta2: { label: "احجز استشارة", href: "/booking" },
    badge: "تصميم مخفي فاخر",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const prev = () => {
    const idx = (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goTo(idx, -1);
  };

  const next = useCallback(() => {
    const idx = (current + 1) % HERO_SLIDES.length;
    goTo(idx, 1);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative h-[92vh] min-h-[560px] max-h-[860px] overflow-hidden bg-secondary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={slide.id + "-bg"}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          {/* Colored accent bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-700"
            style={{ background: `linear-gradient(to left, ${slide.accent}, transparent)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id + "-text"}
              custom={direction}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="max-w-3xl space-y-6"
            >
              {/* Tag */}
              <motion.div custom={0} variants={textVariants}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white border border-white/30 backdrop-blur-sm"
                  style={{ background: `${slide.accent}33` }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.accent }} />
                  {slide.tag}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
              >
                {slide.title}{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(135deg, ${slide.accent}, #f97316)` }}
                >
                  {slide.titleHighlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2}
                variants={textVariants}
                className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
              >
                {slide.description}
              </motion.p>

              {/* Badge */}
              <motion.div custom={3} variants={textVariants}>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/70">
                  <CheckCircle2 className="w-4 h-4" style={{ color: slide.accent }} />
                  {slide.badge}
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div custom={4} variants={textVariants} className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={slide.cta.href}
                  className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2"
                  style={{ background: slide.accent, boxShadow: `0 8px 30px ${slide.accent}55` }}
                >
                  {slide.cta.label}
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="px-8 py-4 rounded-xl font-bold text-lg text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all hover:-translate-y-1"
                >
                  {slide.cta2.label}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Counter + Progress */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {/* Dots */}
        <div className="flex gap-2 items-center">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                background: i === current ? slide.accent : "rgba(255,255,255,0.4)",
              }}
              aria-label={`الشريحة ${i + 1}`}
            />
          ))}
        </div>
        {/* Progress Bar */}
        {!paused && (
          <div className="w-32 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              key={slide.id + "-progress"}
              className="h-full rounded-full"
              style={{ background: slide.accent }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        aria-label="السابق"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        aria-label="التالي"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Slide number top-left */}
      <div className="absolute top-8 left-8 z-20 text-white/50 text-sm font-mono select-none">
        <span className="text-white font-bold text-lg">{String(current + 1).padStart(2, "0")}</span>
        <span> / {String(HERO_SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* Thumbnail strip - right side (desktop) */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-2">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`w-1 rounded-full transition-all duration-300 ${
              i === current ? "h-10" : "h-4 opacity-40 hover:opacity-70"
            }`}
            style={{ background: i === current ? slide.accent : "white" }}
          />
        ))}
      </div>
    </section>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div>
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* STATS */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-border p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x md:divide-x-reverse divide-border">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <p className="text-4xl md:text-5xl font-extrabold text-secondary mb-2">{stat.value}</p>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wider mb-3">ماذا نقدم؟</h2>
            <h3 className="text-4xl font-extrabold text-foreground">خدمات هندسية متكاملة</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service, i) => (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
                }}
                key={service.id} 
                className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <Link href={`/services/${service.id}`}>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.coverImage} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 bg-primary text-white p-2 rounded-lg backdrop-blur-md">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-foreground mb-3">{service.title}</h4>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{service.shortDesc}</p>
                    <span className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      اكتشف المزيد
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link href="/services" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-colors">
               عرض جميع الخدمات
               <ArrowLeft className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-muted/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-primary font-bold tracking-wider mb-3">لماذا بيت الأردن؟</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 leading-tight">
                نلتزم بأعلى معايير الجودة لتوفير راحة مستدامة
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                نحن لا نبيع أجهزة تكييف فحسب، بل نصمم حلولاً هندسية مصممة خصيصاً لمشاريعك لضمان الكفاءة القصوى وتوفير الطاقة.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "استخدام أحدث تقنيات الـ VRF والـ Chiller",
                  "فريق هندسي متخصص للإشراف والتنفيذ",
                  "دقة متناهية في فتحات الكور بدون إضرار بالبناء",
                  "خدمة ما بعد البيع وصيانة وقائية"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-bold text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="text-secondary font-bold hover:text-primary transition-colors flex items-center gap-2">
                اقرأ قصتنا
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80" alt="Industrial 1" className="rounded-2xl object-cover h-64 w-full shadow-lg mt-8" />
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80" alt="Industrial 2" className="rounded-2xl object-cover h-64 w-full shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-primary font-bold tracking-wider mb-3">أعمالنا</h2>
              <h3 className="text-4xl font-extrabold text-foreground">مشاريع نعتز بها</h3>
            </div>
            <Link href="/projects" className="bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-6 py-2.5 rounded-lg font-bold transition-all flex items-center gap-2">
              كل المشاريع
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, 2).map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group relative rounded-2xl overflow-hidden shadow-lg aspect-video block">
                <img src={project.coverImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {project.date}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-white/80 line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
