import { NextResponse } from "next/server";

import connectDb from "@/lib/db";

import Team from "@/model/Team";

// GET MEMBERS

export async function GET() {
  try {
    await connectDb();

    const members = await Team.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed",
      },
      {
        status: 500,
      },
    );
  }
}

// ADD MEMBER

export async function POST(req: Request) {
  try {
    await connectDb();

    const body = await req.json();

    const member = await Team.create(body);

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Create failed",
      },
      {
        status: 500,
      },
    );
  }
}
