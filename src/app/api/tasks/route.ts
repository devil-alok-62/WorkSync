import { NextResponse } from "next/server";

import connectDb from "@/lib/db";

import Task from "@/model/Task";

// GET ALL TASK

export async function GET() {
  await connectDb();

  const tasks = await Task.find().sort({
    createdAt: -1,
  });

  return NextResponse.json(tasks);
}

// CREATE TASK

export async function POST(req: Request) {
  await connectDb();

  const body = await req.json();

  const task = await Task.create(body);

  return NextResponse.json(task);
}
