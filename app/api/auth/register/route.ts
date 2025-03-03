import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  await connectDB()
  const { name, email, password, role } = await request.json()

  if (await User.findOne({ email })) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 })
  }

  const user = await User.create({ name, email, password, role })
  return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
}
