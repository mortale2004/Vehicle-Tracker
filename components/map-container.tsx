"use client"

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader } from "@/components/ui/loader";

interface Vehicle {
  _id: string;
  name: string;
  licensePlate: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
  speed: number;
  lastUpdated: string;
}

interface MapContainerProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export function MapContainer({ vehicles, isLoading }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [hasUserMoved, setHasUserMoved] = useState(false);

  // Initialize the map once
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Detect user movement on the map
      mapInstance.current.on("movestart", () => setHasUserMoved(true));
    }
  }, []);

  // Update vehicle markers efficiently
  useEffect(() => {
    if (!mapInstance.current) return;

    vehicles.forEach((vehicle) => {
      if (markersRef.current.has(vehicle._id)) {
        // Update existing marker position
        const marker = markersRef.current.get(vehicle._id)!;
        marker.setLatLng([vehicle.location.lat, vehicle.location.lng]);
        marker.setPopupContent(
          `<b>${vehicle.name}</b><br>Speed: ${vehicle.speed.toFixed(2)} km/h`
        );
      } else {
        // Create new marker
        const marker = L.marker([vehicle.location.lat, vehicle.location.lng], {
          icon: getVehicleIcon(vehicle.type),
        }).addTo(mapInstance.current!);

        marker.bindPopup(
          `<b>${vehicle.name}</b><br>Speed: ${vehicle.speed.toFixed(2)} km/h`
        );

        markersRef.current.set(vehicle._id, marker);
      }
    });

    // Remove markers for vehicles that no longer exist
    markersRef.current.forEach((marker, id) => {
      if (!vehicles.find((v) => v._id === id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Move the map only on first render or if there are no manual movements
    if (vehicles.length > 0 && !hasUserMoved) {
      mapInstance.current.setView(
        [vehicles[0].location.lat, vehicles[0].location.lng],
        13
      );
    }
  }, [vehicles, hasUserMoved]);

  const getVehicleIcon = (type: string) => {
    let url = "";
    switch (type) {
      case "car":
        url = "https://cdn-icons-png.flaticon.com/512/744/744465.png";
        break;
      case "truck":
        url =
          "https://png.pngtree.com/png-vector/20240131/ourmid/pngtree-small-cargo-truck-png-png-image_11574572.png";
        break;
      case "van":
        url =
          "https://images.vexels.com/media/users/3/128645/isolated/preview/d96ab2658b0f1366bfc2d7074b49730b-retro-glossy-van.png";
        break;
      default:
        url = "https://cdn-icons-png.flaticon.com/512/744/744465.png";
    }
    return L.icon({
      iconUrl: url,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div ref={mapRef} className="h-full w-full">
      {vehicles.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p>No vehicles to display</p>
        </div>
      )}
    </div>
  );
}
