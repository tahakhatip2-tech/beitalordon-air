import { motion } from "framer-motion";
import { Users, Target, Shield, Award } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function About() {
  return (
    <div className="pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-secondary mb-6"
          >
            عن {COMPANY_INFO.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            نحن مؤسسة وطنية رائدة متخصصة في تصميم وتنفيذ وتوريد أنظمة التكييف المركزي وفتحات الكور ومجاري الهواء (الدكت) في المملكة الأردنية الهاشمية.
          </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl overflow-hidden shadow-2xl mb-24 h-[400px]"
        >
          {/* industrial factory worker hvac */}
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" 
            alt="Factory" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100 relative overflow-hidden">
            <Target className="w-16 h-16 text-primary mb-6 opacity-80" />
            <h3 className="text-2xl font-bold text-secondary mb-4">رؤيتنا</h3>
            <p className="text-muted-foreground leading-relaxed">
              أن نكون الخيار الأول والشركة المرجعية في قطاع المقاولات الميكانيكية وأنظمة التكييف المركزي في الأردن والمنطقة، من خلال تقديم حلول مبتكرة ومستدامة تفوق توقعات عملائنا.
            </p>
          </div>
          <div className="bg-orange-50/50 p-10 rounded-3xl border border-orange-100 relative overflow-hidden">
            <Shield className="w-16 h-16 text-secondary mb-6 opacity-80" />
            <h3 className="text-2xl font-bold text-secondary mb-4">مهمتنا</h3>
            <p className="text-muted-foreground leading-relaxed">
              الالتزام بأعلى معايير الجودة الهندسية والسلامة المهنية في جميع مشاريعنا، والاستثمار المستمر في التكنولوجيا والكوادر البشرية لتوفير بيئات عمل وسكن مريحة وصحية.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-12">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "الجودة والاحترافية", desc: "نحرص على أدق التفاصيل في التنفيذ." },
              { icon: Users, title: "العمل بروح الفريق", desc: "كفاءات هندسية وفنية متناغمة." },
              { icon: Target, title: "الالتزام بالمواعيد", desc: "تسليم المشاريع في الوقت المحدد." },
              { icon: Shield, title: "الشفافية والمصداقية", desc: "وضوح تام في التعامل مع العملاء." },
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-sm border border-border">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
