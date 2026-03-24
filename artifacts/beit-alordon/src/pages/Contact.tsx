import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Send, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "تم إرسال رسالتك بنجاح!",
        description: "سنتواصل معك في أقرب وقت ممكن.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="py-20 bg-gray-50/50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <MessageSquare className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 tracking-tight"
          >
            كيف يمكننا <span className="text-primary">مساعدتك؟</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed font-medium"
          >
            نحن هنا للرد على استفساراتك وتلبية طلباتك. سواء كان لديك استفسار عن خدماتنا أو ترغب في طلب عرض سعر لمشروعك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* ── INFO PANEL ── */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 h-full"
          >
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8 relative z-10">معلومات الاتصال المباشر</h3>
              
              <ul className="space-y-8 relative z-10">
                <li className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gray-50 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">الموقع الفعلي</p>
                    <p className="text-gray-500 font-medium leading-relaxed">{COMPANY_INFO.address}</p>
                  </div>
                </li>

                <li className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">الهاتف المباشر / واتساب</p>
                    <a href={`https://wa.me/${COMPANY_INFO.phone}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-600 font-bold transition-colors block text-left" dir="ltr">
                      +{(COMPANY_INFO.phone.replace(/^0/, "962"))}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gray-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">البريد الإلكتروني</p>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-500 hover:text-blue-600 font-bold transition-colors block text-left" dir="ltr">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gray-50 group-hover:bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Clock className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">ساعات العمل</p>
                    <p className="text-gray-500 font-medium leading-relaxed">{COMPANY_INFO.hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* ── CONTACT FORM ── */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">أرسل رسالتك</h3>
            <p className="text-gray-500 font-medium mb-8">قم بتعبئة النموذج وسنقوم بالرد عليك في غضون 24 ساعة.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="مثال: أحمد محمد"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    required 
                    dir="ltr"
                    placeholder="07X XXX XXXX"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-left placeholder:text-right"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني (اختياري)</label>
                <input 
                  type="email" 
                  dir="ltr"
                  placeholder="name@company.com"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-left placeholder:text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الخدمة المطلوبة</label>
                <div className="relative">
                  <select className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium appearance-none">
                    <option value="">-- اختر الخدمة --</option>
                    <option value="تكييف مركزي">أنظمة تكييف مركزي</option>
                    <option value="فتحات كور">خدمات فتحات الكور</option>
                    <option value="دكت">مجاري الهواء (الدكت)</option>
                    <option value="أخرى">استفسارات أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">تفاصيل الرسالة</label>
                <textarea 
                  required 
                  rows={4}
                  placeholder="اكتب استفسارك أو تفاصيل مشروعك هنا..."
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-orange-600 shadow-primary/30 hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">جاري الإرسال... <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white block"></span></span>
                ) : (
                  <>إرسال الرسالة <Send className="w-5 h-5 mx-1" /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
