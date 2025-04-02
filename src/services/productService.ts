import { Product } from "@/types/product";
import { Base64Image } from "@/utils/imageUploader";

const mockProducts: Product[] = [
    { 
        id: "A001", 
        name: "Apple Iphone", 
        colorways: ["blue", "black", "purple"], 
        description: "<p>this is an electronics device</p>", 
        images: ["/AA.jpeg"], 
        price: 50, 
        quantity: 12,
        onSale: true, 
        functionEnabled: false 
    },
    { 
        id: "A002", 
        name: "Apple Watch", 
        colorways: ["midnight", "sand", "sky"], 
        description: "<p>this is an electronics device<p>", 
        images: ["/AA.jpeg","/AA.jpeg","/AA.jpeg","/AA.jpeg"],
        price: 500, 
        quantity: 10, 
        onSale: false, 
        functionEnabled: false 
    },
    { 
        id: "A003",
        name: "Samsung S24", 
        colorways: ["white", "ash", "dust"], 
        description: "<p>this is an electronics device</p>", 
        images: ["/AA.jpeg"], 
        price: 5000, 
        quantity: 1, 
        onSale: true, 
        functionEnabled: false },
    { 
        id: "A004",
        name: "Oppo Reno X", 
        colorways: ["grey", "red", "pink"], 
        description: "<p>this is an electronics device</p>", 
        images: ["/AA.jpeg"], 
        price: 5, 
        quantity: 9, 
        onSale: false, 
        functionEnabled: false 
    },
]

let products = [...mockProducts];

export const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 500);
    });
};

export const getProductsById = async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = products.find( r => r.id === id)
            resolve(product);
        }, 500);
    });
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const updatedImages = product.images.map((image, idx) => {
                const fileName = `${product.name.replace(/\s+/g, "_")}_${idx}.jpeg`;
                // Base64Image now triggers download, we'll return the intended path
                Base64Image(image, fileName);
                return `/products/${fileName}`; // Return the relative path
            });

            const newProduct = {
                ...product,
                images: updatedImages,
                id: Date.now().toString(),
            };
            products = [...products, newProduct];
            resolve(newProduct);
        }, 500);
    });
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let updatedImages: string[] | undefined;
            if (product.images) {
                updatedImages = product.images.map((image, idx) => {
                    const fileName = `${product.name?.replace(/\s+/g, "_") || "product"}_${idx}.jpeg`;
                    // Base64Image triggers download, we'll return the intended path
                    Base64Image(image, fileName);
                    return `/products/${fileName}`; // Return the relative path
                });
            }

            products = products.map((r) => 
                r.id === id ? { ...r, ...product, ...(updatedImages && { images: updatedImages }) } : r
            );
            const updatedProduct = products.find(r => r.id === id);
            resolve(updatedProduct);
        }, 500);
    });
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
        products = products.filter(r => r.id !== id);
        resolve(true);
        }, 500);
    });
};