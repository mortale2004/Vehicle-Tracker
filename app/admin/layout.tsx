"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { useSession } from "next-auth/react";

const AdminAuthLayout = ({ children }: { children: React.ReactNode }) => {
  const {data}:any = useSession();
  const router = useRouter();

  
  useEffect(() => {
    if (!data?.user) {
      router.push("/login");
    } else if (data?.user.role !== "admin") {
      router.push("/");
    }
  }, [data?.user, router]);

  if (!data?.user|| data?.user.role !== "admin") {
    return <p>Redirecting...</p>;
  }

  return <DashboardShell>{children}</DashboardShell>;
};

export default AdminAuthLayout;

