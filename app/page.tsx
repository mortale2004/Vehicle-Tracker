import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Shield, Truck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">FleetTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
         
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Register
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Real-Time Vehicle Tracking System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Monitor your fleet in real-time. Track location, speed, and movement with our advanced GPS tracking
                    system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                 
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Vehicle Tracking"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/gmap.jpg?height=620&width=1100"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our vehicle tracking system provides everything you need to monitor your fleet efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <MapPin className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Real-Time Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor your vehicles in real-time with accurate GPS positioning and instant updates.
                </p>
              </div>
              <div className="grid gap-1">
                <Truck className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Fleet Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your entire fleet from a single dashboard. Add, remove, and organize vehicles with ease.
                </p>
              </div>
              <div className="grid gap-1">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Security Alerts</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive instant notifications for unauthorized movement, speeding, or geofence violations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} FleetTracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

