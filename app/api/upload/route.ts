import { fileMetadataSchema, FileMetadata } from "@/app/FileMetaData";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { mkdir } from "fs/promises";
import sharp from "sharp";

await mkdir("/uploads/files", { recursive: true });
await mkdir("/uploads/blur", { recursive: true });

const mongoURI = process.env.DATABASE_URL;

if (!mongoURI) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const fileMetadataModel =
  mongoose.models.FileMetadata ||
  mongoose.model(
    "FileMetadata",
    new mongoose.Schema({
      filename: String,
      originalFilename: String,
      mimetype: String,
      size: Number,
      width: Number,
      height: Number,
      path: String,
    })
  );

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json(
      {
        message: "File not found",
      },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const customFileName = Date.now() + file.name;

  const path = join("./public/uploads/files/", customFileName);
  const blurPath = join("./public/uploads/blur/", customFileName);

  try {
    // saving original file
    const image = sharp(buffer);
    const { width, height } = await image.metadata();
    image.png({ quality: 100 }).toFile(path);
    image.blur(15).jpeg({ quality: 40 }).toFile(blurPath);
    console.log(`Original file saved at ${path}`);

    const metadata: FileMetadata = fileMetadataSchema.parse({
      filename: customFileName,
      originalFilename: file.name,
      mimetype: file.type,
      size: file.size,
      path: "/uploads/files/" + customFileName,
      blurPath: "/uploads/blur/" + customFileName,
      width,
      height,
    });

    const newFile = new fileMetadataModel(metadata);
    await newFile.save();

    return NextResponse.json(
      {
        message: "Uploaded",
        path,
        metadata,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      {
        message: "Failed to upload",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
