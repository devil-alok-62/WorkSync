import { NextResponse } from "next/server";

import connectDb from "@/lib/db";

import Team from "@/model/Team";

export async function DELETE(
  req: Request,

  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDb();

    // Next.js 15 me params ko await karna hota hai

    const { id } = await params;

    console.log("Delete ID:", id);

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        {
          message: "Member not found",
        },

        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Member deleted",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        error: "Delete failed",
      },

      {
        status: 500,
      },
    );
  }
}
