import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function Contact() {
  return (
    <div className="py-20 bg-background min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-secondary mb-6"
          >
            تواصل معنا
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            يسعدنا الرد على جميع استفساراتكم وتلبية طلباتكم. فريقنا متاح لخدمتكم دائماً.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-3xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-8">معلومات الاتصال</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg mb-1">العنوان</p>
                    <p className="text-muted-foreground">{COMPANY_INFO.address}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg mb-1">الهاتف / واتساب</p>
                    <p className="text-muted-foreground" dir="ltr">{COMPANY_INFO.phone}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg mb-1">البريد الإلكتروني</p>
                    <p className="text-muted-foreground">{COMPANY_INFO.email}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg mb-1">أوقات العمل</p>
                    <p className="text-muted-foreground">{COMPANY_INFO.hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border h-[400px] lg:h-full relative flex items-center justify-center"
          >
             <div className="absolute inset-0 bg-muted/30"></div>
             {/* Note: Embedded map normally goes here. Using a visual placeholder */}
             <div className="text-center z-10 p-6">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-foreground mb-2">موقعنا على الخريطة</h4>
                <p className="text-muted-foreground">{COMPANY_INFO.address}</p>
             </div>
             {/* Fake Map Image bg */}
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Map pattern" />
          </motion.div>

        </div>

      </div>
    </div>
  );
}
