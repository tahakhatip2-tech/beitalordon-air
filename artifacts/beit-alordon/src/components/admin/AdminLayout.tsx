import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Building2, 
  Settings, 
  LayoutDashboard, 
  Briefcase, 
  Wrench, 
  Calendar, 
  LogOut, 
  Menu,
  X
} from "lucide-react";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setLocation("/admin");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "الرئيسية", href: "/admin/dashboard" },
    { icon: Building2, label: "بيانات الشركة", href: "/admin/company" },
    { icon: Wrench, label: "إدارة الخدمات", href: "/admin/services" },
    { icon: Briefcase, label: "المشاريع", href: "/admin/projects" },
    { icon: Calendar, label: "الحجوزات", href: "/admin/bookings" },
    { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        flex flex-col
      `}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl text-primary">لوحة التحكم</h2>
            <p className="text-xs text-gray-500 mt-1">مصنع بيت الأردن</p>
          </div>
          <button className="lg:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer
                  ${isActive 
                    ? "bg-primary/10 text-primary font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}>
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-4 sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-lg text-gray-900">لوحة التحكم</span>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
