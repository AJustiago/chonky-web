/**
 * Function to save Base64 string via API to a specific path
 * @param base64String - The Base64 string of the image
 * @param fileName - The desired file name
 * @returns string - The relative path
 */
export const Base64Image = async (base64String: string, fileName: string): Promise<string> => {
    try {
        const response = await fetch('/api/save-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64String, fileName }),
        });

        if (!response.ok) {
            throw new Error('Failed to save image');
        }

        const data = await response.json();
        return data.path;
    } catch (e) {
        throw new Error(`Error saving image: ${e}`);
    }
};