import type React from "react";
import { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { Menu, MapPin, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="md:hidden" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/" className="flex items-center">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">FleetTracker</span>
            </Link>
          </div>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          style={{
            zIndex:99999
          }}
          onClick={() => setSidebarOpen(false)}
          className={`bg-white ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-[--sidebar-width] flex flex-col border-r bg-sidebar p-4 shadow-md transition-transform md:relative md:translate-x-0 md:flex`}
        >
          <div className="flex justify-between items-center mb-4 md:hidden">
            <span className="text-lg font-bold">Menu</span>
            <Button 
              variant="ghost" 
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <DashboardNav />
        </div>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}