import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface CarouselPluginProps {
  values: string[];
}

export function AutoCarousel({ values }: CarouselPluginProps) {
  const plugin = React.useRef(Autoplay({ delay: 3000}));

  return (
    <Carousel 
      plugins={[plugin.current]} 
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {values.length > 0
          ? values.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                  <img
                    src={image || "./placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))
          : [<CarouselItem key="placeholder">
              <div>
                <img
                  src="./placeholder.svg"
                  alt="Placeholder"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </CarouselItem>]}
      </CarouselContent>
    </Carousel>
  );
}
