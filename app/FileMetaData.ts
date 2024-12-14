import { z } from "zod";

const fileMetadataSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  blurPath: z.string().min(1, "Blur File path is required"),
  originalFilename: z.string().min(1),
  path: z.string().min(1, "File path is required"),
  mimetype: z.enum(["image/jpg", "image/jpeg", "image/png", "image/gif"]),
  size: z.number().max(10 * 1024 * 1024, "File size cannot exceed 10MB"),
  width: z.number().min(1, "Invalid Image"),
  height: z.number().min(1, "Invalid Image"),
});

type FileMetadata = z.infer<typeof fileMetadataSchema>;

export { fileMetadataSchema };
export type { FileMetadata };
