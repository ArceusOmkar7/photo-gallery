import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ImageCardProps {
  path: string;
  blurPath: string;
  originalFilename: string;
  width: number;
  height: number;
}

const ImageCard = ({
  path,
  blurPath,
  originalFilename,
  width,
  height,
}: ImageCardProps) => {
  const parsedPath = path.replace(/\\/g, "/");
  const parsedBlurPath = blurPath.replace(/\\/g, "/");
  console.log(parsedPath);
  return (
    <div className="flex flex-col gap-2 items-center justify-end">
      <Image
        src={parsedPath}
        alt={originalFilename || "unnamed"}
        width={width}
        height={height}
        quality={75}
        blurDataURL={parsedBlurPath}
        placeholder="blur"
      />
      <Link href={parsedPath} download={true} target="_blank">
        <Button className="hover:cursor-pointer">Download</Button>
      </Link>
    </div>
  );
};
export default ImageCard;
