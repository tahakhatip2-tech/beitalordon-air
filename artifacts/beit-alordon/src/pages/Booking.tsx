import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { COMPANY_INFO, SERVICES } from "@/lib/data";

const bookingSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب (يجب أن يكون حرفين على الأقل)" }),
  phone: z.string().min(9, { message: "رقم الهاتف غير صحيح" }),
  service: z.string().min(1, { message: "الرجاء اختيار الخدمة المطلوبة" }),
  description: z.string().optional()
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Booking() {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      description: ""
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    // Save to localStorage for Admin view
    const newBooking = {
      ...data,
      id: Date.now(),
      dateAt: new Date().toLocaleString('ar-JO'),
      status: 'جديد'
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('beit_alordon_bookings') || '[]');
    localStorage.setItem('beit_alordon_bookings', JSON.stringify([newBooking, ...existingBookings]));

    // Generate WhatsApp Message
    const msg = `مرحباً، أود حجز خدمة:%0A*الاسم:* ${data.name}%0A*الهاتف:* ${data.phone}%0A*الخدمة المطلوبة:* ${data.service}${data.description ? `%0A*الوصف/الملاحظات:* ${data.description}` : ''}`;
    
    // Open WhatsApp in new tab
    window.open(`https://wa.me/${COMPANY_INFO.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-[80vh] py-20 bg-background relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <MessageSquare className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            احجز استشارتك / موعدك
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-lg text-muted-foreground"
          >
            سيتم تحويل طلبك مباشرة عبر الواتساب لفريقنا للتواصل معك بأسرع وقت
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-8 md:p-10 rounded-3xl shadow-2xl border border-border"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">الاسم الكامل</label>
                <input 
                  {...form.register("name")}
                  className={`w-full px-4 py-3 rounded-xl bg-background border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${form.formState.errors.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'}`}
                  placeholder="محمد أحمد"
                />
                {form.formState.errors.name && <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">رقم الهاتف</label>
                <input 
                  {...form.register("phone")}
                  dir="ltr"
                  className={`w-full px-4 py-3 rounded-xl bg-background border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 text-right ${form.formState.errors.phone ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'}`}
                  placeholder="079XXXXXXX"
                />
                {form.formState.errors.phone && <p className="text-destructive text-sm mt-1">{form.formState.errors.phone.message}</p>}
              </div>

            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">الخدمة المطلوبة</label>
              <select 
                {...form.register("service")}
                className={`w-full px-4 py-3 rounded-xl bg-background border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${form.formState.errors.service ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'}`}
              >
                <option value="">-- اختر الخدمة --</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="استشارة عامة">استشارة عامة</option>
              </select>
              {form.formState.errors.service && <p className="text-destructive text-sm mt-1">{form.formState.errors.service.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">تفاصيل إضافية (اختياري)</label>
              <textarea 
                {...form.register("description")}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary transition-all outline-none focus:ring-4 focus:ring-primary/10 resize-none"
                placeholder="يرجى كتابة أي ملاحظات أو تفاصيل عن المشروع..."
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 text-lg"
            >
              إرسال عبر الواتساب
              <Send className="w-5 h-5 -rotate-90" />
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
