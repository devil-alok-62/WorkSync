import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Task from "@/model/Task";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const { id } = await context.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();

    const { id } = await context.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        status: "Completed",
        progress: 100,
      },
      {
        new: true,
      },
    );

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
