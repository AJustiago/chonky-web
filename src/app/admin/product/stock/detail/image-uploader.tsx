import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader = ({ images, setImages, maxImages = 5 }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addImages(e.target.files);
  };

  const addImages = (fileList: FileList) => {
    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(fileList.length, remainingSlots);
    
    const newImages = [...images];
    
    for (let i = 0; i < filesToProcess; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            setImages([...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
    
    if (fileList.length > remainingSlots) {
      toast.warning(`Only added ${remainingSlots} images. Maximum limit reached.`);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      addImages(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out ${
          dragActive 
            ? 'border-primary/70 bg-primary/5' 
            : 'border-border hover:border-primary/30 hover:bg-muted/50'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Image className="w-10 h-10 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium">
              Drag and drop images, or{" "}
              <span 
                className="text-primary cursor-pointer hover:underline" 
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum {maxImages} images, PNG, JPG or GIF (max 5MB each)
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            Select Images
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group rounded-lg overflow-hidden aspect-square border bg-muted/30 animate-fade-in"
            >
              <img 
                src={image} 
                alt={`Product image ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200"></div>
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
          ))}
          {Array.from({ length: maxImages - images.length }).map((_, index) => (
            <div 
              key={`empty-${index}`} 
              className="border border-dashed rounded-lg aspect-square flex items-center justify-center bg-muted/30"
            >
              <div className="text-muted-foreground/50">
                <ImagePlus className="w-6 h-6 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;