import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Factory, Zap } from "lucide-react";
import { SERVICES, PROJECTS, STATS } from "@/lib/data";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-secondary">
        {/* Background Image / Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-pattern.png`} 
            alt="Hero Pattern" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-white space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium text-orange-200">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                الخيار الأول في الأردن
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                رواد <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">التكييف المركزي</span> وأنظمة التهوية
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-xl leading-relaxed">
                في مصنع بيت الأردن، نجمع بين الدقة الهندسية وأعلى معايير الجودة لتنفيذ مشاريع التكييف للقطاعات التجارية والسكنية.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/booking" className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/30 hover:-translate-y-1 flex items-center gap-2">
                  احجز استشارة مجانية
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link href="/services" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm hover:-translate-y-1">
                  تصفح خدماتنا
                </Link>
              </div>
            </motion.div>

            {/* Decorative Graphic Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative h-[500px]"
            >
              {/* industrial HVAC photo */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://pixabay.com/get/g2de986f044a65eea5664406aa0dd0eb76040a19832bfb4bf2c491dec521f62344cb83bed289cb0767fbfce90dee261df42647810997586a1041b1797c5072c12_1280.jpg" 
                  alt="التكييف المركزي" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Factory className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-foreground">+15 عاماً</p>
                    <p className="text-sm text-muted-foreground">من الخبرة والتميز</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
