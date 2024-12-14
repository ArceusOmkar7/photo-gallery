"use client";

import { Button } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const UploadArea = () => {
  const [file, setFile] = useState<File | null>(null); // Single file state
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null); // Reset any previous errors
    if (rejectedFiles.length > 0) {
      setError("Some files were not accepted due to unsupported file types.");
      return;
    }
    setFile(acceptedFiles[0] || null); // Only set the first accepted file
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Allow only single file
    accept: {
      "image/jpg": [".jpg", ".jpeg"],
      "image/png": [],
      "image/gif": [],
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      setSubmitting(true);

      try {
        const data = new FormData();
        data.set("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(await res.text());
      } catch (error: any) {
        console.log(error);
      }

      setSubmitting(false);
    } else {
      setSubmitting(false);
      setError("Please add file before submitting.");
    }
  };

  return (
    // <div className="flex flex-col space-y-7 items-center p-5 rounded-sm mb-5 border">
    <form
      className="flex flex-col items-center space-y-5 p-5 rounded-sm mb-5 border border-zinc-700 drop-shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl">Upload Media</h3>
      <div
        {...getRootProps()}
        className={`w-full p-5 border-2 border-dashed rounded-sm text-center ${
          isDragActive ? "border-green-500" : "border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop file here, or click to select file.</p>
        )}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
      {file !== null && (
        <div className="w-full text-center space-y-1">
          <p className="text-green-500">Selected File:</p>
          <ul>
            <li key={0} className="text-white">
              {file.name}
            </li>
          </ul>
        </div>
      )}
      <Button
        type="submit"
        className="hover:cursor-pointer"
        disabled={isSubmitting}
      >
        Upload{isSubmitting && <Spinner />}
      </Button>
    </form>
    // </div>
  );
};

export default UploadArea;
