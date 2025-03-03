import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  await connectDB()

  const { email, password } = await request.json()
  const user = await User.findOne({ email })

  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
  }

  const token = sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1d" })
  cookies().set("auth-token", token, { httpOnly: true, path: "/", maxAge: 86400 })
  return NextResponse.json({ success: true, user: { _id: user._id, name: user.name, role: user.role, email: user.email } })
}
