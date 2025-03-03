"use client";

import { MapContainer } from "@/components/map-container";
import { Loader } from "@/components/ui/loader";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const POLLING_INTERVAL = 5000; // 5 seconds
const GEO_TIMEOUT = 30000; // 30 seconds timeout
const GEO_MAX_AGE = 0; // Force fresh location, no cached data


/**
 * Calculates speed (km/h) based on previous and current coordinates.
 * Uses Haversine formula to calculate distance and time difference to get speed.
 *
 * @param {number} prevLat - Previous latitude
 * @param {number} prevLng - Previous longitude
 * @param {number} currLat - Current latitude
 * @param {number} currLng - Current longitude
 * @param {number} prevTimestamp - Previous timestamp (milliseconds)
 * @param {number} currTimestamp - Current timestamp (milliseconds)
 * @returns {number} Speed in km/h
 */
const calculateSpeed = (prevLat:number, prevLng:number, currLat:number, currLng:number, prevTimestamp:number, currTimestamp:number) => {
  if (!prevLat || !prevLng || !currLat || !currLng || !prevTimestamp || !currTimestamp) {
    return 0; // Return 0 if any data is missing
  }

  const R = 6371; // Earth's radius in km
  const toRad = (angle) => (angle * Math.PI) / 180;

  const dLat = toRad(currLat - prevLat);
  const dLng = toRad(currLng - prevLng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(prevLat)) * Math.cos(toRad(currLat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in km
  const timeElapsed = (currTimestamp - prevTimestamp) / 3600000; // Convert ms to hours

  const speed = timeElapsed > 0 ? distance / timeElapsed : 0; // Speed in km/h

  return parseFloat(speed.toFixed(2)); // Return speed rounded to 2 decimal places
};



const LATUR_CENTER = { lat: 18.4088, lng: 76.5604 }; // Latur coordinates
const OFFSET_RANGE = 0.01; // Small random offset (around 1 km)

/**
 * Generates random dummy latitude and longitude near Latur.
 */
const generateRandomLocation = () => {
  const latOffset = (Math.random() - 0.5) * OFFSET_RANGE;
  const lngOffset = (Math.random() - 0.5) * OFFSET_RANGE;
  
  return {
    latitude: LATUR_CENTER.lat + latOffset,
    longitude: LATUR_CENTER.lng + lngOffset,
  };
};


const LiveTrackingPage = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/vehicles");
        setVehicles(response?.data || []);
        return response?.data?.[0];
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData().then((vehicle) => {
      if (!vehicle) return;

      const updateLocation = async (latitude: number, longitude: number, speed:number) => {
        try {
          await axios.post("/api/vehicles/update", {
            vehicleId: vehicle._id,
            speed: speed,
            location: { lat: latitude, lng: longitude },
          });

          setVehicles((prev) =>
            prev.map((v) =>
              v._id === vehicle._id ? { ...v, speed: speed,location: { lat: latitude, lng: longitude } } : v
            )
          );
        } catch (error) {
          console.error("Error updating location:", error);
        }
      };

      const trackLocation = () => {
        if (!navigator.geolocation) {
          console.error("Geolocation is not supported by this browser.");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // const {latitude, longitude} = generateRandomLocation();
            const speed = calculateSpeed(vehicle.location.lat, vehicle.location.lng, latitude, longitude, new Date(vehicle.lastUpdated).getTime(), Date.now());
            updateLocation(latitude, longitude, speed);
          },
          (error) => {
            console.error("Error getting initial location:", error);
          },
          { enableHighAccuracy: true, timeout: GEO_TIMEOUT, maximumAge: GEO_MAX_AGE }
        );
      };

      trackLocation();

      setInterval(() => {
        trackLocation();
      }, POLLING_INTERVAL);
    });

  }, []);

  return (
    <Fragment>
      {isLoading && <Loader className="h-8 w-8 animate-spin" />}
      {!isLoading && vehicles.length === 0 ? (
        <p>Vehicle Not Found!</p>
      ) : (
        <MapContainer vehicles={vehicles} isLoading={false} />
      )}
    </Fragment>
  );
};

export default LiveTrackingPage;
