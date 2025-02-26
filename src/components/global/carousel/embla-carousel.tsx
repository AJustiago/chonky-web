"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus } from "lucide-react";

type PropType = {
  imagePath: string[];
  options?: EmblaOptionsType;
  onAddImage?: (imageUrl: string) => void;
};

const EmblaCarousel: React.FC<PropType> = ({ imagePath, options, onAddImage }) => {
  const [imageList, setImageList] = useState<string[]>(imagePath.length ? imagePath : [""]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setImageList(imagePath.length ? imagePath : [""]);
  }, [imagePath]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedList = [...imageList];
      updatedList[index] = imageUrl;
      setImageList(updatedList);
      if (onAddImage) onAddImage(imageUrl);
    }
  };

  const addNewImageSlot = () => {
    if (imageList.length < 5) {
      setImageList([...imageList, ""]);
    }
  };

  const removeImageSlot = (index: number) => {
    if (imageList.length > 1) {
      setImageList(imageList.filter((_, i) => i !== index));
    }
  };

  // Carousel hooks
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

  const onThumbClick = useCallback((index: number) => {
    if (!emblaMainApi) return;
    emblaMainApi.scrollTo(index);
  }, [emblaMainApi]);

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="embla">
        <div className="embla__viewport" ref={emblaMainRef}>
          <div className="embla__container">
            {imageList.map((path, index) => (
              <div key={index} className="embla__slide">
                <div className="relative border-2 border-dashed border-gray-200 rounded-lg aspect-square flex flex-col items-center justify-center overflow-hidden">
                  {path ? (
                    <div className="relative w-full h-full group">
                      <img src={path || "/placeholder.svg"} alt="Product preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" onClick={() => document.getElementById(`photo-upload-${index}`)?.click()}>
                          Change Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor={`photo-upload-${index}`} className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 uppercase">Upload Image</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id={`photo-upload-${index}`}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Selector */}
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container flex items-center gap-2 mt-4">
            {imageList.map((_, index) => (
              <div key={index} className="relative">
                <Button variant={index === selectedIndex ? "default" : "outline"} size="sm" onClick={() => onThumbClick(index)}>
                  {index + 1}
                </Button>

                {/* Delete Button */}
                {imageList.length > 1 && (
                  <button
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px]"
                    onClick={() => removeImageSlot(index)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}

            {/* Add New Image Button */}
            {imageList.length < 5 && (
              <Button variant="outline" size="sm" onClick={addNewImageSlot}>
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
