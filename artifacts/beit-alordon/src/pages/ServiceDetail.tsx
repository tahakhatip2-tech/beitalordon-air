import { useRoute, Link } from "wouter";
import { SERVICES } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceDetail() {
  const [match, params] = useRoute("/services/:id");
  
  if (!match) return null;

  const service = SERVICES.find(s => s.id === params.id);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">الخدمة غير موجودة</h1>
        <Link href="/services" className="text-primary hover:underline">العودة للخدمات</Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Service Hero */}
      <div className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/80"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
          >
            {service.title}
          </motion.h1>
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="flex items-center justify-center gap-2 text-white/80"
          >
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">خدماتنا</Link>
            <span>/</span>
            <span className="text-primary">{service.title}</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-6">وصف الخدمة</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {service.longDesc}
          </p>
          
          <div className="bg-muted/50 p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-xl mb-4">مميزات هذه الخدمة:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['جودة ودقة عالية في التنفيذ', 'التزام تام بالجداول الزمنية', 'مواد معتمدة ومطابقة للمواصفات', 'إشراف هندسي متخصص'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-secondary mb-8 text-center">كتالوج الصور</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.images.map((img, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="rounded-2xl overflow-hidden aspect-square shadow-md border border-border/50"
            >
              <img src={img} alt={`${service.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/booking" className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:-translate-y-1">
            اطلب الخدمة الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
