import { NextResponse } from "next/server";
import Vehicle from "@/models/Vehicle";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { vehicleId, location, speed } = await request.json();

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return NextResponse.json({ message: "Vehicle not found" }, { status: 404 });
    }

    vehicle.location = location;
    vehicle.lastUpdated = new Date();
    vehicle.speed = speed;
    await vehicle.save();

    return NextResponse.json({ success: true, message: "Location updated" });
  } catch (error) {
    console.error("Error updating vehicle location:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
