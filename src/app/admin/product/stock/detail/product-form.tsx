import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import ImageUploader from './image-uploader';
import ColorwayManager from './colorway-uploader';
import DialogPreview from "./dialog-product";
import { Eye } from 'lucide-react';
import { productSchema } from '@/schemas/product.schema';

interface ProductFormProps {
  onSubmit?: (productData: ProductData) => void;
  initialValues?: ProductData | null;
}

export interface ProductData {
  id?: string;
  name: string;
  description: string;
  colorways: string[];
  quantity: number;
  price: number;
  images: string[];
}

const ProductForm = ({ onSubmit, initialValues }: ProductFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [colorways, setColorways] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    if (initialValues) {
      setImages(initialValues.images || []);
      setName(initialValues.name || '');
      setDescription(initialValues.description || '');
      setColorways(initialValues.colorways || []);
      setQuantity(initialValues.quantity || 1);
      setPrice(initialValues.price || 0);
    }
  }, [initialValues]);

  const handlePreview = () => {
    const data = {
      name: name, 
      colorways: colorways, 
      images: images, 
      price: price, 
      quantity: quantity,
      functionEnabled: false,
    };

    const parsedData = productSchema.safeParse(data);
    if (!parsedData.success) {
      console.error("Invalid product data:", parsedData.error.format());
      toast.error("Invalid product data for preview");
      return;
    }

    setPreviewData(parsedData.data); 
    setIsPreviewOpen(true);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setPrice(value === '' ? 0 : parseFloat(value));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const productData: ProductData = {
      id: initialValues?.id,
      name,
      description,
      colorways,
      quantity,
      price,
      images,
    };
    
    try {
      onSubmit?.(productData);
      toast.success('Product added successfully');
      resetForm();
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      toast.error('Please enter a product name');
      return false;
    }
    
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return false;
    }
    
    if (colorways.length === 0) {
      toast.error('Please add at least one colorway');
      return false;
    }
    
    if (price <= 0) {
      toast.error('Please enter a valid price');
      return false;
    }
    
    return true;
  };
  
  const resetForm = () => {
    setName('');
    setDescription('');
    setColorways([]);
    setQuantity(1);
    setPrice(0);
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Card className="border border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardDescription>
            Fill in the details below to add a new product to your inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-images">Product Images</Label>
            <ImageUploader 
              images={images} 
              setImages={setImages}
              maxImages={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-colorways">Colorways</Label>
            <ColorwayManager 
              colorways={colorways} 
              setColorways={setColorways} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="resize-none min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-quantity">Quantity</Label>
              <Input
                id="product-quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-price">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="product-price"
                  type="text"
                  value={price === 0 ? '' : price.toString()}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <div className="flex items-center w-full gap-80">
            <Button
              variant="outline"
              type="button"
              className="w-1/3"
              onClick={handlePreview}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>

            {/* DialogPreview Component */}
            <DialogPreview
              isOpen={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
              data={previewData}
            />

            <div className="flex gap-2 w-2/3 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductForm;
