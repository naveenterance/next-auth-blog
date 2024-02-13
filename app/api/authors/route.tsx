import connectMongoDB from "@/db/mongodb";
import author from "@/models/authors";
import { NextResponse } from "next/server";

interface AuthorData {
  name: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { name, password }: AuthorData = await request.json();
  await connectMongoDB();
  await author.create({ name, password });
  return NextResponse.json({ message: "author Created" }, { status: 201 });
}

export async function GET(): Promise<NextResponse> {
  await connectMongoDB();
  const authors = await author.find();
  return NextResponse.json({ authors });
}
