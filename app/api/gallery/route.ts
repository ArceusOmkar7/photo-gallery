import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { FileMetadata } from "@/app/FileMetaData";

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
      blurPath: String,
    })
  );

export async function GET(request: NextRequest) {
  try {
    const data: FileMetadata[] = await fileMetadataModel.find();
    if (data.length === 0) {
      return NextResponse.json({}, { status: 200 });
    }
    const images = [
      data.map((img) => {
        return {
          blurPath: img.blurPath,
          path: img.path,
          originalFilename: img.originalFilename,
          width: img.width,
          height: img.height,
        };
      }),
    ];
    return NextResponse.json(
      {
        success: true,
        images,
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
