import mongoose, { Schema, Document } from "mongoose"

interface IVehicle extends Document {
  name: string
  licensePlate: string
  type: string
  location: {
    lat: number
    lng: number
  }
  speed: number
  lastUpdated: Date
  userId: any
}

const VehicleSchema = new Schema<IVehicle>({
  name: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  speed: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, required: true },
})

export default mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", VehicleSchema)
