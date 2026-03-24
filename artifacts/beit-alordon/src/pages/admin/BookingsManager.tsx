import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Calendar, 
  User, 
  Phone, 
  MessageSquare, 
  Trash2, 
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  name: string;
  phone: string;
  service: string;
  description?: string;
  dateAt: string;
  status: string;
}

export default function BookingsManager() {
  const [location, setLocation] = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (!isAuth) {
      setLocation("/admin");
    }

    const saved = localStorage.getItem('beit_alordon_bookings');
    if (saved) setBookings(JSON.parse(saved));
  }, [location, setLocation]);

  const deleteBooking = (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الحجز؟')) return;
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('beit_alordon_bookings', JSON.stringify(updated));
    toast({ title: "تم الحذف بنجاح" });
  };

  const markAsRead = (id: number) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'تمت المراجعة' } : b);
    setBookings(updated);
    localStorage.setItem('beit_alordon_bookings', JSON.stringify(updated));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">إصدارات الحجز والطلبات</h1>
            <p className="text-gray-500">إدارة كافة الطلبات المستلمة من زوار الموقع عبر نموذج الحجز.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            إجمالي الطلبات: {bookings.length}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
               <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
               <p className="text-gray-400 font-medium">لا توجد حجوزات مستلمة حالياً</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking.id}
                className={`bg-white p-6 rounded-2xl border transition-all hover:shadow-lg ${
                  booking.status === 'جديد' ? 'border-primary/30 bg-primary/[0.01]' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{booking.name}</h3>
                          <p className="text-xs text-gray-400">{booking.dateAt}</p>
                        </div>
                      </div>
                      {booking.status === 'جديد' && (
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                          جديد
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="font-medium" dir="ltr">{booking.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageSquare className="w-4 h-4 text-secondary" />
                        <span className="font-bold">الخدمة: {booking.service}</span>
                      </div>
                    </div>

                    {booking.description && (
                      <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 border border-gray-100 italic">
                        " {booking.description} "
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2 shrink-0">
                    <a 
                      href={`https://wa.me/${booking.phone.replace(/^0/, '962')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-green-500/10"
                    >
                      واتساب <ExternalLink className="w-4 h-4" />
                    </a>
                    <button 
                      onClick={() => markAsRead(booking.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    >
                      تمت المراجعة <CheckCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteBooking(booking.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    >
                      حذف <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
