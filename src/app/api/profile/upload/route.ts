import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";

import authOptions from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file");
        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "Image file required" },
                { status: 400 },
            );
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Only JPG, PNG, and WebP allowed" },
                { status: 400 },
            );
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "Image must be under 5 MB" },
                { status: 400 },
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "worksync/profile-images", resource_type: "image" },
                (error, uploadResult) => {
                    if (error) return reject(error);
                    if (!uploadResult) {
                        return reject(new Error("Cloudinary returned no upload result"));
                    }
                    resolve(uploadResult);
                },
            );

            stream.end(buffer);
        });

        return NextResponse.json({
            success: true,
            imageUrl: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }
}