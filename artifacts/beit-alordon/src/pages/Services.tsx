import { Link } from "wouter";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function Services() {
  return (
    <div className="pt-8 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-secondary mb-6"
          >
            خدماتنا
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            مجموعة شاملة من خدمات التكييف المركزي والمقاولات الميكانيكية، مصممة لتلبية احتياجات كافة القطاعات بأعلى درجات الكفاءة.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={service.id} 
              className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-border"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={service.coverImage} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-8 flex-grow">{service.shortDesc}</p>
                <Link 
                  href={`/services/${service.id}`}
                  className="inline-flex items-center justify-between w-full bg-secondary/5 hover:bg-secondary hover:text-white text-secondary px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  التفاصيل والكتالوج
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
