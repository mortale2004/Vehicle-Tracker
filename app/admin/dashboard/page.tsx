"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapContainer } from "@/components/map-container"
import { VehicleList } from "@/components/vehicle-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { VehicleStats } from "@/components/vehicle-stats"
import { AddVehicleForm } from "@/components/add-vehicle-form"

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles")

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch vehicles")
        }

        const data = await response.json()
        setVehicles(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    setInterval(fetchVehicles, 5000)

  }, [router])

  return (
     

      <div className="grid gap-6">
        <VehicleStats vehicles={vehicles} isLoading={isLoading} />

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Locations</CardTitle>
                <CardDescription>Real-time location of all your vehicles</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] rounded-md border">
                  <MapContainer vehicles={vehicles} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle List</CardTitle>
                <CardDescription>Manage and monitor all your vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleList vehicles={vehicles} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}

