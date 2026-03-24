import { Link } from "wouter";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { Calendar, MapPin } from "lucide-react";

export default function Projects() {
  return (
    <div className="pt-8 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-secondary mb-6"
          >
            سجل المشاريع
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            نفخر في بيت الأردن بتنفيذ مجموعة من أضخم المشاريع السكنية والتجارية، والتي تعكس خبرتنا والتزامنا بأعلى المعايير.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={project.id} 
              className="group bg-card rounded-3xl overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-300 border border-border"
            >
              <Link href={`/projects/${project.id}`} className="block">
                <div className="h-64 sm:h-80 overflow-hidden relative">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg font-bold text-secondary shadow-sm">
                    {project.client}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {project.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> الأردن</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{project.title}</h2>
                  <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                  
                  <div className="mt-6 flex items-center text-primary font-bold hover:underline">
                    تفاصيل المشروع
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
