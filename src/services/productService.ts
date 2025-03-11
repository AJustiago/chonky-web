import { Product } from "@/types/product";

const mockProducts: Product[] = [
    { 
        id: "A001", 
        name: "Apple Iphone", 
        colorways: ["blue", "black", "purple"], 
        description: "this is an electronics device", 
        images: ["/AA.jpeg"], 
        price: 50000, 
        quantity: 12, 
        functionEnabled: false 
    },
    { 
        id: "A002", 
        name: "Apple Watch", 
        colorways: ["midnight", "sand", "sky"], 
        description: "this is an electronics device", 
        images: ["/AA.jpeg","/AA.jpeg","/AA.jpeg","/AA.jpeg"],
        price: 500000, 
        quantity: 10, 
        functionEnabled: false 
    },
    { 
        id: "A003",
        name: "Samsung S24", 
        colorways: ["white", "ash", "dust"], 
        description: "this is an electronics device", 
        images: ["/AA.jpeg"], 
        price: 5000000, 
        quantity: 1, 
        functionEnabled: false },
    { 
        id: "A004",
        name: "Oppo Reno X", 
        colorways: ["grey", "red", "pink"], 
        description: "this is an electronics device", 
        images: ["/AA.jpeg"], 
        price: 5000, 
        quantity: 9, 
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

export const getProductsByName = async (name: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const product = products.find( r => r.name === name)
            resolve(product);
        }, 500);
    });
};


export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newProduct = {
                ...product,
                id: Date.now().toString(),
            };
            products = [...products, newProduct];
            resolve(newProduct);
        }, 500);
    });
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | undefined> => {
    return new Promise((resolve) => {
        setTimeout(()=> {
        products = products.map(r => r.id ? { ...r, ...product }: r);
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