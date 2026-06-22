import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/model/user.model";

function serializeUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  image?: string;
  phone?: string;
  location?: string;
  role?: string;
  bio?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image ?? "",
    phone: user.phone ?? "",
    location: user.location ?? "",
    role: user.role ?? "",
    bio: user.bio ?? "",
    hasPassword: Boolean(user.password),
    createdAt: user.createdAt?.toISOString() ?? null,
    updatedAt: user.updatedAt?.toISOString() ?? null,
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDb();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(serializeUser(user));
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to fetch profile", error: String(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const password = formData.get("password") as string | null;
    const phone = formData.get("phone") as string | null;
    const location = formData.get("location") as string | null;
    const role = formData.get("role") as string | null;
    const bio = formData.get("bio") as string | null;
    const imageFile = formData.get("image") as File | null;

    await connectDb();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (name && typeof name === "string") {
      user.name = name.trim();
    }

    if (typeof phone === "string") {
      user.phone = phone.trim();
    }

    if (typeof location === "string") {
      user.location = location.trim();
    }

    if (typeof role === "string") {
      user.role = role.trim();
    }

    if (typeof bio === "string") {
      user.bio = bio.trim();
    }

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      user.image = `data:${imageFile.type};base64,${base64}`;
    }

    if (password && typeof password === "string") {
      if (password.length < 6) {
        return NextResponse.json(
          { message: "Password must be at least 6 characters long" },
          { status: 400 },
        );
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: serializeUser(user),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to update profile", error: String(error) },
      { status: 500 },
    );
  }
}
