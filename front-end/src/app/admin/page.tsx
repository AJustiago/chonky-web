"use client";
import AdminLayout from "@/components/admin/adminLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/loginService";

const AdminPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
    } else {
      setToken(token);
    }
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1>This is Dashboard Page</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
