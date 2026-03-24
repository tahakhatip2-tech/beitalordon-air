import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "962795215525";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

const KNOWLEDGE_BASE: { patterns: string[]; response: string }[] = [
  {
    patterns: ["مرحبا", "هلا", "السلام", "اهلا", "اهلين", "مساء", "صباح", "كيف حالك"],
    response: "أهلاً وسهلاً بك في مصنع بيت الأردن للتكييف المركزي! 🌟\nأنا مستشارك الهندسي المتخصص، كيف أستطيع مساعدتك اليوم؟\n\nيمكنني مساعدتك في:\n• معرفة خدماتنا\n• الأسعار والعروض\n• حجز موعد أو استشارة\n• تفاصيل مشاريعنا"
  },
  {
    patterns: ["خدمات", "خدمة", "ماذا تقدمون", "ماذا تعملون", "شو شغلتكم"],
    response: "نقدم في مصنع بيت الأردن مجموعة متكاملة من الخدمات الهندسية:\n\n❄️ **تكييف مركزي** – تصميم وتركيب أنظمة VRF وChiller للمشاريع الكبيرة\n🔧 **فتحات الكور** – حفر خرساني دقيق بمعدات ألمانية متطورة\n🌀 **أنظمة الدكت** – تصنيع وتركيب مجاري الهواء بمواصفات عالمية\n🛠️ **تركيب وصيانة** – فريق هندسي متخصص وبرامج صيانة دورية\n🏢 **مشاريع تجارية** – مولات، شركات، مكاتب\n🏠 **مشاريع سكنية** – فلل، برج، مجمعات سكنية\n\nأي خدمة تودّ معرفة تفاصيلها؟"
  },
  {
    patterns: ["تكييف مركزي", "سنترال", "central", "chiller", "vrf"],
    response: "نحن متخصصون في تصميم وتنفيذ أنظمة التكييف المركزي باحترافية عالية:\n\n✅ أنظمة VRF (تدفق متغير) – الأكثر كفاءة في توفير الطاقة\n✅ أنظمة Chiller المائية للمشاريع الضخمة\n✅ نظام BMS (إدارة المباني الذكية)\n✅ تغطي كل أنواع المشاريع: فنادق، مستشفيات، مولات، أبراج\n\n📌 نبدأ بدراسة مجانية لمشروعك وتقديم عرض سعر مفصّل.\nهل تريد حجز استشارة الآن؟"
  },
  {
    patterns: ["كور", "حفر", "خرسانة", "خرساني", "core"],
    response: "خدمة فتحات الكور (Core Drilling) تتميز بـ:\n\n🔩 معدات ألمانية متطورة للحفر الدقيق\n🔩 حفر بدون اهتزازات تضر بالبنية التحتية\n🔩 مقاسات مختلفة حسب الاحتياج (من 50mm حتى 600mm)\n🔩 مناسبة لتمرير مواسير التكييف، الكابلات، والصرف الصحي\n🔩 فريق فني متخصص يعمل بسرعة ودقة\n\nهل لديك مشروع محدد تريد الاستفسار عنه؟"
  },
  {
    patterns: ["دكت", "مجرى الهواء", "قناة الهواء", "duct"],
    response: "في مصنع بيت الأردن نصنع أنظمة الدكت بأعلى المعايير:\n\n🏭 مصنع مجهز بأحدث ماكينات تشكيل الصاج المجلفن\n📐 تصنيع بمقاسات دقيقة حسب تصميم المشروع\n🌡️ عزل حراري وصوتي متكامل\n✈️ توزيع هواء مثالي ومتوازن\n🔇 تصاميم منخفضة الضوضاء\n\nيمكنك زيارة مصنعنا لمشاهدة عملية التصنيع. هل تريد تحديد موعد؟"
  },
  {
    patterns: ["صيانة", "عطل", "مشكلة", "خراب", "تصليح"],
    response: "فريق الصيانة لدينا جاهز طوال أوقات الدوام! 🛠️\n\nنقدم:\n✅ صيانة دورية وقائية بعقود سنوية\n✅ صيانة طارئة بسرعة استجابة عالية\n✅ فحص شامل لكل مكونات النظام\n✅ تغيير قطع الغيار الأصلية\n✅ ضبط وتوازن تدفق الهواء\n\n⏰ أوقات العمل: السبت – الخميس، 8 صباحاً – 6 مساءً\n\nللطوارئ، تواصل معنا فوراً على واتساب 📱"
  },
  {
    patterns: ["سعر", "تكلفة", "كم يكلف", "بكم", "قيمة", "عرض سعر", "تسعيرة"],
    response: "السعر يعتمد على تفاصيل مشروعك، لكن نضمن لك:\n\n💰 أفضل الأسعار التنافسية في السوق الأردني\n📋 عرض سعر مجاني ومفصّل دون أي التزام\n📅 دفعات مرنة تناسب مشروعك\n🏆 ضمان على جودة التركيب والمواد\n\n📲 لأحصل لك على عرض سعر دقيق:\n1️⃣ راسلنا على الواتساب\n2️⃣ أو احجز استشارة مجانية من الموقع\n\nهل تريد أن أفتح لك محادثة واتساب الآن؟"
  },
  {
    patterns: ["عنوان", "مكان", "اين", "أين", "موقع", "وين", "ياسمين"],
    response: "يسعدنا استقبالك في مصنعنا! 📍\n\n🏭 **عنواننا:** دوار الياسمين، عمّان، الأردن\n\n⏰ **أوقات الدوام:**\nالسبت إلى الخميس\n8:00 صباحاً – 6:00 مساءً\n\n📌 دوار الياسمين موقع مركزي يسهل الوصول إليه من معظم مناطق عمّان.\n\nهل تريد تحديد موعد لزيارة المصنع؟"
  },
  {
    patterns: ["وقت", "دوام", "ساعات العمل", "متى", "موعد"],
    response: "أوقات عمل مصنع بيت الأردن:\n\n🗓️ **الأيام:** السبت – الخميس\n⏰ **الساعات:** 8:00 صباحاً – 6:00 مساءً\n\n❗ يوم الجمعة إجازة رسمية\n\nيمكنك دائماً التواصل معنا عبر واتساب وسيرد عليك فريقنا في أقرب وقت ممكن."
  },
  {
    patterns: ["حجز", "موعد", "استشارة", "كيف احجز"],
    response: "لحجز موعد أو استشارة مجانية، لديك خيارات سهلة:\n\n1️⃣ **من الموقع مباشرةً** – اضغط على \"احجز الآن\" في القائمة\n2️⃣ **واتساب** – راسلنا على 0795215525\n3️⃣ **زيارة المصنع** – دوار الياسمين، عمّان\n\n✅ الاستشارة الأولى مجانية تماماً!\n✅ نلتزم بالرد خلال ساعات العمل\n\nأريد فتح واتساب لك الآن؟"
  },
  {
    patterns: ["مشاريع", "اعمال", "اعمالكم", "انجازات"],
    response: "مصنع بيت الأردن نفّذ مئات المشاريع المتميزة، أبرزها:\n\n🏨 فندق الأردن الكبير – نظام مركزي متكامل لـ300+ غرفة\n🛍️ مجمع الياسمين التجاري – 50,000 م² من التكييف\n🏢 برج الجبيهة السكني – أنظمة VRF للشقق\n🏥 مستشفى الإسراء – أنظمة HEPA للغرف الطبية\n\n📊 **إنجازاتنا:**\n• +15 سنة خبرة\n• +250 مشروع منجز\n• +400 عميل راضٍ\n• 50 مهندس وفني\n\nهل لديك مشروع مشابه تريد تنفيذه؟"
  },
  {
    patterns: ["فندق", "مستشفى", "مول", "تجاري"],
    response: "نحن متخصصون في المشاريع التجارية الكبرى:\n\n🏨 **فنادق** – أنظمة مركزية مع BMS لإدارة ذكية\n🏥 **مستشفيات** – فلاتر HEPA وغرف نظيفة معتمدة\n🛍️ **مولات ومراكز تجارية** – توزيع هواء ضخم وهادئ\n🏢 **مكاتب وأبراج** – أنظمة VRF اقتصادية وموزعة\n\nلكل مشروع نقدم دراسة هندسية كاملة قبل البدء.\nهل تريد التحدث مع مهندسينا مباشرة؟"
  },
  {
    patterns: ["ضمان", "كفالة", "guarantee"],
    response: "نقدم ضمانات شاملة لضمان راحة بالك:\n\n🛡️ **ضمان على التركيب:** سنة كاملة\n🛡️ **ضمان على المواد والمعدات:** حسب الشركة المصنّعة (عادةً 2-5 سنوات)\n🛡️ **دعم فني مستمر** طوال فترة الضمان\n🛡️ **عقود صيانة** بأسعار مميزة بعد انتهاء الضمان\n\nنلتزم بأعلى معايير الجودة في كل مرحلة من مراحل العمل."
  },
  {
    patterns: ["واتساب", "whatsapp", "رقم", "هاتف", "اتصل", "تواصل"],
    response: "يسعدنا التواصل معك! 📱\n\n**واتساب:** 0795215525\n\nيمكنك:\n✅ إرسال صور المشروع أو المكان\n✅ طلب عرض سعر مباشر\n✅ تحديد موعد استشارة\n✅ الاستفسار عن أي خدمة\n\nفريقنا يرد خلال أوقات الدوام:\nالسبت – الخميس، 8 صباحاً – 6 مساءً\n\nهل أفتح لك المحادثة الآن؟"
  },
  {
    patterns: ["شكرا", "شكراً", "ممتاز", "عظيم", "كويس"],
    response: "شكراً لتواصلك معنا! 🙏\n\nيسعدنا دائماً خدمتك. إذا كان لديك أي سؤال آخر أو تحتاج مساعدة في أي وقت، أنا هنا!\n\nلا تتردد في التواصل معنا مباشرة عبر واتساب على الرقم 0795215525 🌟"
  }
];

