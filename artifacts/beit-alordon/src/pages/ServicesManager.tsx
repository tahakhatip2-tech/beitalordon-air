import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminData } from "@/hooks/useAdminData";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Service = ReturnType<typeof useAdminData>["data"] extends { services: infer S } | null ? (S extends (infer T)[] ? T : never) : never;

export default function ServicesManager() {
  const { data, updateServices } = useAdminData();
  const { toast } = useToast();
  
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (!data) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (isAdding) {
      updateServices([...data.services, editingService]);
      setIsAdding(false);
    } else {
      updateServices(data.services.map(s => s.id === editingService.id ? editingService : s));
    }
    
    setEditingService(null);
    toast({ title: "تم الحفظ بنجاح" });
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      updateServices(data.services.filter(s => s.id !== id));
      toast({ title: "تم الحذف بنجاح" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة الخدمات</h1>
            <p className="text-gray-500 mt-1">إضافة وتعديل وحذف خدمات المصنع</p>
          </div>
          <button 
            onClick={() => {
              setEditingService({ id: Date.now().toString(), title: "", shortDesc: "", longDesc: "", icon: "Wrench", coverImage: "", images: [] });
              setIsAdding(true);
            }}
            className="bg-primary hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> إضافة خدمة
          </button>
        </div>

        {editingService && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-200 ring-4 ring-orange-50">
            <h2 className="text-xl font-bold mb-4">{isAdding ? "إضافة خدمة جديدة" : "تعديل الخدمة"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">عنوان الخدمة</label>
                <input 
                  type="text" 
                  required
                  value={editingService.title} 
                  onChange={e => setEditingService({...editingService, title: e.target.value})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">وصف قصير (للصفحة الرئيسية)</label>
                <input 
                  type="text" 
                  value={editingService.shortDesc} 
                  onChange={e => setEditingService({...editingService, shortDesc: e.target.value})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">وصف طويل</label>
                <textarea 
                  value={editingService.longDesc} 
                  onChange={e => setEditingService({...editingService, longDesc: e.target.value})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary h-24" 
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingService(null)}
                  className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 text-white bg-primary hover:bg-orange-600 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> حفظ
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map(service => (
            <div key={service.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 min-h-10 mb-5">{service.shortDesc}</p>
              
              <div className="flex items-center gap-2 w-full mt-auto">
                <button 
                  onClick={() => { setEditingService(service); setIsAdding(false); }}
                  className="flex-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg flex justify-center transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
