import { Product } from "@/types/product";
import { Base64Image } from "@/utils/imageUploader";

const apiUrl = 'http://localhost:3100/products';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductsById = async (id: string): Promise<Product> => {
  const res = await fetch(`${apiUrl}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product by ID");
  return res.json();
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const updatedImages = await Promise.all(
    product.images.map(async (base64Image, idx) => {
      const fileName = `${product.name.replace(/\s+/g, "_")}_${idx}.jpeg`;
      return await Base64Image(base64Image, fileName);
    })
  );

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...product,
      images: updatedImages,
    }),
  });

  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  let updatedImages: string[] | undefined;

  if (product.images && product.images.some((img) => !img.startsWith("/"))) {
    updatedImages = await Promise.all(
      product.images.map(async (base64Image, idx) => {
        const fileName = `${product.name?.replace(/\s+/g, "_") || "product"}_${idx}.jpeg`;
        return await Base64Image(base64Image, fileName);
      })
    );
  }

  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...product,
      ...(updatedImages && { images: updatedImages }),
    }),
  });

  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete product");
  return true;
};
