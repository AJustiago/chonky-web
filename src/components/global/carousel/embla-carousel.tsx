import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './embla-carousel-thumbs'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from 'lucide-react';

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])
  
    return (
      <div className="space-y-4">
        <div className="embla">
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {slides.map((index) => (
                <div className="embla__slide">
                <div className="relative border-2 border-dashed border-gray-200 rounded-lg aspect-square flex flex-col items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={"/placeholder.svg"}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary" onClick={() => document.getElementById("photo-upload")?.click()}>
                          Change Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="photo-upload"
                      className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                    >
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 uppercase">Upload Images</span>
                    </label>
                  )}
                  <input type="file" id="photo-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="embla-thumbs">
          <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container">
              {slides.map((index) => (
                <Button
                  key={index}
                  variant={index === selectedIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => onThumbClick(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default EmblaCarousel
