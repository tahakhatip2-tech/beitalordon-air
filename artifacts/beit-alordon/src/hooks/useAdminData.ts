import { useState, useEffect } from "react";
import { SERVICES, PROJECTS, COMPANY_INFO, STATS } from "@/lib/data";

interface AdminData {
  company: typeof COMPANY_INFO;
  services: typeof SERVICES;
  projects: typeof PROJECTS;
  stats: typeof STATS;
}

export function useAdminData() {
  const [data, setData] = useState<AdminData | null>(null);

  useEffect(() => {
    // Load from local storage or fallback to initial data
    const stored = localStorage.getItem("beit-alordon-admin-data");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      const initialData = {
        company: COMPANY_INFO,
        services: SERVICES,
        projects: PROJECTS,
        stats: STATS,
      };
      setData(initialData);
      localStorage.setItem("beit-alordon-admin-data", JSON.stringify(initialData));
    }
  }, []);

  const updateData = (newData: AdminData) => {
    setData(newData);
    localStorage.setItem("beit-alordon-admin-data", JSON.stringify(newData));
  };

  const updateCompany = (company: typeof COMPANY_INFO) => {
    if (!data) return;
    updateData({ ...data, company });
  };

  const updateServices = (services: typeof SERVICES) => {
    if (!data) return;
    updateData({ ...data, services });
  };

  const updateProjects = (projects: typeof PROJECTS) => {
    if (!data) return;
    updateData({ ...data, projects });
  };

  return {
    data,
    updateCompany,
    updateServices,
    updateProjects,
    updateData,
  };
}
