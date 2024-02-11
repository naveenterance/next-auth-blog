import connectMongoDB from "@/db/mongodb";
import Article from "@/models/articles";
import { NextResponse } from "next/server";

interface ArticleData {
  title: string;
  content: string;
  author: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { title, content, author }: ArticleData = await request.json();
  await connectMongoDB();
  await Article.create({ title, content, author });
  return NextResponse.json({ message: "article Created" }, { status: 201 });
}

export async function GET(): Promise<NextResponse> {
  await connectMongoDB();
  const articles = await Article.find();
  return NextResponse.json({ articles });
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const id: string = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Article.findByIdAndDelete(id);
  return NextResponse.json({ message: "article deleted" }, { status: 200 });
}
