import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CarouselPluginProps {
  values: string[];
}

export function AutoCarousel({ values }: CarouselPluginProps) {
  const plugin = React.useRef(Autoplay({ delay: 3000}));

  return (
    <Carousel 
      plugins={[plugin.current]} 
      {...(values.length > 1 ? {
        onMouseEnter: () => plugin.current.stop(),
        onMouseLeave: () => plugin.current?.play(),
      } : {})}
    >
      <CarouselContent>
        {values.length > 0
          ? values.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  width={300} 
                  height={192}
                  className="w-full h-48 object-cover rounded-lg"
                  priority 
                  unoptimized
                />
                </div>
              </CarouselItem>
            ))
          : [<CarouselItem key="placeholder">
              <div>
              <Image
                src="/placeholder.svg"
                alt="Placeholder"
                width={400} 
                height={192}
                className="w-full h-48 object-cover rounded-lg"
              />
              </div>
            </CarouselItem>]}
      </CarouselContent>
    </Carousel>
  );
}
