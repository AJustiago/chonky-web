"use client";
import AdminLayout from "@/components/admin/adminLayout";
import { useAuth } from "@/hooks/use-auth";

const AdminPage = () => {
  const token = useAuth();

  if (!token) {
    return null;
  }


  return (
    <AdminLayout>
      <div>
        <h1>This is Dashboard Page</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
