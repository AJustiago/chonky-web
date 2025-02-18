"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/adminLayout";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/admin/login");
  };

  return (
    <AdminLayout>
      <div>
        <h1>This is Dashboard Page</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
