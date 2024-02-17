import { connectMongoDB } from "@/lib/mongodb";
import Authors from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

interface Request {
  json: () => Promise<{ name: string; email: string; password: string }>;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await Authors.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
