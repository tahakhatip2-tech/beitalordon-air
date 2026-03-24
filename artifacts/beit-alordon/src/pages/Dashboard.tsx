import { useEffect } from "react";
import { useLocation } from "wouter";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminData } from "@/hooks/useAdminData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import { Users, Eye, ArrowUp, ArrowDown } from "lucide-react";

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const { data } = useAdminData();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (!isAuth) {
      setLocation("/admin");
    }
  }, [location, setLocation]);

  if (!data) return null;

  const chartData = [
    { name: "يناير", visits: 4000, bookings: 240 },
    { name: "فبراير", visits: 3000, bookings: 139 },
    { name: "مارس", visits: 2000, bookings: 980 },
    { name: "أبريل", visits: 2780, bookings: 390 },
    { name: "مايو", visits: 1890, bookings: 480 },
    { name: "يونيو", visits: 2390, bookings: 380 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">نظرة عامة</h1>
          <p className="text-gray-500 mt-1">مرحباً بك في لوحة تحكم مصنع بيت الأردن</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "زيارات الموقع", value: "24,591", icon: Eye, change: "+12%", up: true },
            { label: "طلبات الحجز", value: "124", icon: Users, change: "+5%", up: true },
            { label: "الخدمات النشطة", value: data.services.length.toString(), icon: Eye, change: "0%", up: true },
            { label: "المشاريع المنجزة", value: data.projects.length.toString(), icon: Eye, change: "+1", up: true },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.up ? "text-green-600" : "text-red-500"}`}>
                  {stat.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6 lg:h-[400px]">
          <h3 className="text-lg font-bold text-gray-900 mb-6">إحصاءات الزيارات والحجوزات</h3>
          <div className="h-72 lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280" }} dx={-40} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(249, 115, 22, 0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="visits" name="الزيارات" fill="#FF6B35" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="bookings" name="الحجوزات" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
