import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Vehicle from "@/models/Vehicle"
import { getSession } from "@/lib/auth"


// GET Vehicles (Authenticated User)
export async function GET(request:Request) {
  await connectDB()

  const session:any = await getSession();
  if (!session?.user){
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const filter:any = {
  }
  
  if (session?.user?.role !=="admin"){
    filter.userId = session?.user?._id
  }

  const userVehicles = await Vehicle.find(filter)
  return NextResponse.json(userVehicles)
}

// POST: Add a New Vehicle
export async function POST(request: Request) {
  await connectDB()

  const session:any = await getSession();

  if (session?.user?.role !== "driver"){
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const isExists = await Vehicle.findOne({ userId: session?.user?._id });

    if (isExists) {
      return NextResponse.json({ message: "You already have a vehicle" }, { status: 400 })
    }

    const newVehicle = await Vehicle.create({
      name: data.name,
      licensePlate: data.licensePlate,
      type: data.type,
      location: { lat: data.lat || 37.7749, lng: data.lng || -122.4194 },
      speed: 0,
      lastUpdated: new Date(),
      userId: session?.user?._id,
    })

    return NextResponse.json(newVehicle)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error adding vehicle" }, { status: 500 })
  }
}
