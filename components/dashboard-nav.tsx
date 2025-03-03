"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, MapPin, Car, LogOut } from "lucide-react"
import { useRecoilValue } from "recoil"
import { signOut, useSession } from "next-auth/react"
import { Fragment } from "react";

export function  DashboardNav() {
  const pathname = usePathname();
  const {data}:any = useSession();
  const routes = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
      role: "admin",
    },
    {
      href: "/driver/vehicle",
      icon: Car,
      title: "Vehicle",
      role:"driver"
    },
    {
      href: "/driver/tracking",
      icon: MapPin,
      title: "Live Tracking",
      role: "driver",
    },
    // {
    //   href: "/dashboard/alerts",
    //   icon: Bell,
    //   title: "Alerts",
    // },
    // {
    //   href: "/dashboard/history",
    //   icon: History,
    //   title: "History",
    // },
    // {
    //   href: "/dashboard/settings",
    //   icon: Settings,
    //   title: "Settings",
    // },
  ]


  return (
    <Fragment>

      {routes.map((route) => {
        const Icon = route.icon
        return data?.user?.role === route?.role && (
          <Link key={route.href} href={route.href}>
            <Button
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === route.href && "bg-muted font-medium")}
            >
              <Icon className="mr-2 h-4 w-4" />
              {route.title}
            </Button>
          </Link>
        )
      })}
        <Button onClick={()=> {signOut({redirect:false})}} variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
    </Fragment>

  )
}

