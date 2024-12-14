"use client";

import { Button, Grid, Heading } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { IoReload } from "react-icons/io5";
import Image from "next/image";

interface Image {
  path: string;
  blurPath: string;
  originalFilename: string;
  width: number;
  height: number;
}

const GalleryArea = () => {
  const [images, setImages] = useState<Image[] | null>();
  const [showGallery, setShowGallery] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();

      // No images present
      if (data.length === 0) {
        setShowGallery(false);
        return;
      }
      setShowGallery(true);
      setImages(data.images); // API returns { images: [{ path }] }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch images from the backend
  useEffect(() => {
    fetchImages();
  }, []);

  const getImagesCards = () => {
    console.log(images);
    const flattenedImages = Array.isArray(images) ? images.flat() : [];
    if (
      flattenedImages !== null &&
      flattenedImages !== undefined &&
      flattenedImages.length > 0
    ) {
      return flattenedImages?.map((image, index) => {
        if (!image.path) {
          console.error("Missing path for image:", image);
          return null;
        }

        return (
          <ImageCard
            key={index}
            path={image.path}
            blurPath={image.blurPath}
            originalFilename={image.originalFilename}
            width={image.width}
            height={image.height}
          />
        );
      });
    } else {
      return null;
    }
  };
  if (showGallery) {
    return (
      <div className="flex flex-col justify-between items-start gap-2">
        <Heading>Gallery</Heading>
        <Button
          onClick={() => {
            fetchImages();
          }}
        >
          <IoReload />
        </Button>
        <Grid columns="3" rows="repeat(2, auto)" width="auto" my="5" gap="5">
          {getImagesCards()}
        </Grid>
      </div>
    );
  } else return null;
};

export default GalleryArea;
