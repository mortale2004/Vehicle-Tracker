"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const {data}:any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data?.user){
      router.push("/login");
    }else if (data?.user?.role ==="admin") {
        router.push("/admin/dashboard");
    } else if (data?.user?.role === "driver") {
        router.push("/driver/tracking");
    }
  }, [data?.user, router]);

  
  return <div>{children}</div>;
};

export default AuthLayout;
