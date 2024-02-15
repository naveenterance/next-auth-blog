import { connectMongoDB } from "@/lib/mongodb";
import Authors from "@/models/user";
import { NextResponse } from "next/server";

interface Request {
  json(): Promise<{ email: string }>;
}

interface User {
  _id: string;
}

export async function POST(req: Request): Promise<NextResponse | undefined> {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user: User | User[] | null = await Authors.findOne({ email }).select(
      "_id"
    );
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
