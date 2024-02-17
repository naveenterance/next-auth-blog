import { connectMongoDB } from "@/lib/mongodb";
import Authors from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

interface Request {
  json(): Promise<{ email: string; name: string }>;
}

interface User {
  _id: string;
}

export async function POST(
  req: NextRequest
): Promise<NextResponse | undefined> {
  try {
    await connectMongoDB();
    const { name, email } = await req.json();

    const user: User | User[] | null = await Authors.findOne({
      $or: [{ name }, { email }],
    }).select("_id");

    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