function getResponse(input: string): string {
  const normalizedInput = input.trim().toLowerCase();

  for (const entry of KNOWLEDGE_BASE) {
    for (const pattern of entry.patterns) {
      if (normalizedInput.includes(pattern.toLowerCase())) {
        return entry.response;
      }
    }
  }

  return "شكراً على سؤالك! 🤔\n\nللإجابة الدقيقة على استفساراتك، يُفضّل التحدث مع فريقنا مباشرةً:\n\n📱 **واتساب:** 0795215525\n📍 **الموقع:** دوار الياسمين، عمّان\n⏰ **الدوام:** السبت – الخميس، 8 ص – 6 م\n\nأو يمكنك:\n• كتابة \"خدمات\" لمعرفة ما نقدمه\n• كتابة \"سعر\" للاستفسار عن التكاليف\n• كتابة \"حجز\" لتحديد موعد استشارة مجانية";
}

function formatTime() {
  return new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
}

export function FloatingWidgets() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "مرحباً بك في مصنع بيت الأردن للتكييف المركزي! 👋\n\nأنا المستشار الهندسي الذكي، هنا لمساعدتك في:\n• معرفة خدماتنا ومشاريعنا\n• الحصول على معلومات الأسعار\n• حجز موعد أو استشارة مجانية\n\nاكتب سؤالك وسأجيبك فوراً! 😊",
      time: formatTime()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text,
      time: formatTime()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getResponse(text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "bot",
        text: botResponse,
        time: formatTime()
      }]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن خدماتكم")}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3" dir="rtl">
      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[350px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: "480px", maxWidth: "calc(100vw - 2rem)" }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-l from-blue-900 to-blue-800 px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-800"></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm">المستشار الهندسي</p>
                <p className="text-blue-200 text-xs">بيت الأردن للتكييف المركزي • متصل الآن</p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[78%] ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-orange-500 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="bg-white border-t border-gray-100 px-3 py-2 flex gap-2 overflow-x-auto shrink-0">
              {["الخدمات", "الأسعار", "حجز موعد", "العنوان"].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    setInputText(q);
                    setTimeout(() => sendMessage(), 50);
                  }}
                  className="shrink-0 text-xs text-blue-800 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 p-3 flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 focus:bg-white transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Buttons Row */}
      <div className="flex items-end gap-3">
        {/* WhatsApp Button */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن خدماتكم")}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="relative group"
          title="تواصل عبر واتساب"
        >
          <div className="absolute inset-0 bg-green-400 rounded-2xl animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-2xl shadow-lg shadow-green-500/40 flex items-center justify-center transition-all">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            تواصل على واتساب
          </div>
        </motion.a>

        {/* Chat Button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="relative group"
          title="تحدث مع المستشار"
        >
          {!isChatOpen && messages.length === 1 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center z-10">
              <span className="text-white text-[10px] font-bold">1</span>
            </div>
          )}
          <div className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all ${
            isChatOpen
              ? "bg-gray-700 shadow-gray-500/30"
              : "bg-blue-800 hover:bg-blue-900 shadow-blue-500/40"
          }`}>
            <AnimatePresence mode="wait">
              {isChatOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-7 h-7 text-white" />
                </motion.div>
              ) : (
                <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <MessageCircle className="w-7 h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isChatOpen ? "إغلاق الشات" : "تحدث مع المستشار"}
          </div>
        </motion.button>
      </div>
    </div>
  );
}
