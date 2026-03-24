import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, Clock, ArrowLeft, Airplay } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO } from "@/lib/data";
import { FloatingWidgets } from "@/components/FloatingWidgets";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/projects", label: "مشاريعنا" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground" dir="rtl">
      {/* Top Bar */}
      <div className="hidden md:flex bg-secondary text-secondary-foreground py-2 px-4 sm:px-6 lg:px-8 text-sm items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span dir="ltr">{COMPANY_INFO.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{COMPANY_INFO.address}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span>{COMPANY_INFO.hours}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.png`} 
                alt="Logo" 
                className="absolute inset-0 w-full h-full object-cover p-1 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-tight text-secondary">بيت الأردن</span>
              <span className="text-xs text-muted-foreground font-medium">للتكييف المركزي</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary border-b-2 border-primary pb-1" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex">
            <Link 
              href="/booking" 
              className="bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl flex items-center gap-2"
            >
              احجز الآن
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-b border-border absolute w-full"
            >
              <nav className="flex flex-col p-4 gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`p-3 rounded-lg font-medium ${
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link 
                  href="/booking" 
                  className="bg-primary text-white p-3 rounded-lg font-bold mt-2 text-center flex items-center justify-center gap-2"
                >
                  احجز موعدك الآن
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating Widgets: WhatsApp + Chat */}
      <FloatingWidgets />

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-white rounded-lg p-1">
                   <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-full h-full object-contain" />
                 </div>
                 <span className="font-display font-bold text-2xl text-white">بيت الأردن</span>
              </div>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed max-w-md">
                مصنع بيت الأردن للتكييف المركزي وفتحات الكور ودكت. نقدم أعلى مستويات الخدمة والجودة في تصميم وتركيب وصيانة أنظمة التكييف للمشاريع السكنية والتجارية في الأردن.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-6 text-white">روابط سريعة</h3>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-6 text-white">تواصل معنا</h3>
              <ul className="flex flex-col gap-4 text-secondary-foreground/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span dir="ltr">{COMPANY_INFO.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{COMPANY_INFO.hours}</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-secondary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-secondary-foreground/60">
            <p>© {new Date().getFullYear()} مصنع بيت الأردن للتكييف المركزي. جميع الحقوق محفوظة.</p>
            <p className="mt-2 md:mt-0">صُنع بإتقان في الأردن</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
