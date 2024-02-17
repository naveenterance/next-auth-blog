import connectMongoDB from "@/db/mongodb";
import article from "@/models/articles";
import { NextResponse } from "next/server";
import { Article } from "@/components/getArticles";

export async function POST(request: Request): Promise<NextResponse> {
  const { title, content, author }: Article = await request.json();
  await connectMongoDB();
  await article.create({ title, content, author });
  return NextResponse.json({ message: "article Created" }, { status: 201 });
}

export async function GET(): Promise<NextResponse> {
  await connectMongoDB();
  const articles = await article.find();
  return NextResponse.json({ articles });
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const id: string | null = url.searchParams.get("id");
  await connectMongoDB();
  await article.findByIdAndDelete(id);
  return NextResponse.json({ message: "article deleted" }, { status: 200 });
}
