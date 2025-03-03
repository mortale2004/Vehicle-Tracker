import { ToastProvider } from "@/components/ui/use-toast"
import "./globals.css"
import Provider from "@/Provider"
import { getSession } from "@/lib/auth"


export const metadata = {
  title: "Vehicle Tracking System",
  description: "Real-time vehicle tracking system built with MERN stack",
    generator: 'v0.dev'
}

export default function RootLayout({ children }:any) {
  const session = getSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
        <ToastProvider>{children}</ToastProvider>
        </Provider>
      </body>
    </html>
  )
}

