import { useRoute, Link } from "wouter";
import { PROJECTS } from "@/lib/data";
import { motion } from "framer-motion";
import { Calendar, User, CheckCircle } from "lucide-react";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  
  if (!match) return null;

  const project = PROJECTS.find(p => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">المشروع غير موجود</h1>
        <Link href="/projects" className="text-primary hover:underline">العودة للمشاريع</Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-right">
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-6 text-sm"
          >
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-primary transition-colors">مشاريعنا</Link>
            <span>/</span>
            <span className="text-primary">{project.title}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-6"
          >
            {project.title}
          </motion.h1>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="flex flex-wrap items-center justify-center md:justify-start gap-6"
          >
            <div className="flex items-center gap-2 bg-secondary/5 px-4 py-2 rounded-lg text-secondary font-bold">
              <User className="w-5 h-5" />
              العميل: {project.client}
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg text-primary font-bold">
              <Calendar className="w-5 h-5" />
              التاريخ: {project.date}
            </div>
          </motion.div>
        </div>

        {/* Cover */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl overflow-hidden h-[40vh] md:h-[60vh] shadow-2xl mb-16 border border-border"
        >
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Details & Images Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border sticky top-32">
              <h3 className="text-2xl font-bold text-secondary mb-6">نظرة عامة</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {project.description}
              </p>
              <hr className="my-6 border-border" />
              <h4 className="font-bold mb-4">الأنظمة المستخدمة:</h4>
              <ul className="space-y-3">
                {['تكييف مركزي', 'نظام دكت متكامل', 'تأسيس فتحات الكور', 'نظام تحكم ذكي'].map((sys, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {sys}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-foreground mb-8">معرض الصور</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.images.map((img, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className={`rounded-2xl overflow-hidden shadow-md border border-border/50 ${i === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-square'}`}
                >
                  <img src={img} alt={`Project ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
