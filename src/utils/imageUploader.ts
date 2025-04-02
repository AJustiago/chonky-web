import fs from 'fs';
import path from 'path';

/**
 * Function to save Base64 string as an image and return the file path
 * @param base64String - The Base64 string of the image
 * @param fileName - The desired file name
 * @returns The saved file path
 */
export const saveBase64ImageToFile = (base64String: string, fileName: string): string => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const uploadDir = path.join(process.cwd(), 'public', 'products');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
    return `/products/${fileName}`;
};
