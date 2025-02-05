// File: app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

// Dummy user data (Replace with a real database)
const user = { email: "test@example.com", password: "123" };

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Simple email & password check
  if (email !== user.email || password !== user.password) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
