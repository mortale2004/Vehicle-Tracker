"use client";
import { AddVehicleForm } from "@/components/add-vehicle-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { VehicleList } from "@/components/vehicle-list";
import { useSession } from "next-auth/react";

const Vehicle = () => {
  const [vehicle, setVehicle] = useState(null);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const handleAddVehicle = (newVehicle:any) => {
    setVehicle(newVehicle);
    setShowAddVehicle(false);
  };
  const { data }:any = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`/api/vehicles`, {
          params: {
            user_id: data?.user._id,
          }
        });

        setVehicle(response.data[0]);

      
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [router, data?.user._id]);

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <DashboardHeader
            heading="Vehicle"
            text="Add a vehicle to your fleet and enable it for tracking!"
          >
            {!vehicle && 
            
            <Button onClick={() => setShowAddVehicle(true)}>Add Vehicle</Button>
            }
          </DashboardHeader>
          {!vehicle && showAddVehicle && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Vehicle</CardTitle>
                <CardDescription>
                  Enter the details of the vehicle you want to track
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddVehicleForm
                  onCancel={() => {}}
                  onSuccess={handleAddVehicle}
                />
              </CardContent>
            </Card>
          )}

        {vehicle && <VehicleList isLoading={false} vehicles={[vehicle]}/>}
        </Fragment>

      )}
    </div>
  );
};

export default Vehicle;
