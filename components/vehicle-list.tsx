"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/loader"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"

interface Vehicle {
  id: string
  name: string
  licensePlate: string
  type: string
  location: {
    lat: number
    lng: number
  }
  speed: number
  lastUpdated: string
}

interface VehicleListProps {
  vehicles: Vehicle[]
  isLoading: boolean
}

export function VehicleList({ vehicles, isLoading }: VehicleListProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }


  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center space-y-3">
        <p className="text-muted-foreground">No vehicles found</p>
        <Button>Add Vehicle</Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>License Plate</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow
            key={vehicle.id}
            className={selectedVehicle === vehicle.id ? "bg-muted/50" : ""}
            onClick={() => setSelectedVehicle(vehicle.id)}
          >
            <TableCell className="font-medium">{vehicle.name}</TableCell>
            <TableCell>{vehicle.licensePlate}</TableCell>
            <TableCell>{vehicle.type}</TableCell>
            <TableCell>{vehicle.speed} km/h</TableCell>
            <TableCell>{formatDate(vehicle.lastUpdated)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

