# 🏗️ مصنع بيت الأردن للتكييف المركزي

هذا المستودع يحتوي على الكود المصدري لموقع ولوحة تحكم "مصنع بيت الأردن للتكييف المركزي". 
تم تنظيف المشروع بالكامل من اعتماديات منصة Replit ليصبح جاهزاً للعمل والتطوير على أي بيئة محلية (Local Environment).

## 🚀 التقنيات المستخدمة

- **الواجهة الأمامية:** React 19, TypeScript, Vite 7
- **التصميم:** TailwindCSS v4, Framer Motion
- **التوجيه (Routing):** wouter
- **إدارة المجلدات:** pnpm workspaces (Monorepo)
- **لوحة التحكم:** Recharts, Lucide Icons, LocalStorage Data Management

---

## 🛠️ تفاصيل لوحة التحكم الإدارية (Admin Dashboard)

تم إنشاء لوحة تحكم متكاملة مدمجة مع الواجهة، تسمح لك بإدارة (الخدمات - المشاريع - معلومات الشركة - الإحصاءات) بدون الحاجة إلى قواعد بيانات معقدة حالياً، حيث تعتمد على التخزين المحلي للمتصفح (`localStorage`).

- **الرابط:** `http://localhost:3000/admin`
- **اسم المستخدم (الافتراضي):** `admin`
- **كلمة المرور (الافتراضية):** `admin2024`

> 💡 **ملاحظة:** أي تغيير في لوحة التحكم (مثل تغيير رقم الهاتف أو إضافة خدمة) سينعكس فوراً على الواجهة العامة للموقع.

---

## 💻 أوامر التشغيل (كيفية تشغيل المشروع)

بما أن المشروع يعتمد على بنية `pnpm workspace`، يُفضل استخدام حزمة `pnpm`. إذا لم تكن مثبتة لديك، يمكنك تثبيتها عبر الأمر:
```bash
npm install -g pnpm
```

### 1️⃣ الخطوة الأولى: تثبيت الحزم (Dependencies)
افتح موجه الأوامر (Terminal) في المسار الرئيسي للمشروع (المجلد الذي يحتوي على هذا الملف) ونفذ:
```bash
pnpm install
```

### 2️⃣ الخطوة الثانية: تشغيل واجهة الموقع ولوحة التحكم (التطوير)
لتشغيل موقع الواجهة (beit-alordon) محلياً:
```bash
pnpm --filter @workspace/beit-alordon run dev
```
أو يمكنك الدخول إلى المجلد الخاص بالواجهة وتشغيلها مباشرة:
```bash
cd artifacts/beit-alordon
npm run dev
```

سيتم تشغيل الموقع على الرابط:
👉 **[http://localhost:3000](http://localhost:3000)**

*(يمكنك الدخول إلى لوحة التحكم عبر إضافة `/admin` للرابط)*

### 3️⃣ (اختياري) تشغيل الخادم الخلفي (API Server)
إذا كنت ترغب بتشغيل خادم الـ API (الموجود في `artifacts/api-server`):
```bash
pnpm --filter @workspace/api-server run dev
```

---

## 📁 هيكل المشروع

```text
Jordan-Air-Solutions/
├── artifacts/
│   ├── beit-alordon/    # 🌍 واجهة الموقع (React + Vite) + لوحة التحكم
│   └── api-server/      # ⚙️ الخادم الخلفي (Express API)
├── lib/                 # 📚 المكتبات المشاركة (قاعدة بيانات، Zod schemas، الخ)
├── pnpm-workspace.yaml  # إعدادات الـ Workspace
└── package.json         # التبعيات الأساسية
```

## 🌐 أوامر بناء المشروع للإنتاج (Production Build)

إذا أردت تجهيز المشروع لرفعه على استضافة حقيقية:
```bash
# لعمل Build متكامل للمشروع (الواجهة والسيرفر)
pnpm run build

# لعمل Build للواجهة فقط:
pnpm --filter @workspace/beit-alordon run build
```
ستجد الملفات الجاهزة للرفع داخل مجلد `artifacts/beit-alordon/dist/public`
