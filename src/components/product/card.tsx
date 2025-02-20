"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  productName: string
  productDetail: string
  photo: string
  price: number
  qty: number
  functionEnabled: boolean
}

export function ProductCard({ productName, productDetail, photo, price, qty, functionEnabled }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price)

  const handleIncrement = () => {
    if (quantity < qty) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <Card className="w-auto max-w-sm overflow-hidden p-4">
      <div className="relative w-auto">
        <img src={photo || "/placeholder.svg"} alt={productName} className="w-full h-48 object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div>
              <h3 className="font-semibold text-lg">{productName}</h3>
            </div>
            <div className="mb-4">
              <span className="text-l">{productDetail}</span>
            </div>
            <div>
              <span className="text-xl font-bold">{formattedPrice}</span>
            </div>
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
              onChange={(e) => setQuantity(Math.max(1, Math.min(qty, Number.parseInt(e.target.value) || 1)))}
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
  )
}
