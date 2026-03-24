import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminData } from "@/hooks/useAdminData";
import { Plus, Edit2, Trash2, Save, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Project = ReturnType<typeof useAdminData>["data"] extends { projects: infer P } | null ? (P extends (infer T)[] ? T : never) : never;

export default function ProjectsManager() {
  const { data, updateProjects } = useAdminData();
  const { toast } = useToast();
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (!data) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isAdding) {
      updateProjects([...data.projects, editingProject]);
      setIsAdding(false);
    } else {
      updateProjects(data.projects.map(p => p.id === editingProject.id ? editingProject : p));
    }
    
    setEditingProject(null);
    toast({ title: "تم الحفظ بنجاح" });
  };

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع؟")) {
      updateProjects(data.projects.filter(p => p.id !== id));
      toast({ title: "تم الحذف بنجاح" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h1>
            <p className="text-gray-500 mt-1">تعديل وإضافة أعمال المصنع ومشاريعه السابقة</p>
          </div>
          <button 
            onClick={() => {
              setEditingProject({ id: Date.now().toString(), title: "", client: "", date: "", description: "", coverImage: "", images: [] });
              setIsAdding(true);
            }}
            className="bg-primary hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> إضافة مشروع
          </button>
        </div>

        {editingProject && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-200 ring-4 ring-orange-50">
            <h2 className="text-xl font-bold mb-4">{isAdding ? "إضافة مشروع جديد" : "تعديل المشروع"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">عنوان المشروع</label>
                  <input 
                    type="text" 
                    required
                    value={editingProject.title} 
                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">رابط صورة الغلاف</label>
                  <input 
                    type="text" 
                    value={editingProject.coverImage} 
                    onChange={e => setEditingProject({...editingProject, coverImage: e.target.value})}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">العميل</label>
                  <input 
                    type="text" 
                    value={editingProject.client} 
                    onChange={e => setEditingProject({...editingProject, client: e.target.value})}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">تاريخ الإنجاز / السنة</label>
                  <input 
                    type="text" 
                    value={editingProject.date} 
                    onChange={e => setEditingProject({...editingProject, date: e.target.value})}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">وصف المشروع</label>
                <textarea 
                  value={editingProject.description} 
                  onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary h-24" 
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 text-white bg-primary hover:bg-orange-600 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map(project => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col items-center">
              <div className="relative w-full h-40 bg-gray-100 border-b border-gray-100">
                <img src={project.coverImage || "https://images.unsplash.com/photo-1541888086925-920a0b2210ce?w=800"} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold rounded-full text-primary shadow-sm">
                  {project.date}
                </div>
              </div>
              
              <div className="p-5 w-full text-right flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                <p className="text-sm font-medium text-blue-600 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {project.client}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-5">{project.description}</p>
                
                <div className="flex items-center gap-2 w-full mt-auto">
                  <button 
                    onClick={() => { setEditingProject(project); setIsAdding(false); }}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg flex justify-center transition-colors font-medium text-sm"
                  >
                    <Edit2 className="w-4 h-4 ml-1.5" /> تعديل
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
