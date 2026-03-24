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

/* ── Reusable section header ── */
function SectionHeader({ tag, title, sub, center = true }: { tag: string; title: string; sub?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`mb-14 ${center ? "text-center max-w-2xl mx-auto" : ""}`}
    >
      <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-3">
        <span className="w-8 h-0.5 bg-primary rounded-full" />
        {tag}
        <span className="w-8 h-0.5 bg-primary rounded-full" />
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{sub}</p>}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ── HERO SLIDER ── */}
      <HeroSlider />

      {/* ── FLOATING STATS BAND ── */}
      <section className="relative z-20 -mt-16 px-4 sm:px-8 mb-0">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-secondary/10 border border-border/60 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col items-center justify-center py-10 px-6 text-center relative
                    ${idx < 3 ? "after:content-[''] after:absolute after:left-0 after:top-1/4 after:h-1/2 after:w-px after:bg-border" : ""}`}
                >
                  <span className="text-5xl font-extrabold text-secondary mb-1">{stat.value}</span>
                  <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                  <span className="w-8 h-1 bg-primary rounded-full mt-3" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader
            tag="ماذا نقدم"
            title="خدمات هندسية متكاملة"
            sub="من التصميم إلى التركيب والصيانة — فريقنا يغطي كل احتياجاتك بأعلى معايير الجودة."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/40 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 h-full"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative shrink-0">
                    <img
                      src={service.coverImage}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                      خدمة
                    </div>
                  </div>
                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                      {service.shortDesc}
                    </p>
                    <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="text-primary font-bold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all">
                        اكتشف المزيد <ArrowLeft className="w-4 h-4" />
                      </span>
                      <span className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                        <Zap className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-10 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-secondary/25 hover:-translate-y-0.5"
            >
              عرض جميع الخدمات
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="py-28 bg-secondary text-white overflow-hidden relative">
        {/* decorative bg */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <SectionHeader tag="آلية العمل" title="كيف ننفذ مشروعك؟" sub="أربع خطوات واضحة من الفكرة إلى التسليم النهائي." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {[
              { step: "01", icon: "📋", title: "الدراسة والتصميم", desc: "نزور الموقع ونجري الدراسة الهندسية اللازمة لنضع تصميماً مثالياً يتناسب مع احتياجاتك وميزانيتك." },
              { step: "02", icon: "💰", title: "عرض السعر", desc: "نقدم لك عرض سعر مفصلاً وشفافاً يشمل كل المواد والتكاليف دون أي مفاجآت لاحقاً." },
              { step: "03", icon: "🔧", title: "التنفيذ والتركيب", desc: "ينفذ فريقنا الهندسي المتخصص المشروع بأعلى معايير الجودة والسلامة وفي المواعيد المحددة." },
              { step: "04", icon: "✅", title: "التسليم والضمان", desc: "نسلمك المشروع بعد الفحص الشامل مع ضمان كامل على التركيب ودعم فني مستمر." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative"
              >
                {/* connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-9 left-0 w-full h-px bg-white/10 z-0" style={{ right: "-50%" }} />
                )}
                <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/12 transition-all duration-300 relative z-10 h-full">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-4xl">{s.icon}</span>
                    <span className="text-6xl font-extrabold text-white/10 leading-none">{s.step}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-3">{s.title}</h3>
                  <p className="text-white/65 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Images mosaic */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[480px] order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80"
                alt="فريق العمل"
                className="absolute top-0 right-0 w-[68%] h-72 object-cover rounded-2xl shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                alt="تنفيذ المشاريع"
                className="absolute bottom-0 left-0 w-[58%] h-60 object-cover rounded-2xl shadow-xl border-4 border-white"
              />
              {/* badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-5 rounded-2xl shadow-2xl shadow-primary/40 text-center z-10">
                <p className="text-3xl font-extrabold">+15</p>
                <p className="text-xs font-medium mt-1 whitespace-nowrap">سنة خبرة</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <SectionHeader tag="لماذا نحن" title="لماذا تختار بيت الأردن؟" center={false} />
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                نحن لا نقدم أجهزة تكييف فحسب — بل نصمم حلولاً هندسية شاملة تضمن لك أعلى كفاءة وأطول عمر افتراضي مع توفير استهلاك الطاقة.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  { icon: "⚡", text: "أحدث تقنيات VRF وChiller الموفرة للطاقة" },
                  { icon: "👷", text: "فريق هندسي معتمد للإشراف والتنفيذ" },
                  { icon: "🎯", text: "دقة ميليمترية في فتحات الكور دون إضرار بالبنية" },
                  { icon: "🛡️", text: "ضمان شامل على التركيب والمواد" },
                  { icon: "🕐", text: "خدمة ما بعد البيع وصيانة وقائية دورية" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">{item.icon}</span>
                    <span className="font-semibold text-foreground pt-2">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary transition-all duration-300"
              >
                اقرأ قصتنا <ArrowLeft className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS BENTO ── */}
      <section className="py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <SectionHeader tag="أعمالنا" title="مشاريع نعتز بتنفيذها" center={false} />
            <Link
              href="/projects"
              className="shrink-0 bg-secondary/10 text-secondary hover:bg-secondary hover:text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              كل المشاريع <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className={`group relative rounded-2xl overflow-hidden shadow-lg block ${i === 0 ? "h-80" : "h-56"}`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                      {project.date}
                    </span>
                    <h3 className={`font-extrabold text-white ${i === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>
                      {project.title}
                    </h3>
                    {i === 0 && (
                      <p className="text-white/75 mt-2 line-clamp-2 text-sm">{project.description}</p>
                    )}
                  </div>
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionHeader tag="آراء عملائنا" title="ماذا يقول من عملوا معنا؟" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { name: "م. أحمد الشريف", role: "مدير مشاريع — فندق الأردن الكبير", text: "فريق محترف وملتزم بالمواعيد. نفّذوا نظام التكييف المركزي للفندق بأعلى جودة ودقة. نتعامل معهم من سنوات ونثق بهم تماماً.", stars: 5 },
              { name: "م. سارة النمر", role: "مالكة — مجمع الياسمين التجاري", text: "عرض السعر كان شفافاً ومفصلاً، والتنفيذ كان بمواصفات أعلى مما توقعنا. خدمة ما بعد البيع ممتازة والفريق متجاوب دائماً.", stars: 5 },
              { name: "المهندس خالد العمري", role: "مشرف هندسي — مستشفى الإسراء", text: "متخصصون حقيقيون في أنظمة التكييف الطبية. نفذوا غرف العمليات بمعايير HEPA الدولية بدقة وسرعة. أنصح بهم لأي مشروع.", stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border/50 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-foreground/80 leading-relaxed mb-6 flex-1 text-sm">"{t.text}"</p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {t.name.charAt(3)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-0">
        <div className="mx-4 sm:mx-8 lg:mx-16 mb-16 rounded-3xl overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="CTA Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-secondary/95 via-secondary/85 to-primary/70" />
          <div className="relative z-10 py-20 px-8 sm:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                هل لديك مشروع تريد تنفيذه؟
              </h2>
              <p className="text-white/80 text-lg">
                تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مفصّل لمشروعك.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/booking"
                className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
              >
                احجز الآن مجاناً <ArrowLeft className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/962795215525?text=السلام عليكم، أريد الاستفسار عن مشروع"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                واتساب مباشر
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
