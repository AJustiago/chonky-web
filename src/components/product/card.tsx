"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { productSchema, Product } from "@/schemas/product.schema";

type ProductCardProps = Product;

export function ProductCard(props: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const parsedProps = productSchema.safeParse(props);

  if (!parsedProps.success) {
    console.error("Invalid product data:", parsedProps.error.format());
    return <div className="text-red-500">Invalid product data</div>;
  }

  const { product_name, product_colorway, photo, price, qty, functionEnabled } = parsedProps.data;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  const handleIncrement = () => {
    if (quantity < qty) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Card className="w-[400px] h-[450px] overflow-hidden p-4">
      <div className="relative w-full h-48">
        <img src={photo || "/placeholder.svg"} alt={product_name} className="w-full h-48 object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{product_name}</h3>
            <span className="text-lg block mb-4">{product_colorway}</span>
            <span className="text-xl font-bold">{formattedPrice}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={!functionEnabled || quantity === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(qty, Number(e.target.value) || 1)))}
              className="w-16 text-center"
              disabled={!functionEnabled}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              disabled={!functionEnabled || quantity === qty}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <span className="text-sm text-gray-600 block mb-4">{qty > 0 ? `${qty} left in stock` : "Out of stock"}</span>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full" disabled={!functionEnabled || qty === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button className="w-full" disabled={!functionEnabled || qty === 0}>
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
