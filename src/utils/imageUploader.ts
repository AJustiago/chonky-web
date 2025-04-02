/**
 * Function to convert Base64 string to Blob and trigger download
 * @param base64String - The Base64 string of the image
 * @param fileName - The desired file name
 * @returns string - The relative path of the downloaded file
 */
export const Base64Image = (base64String: string, fileName: string): string => {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const contentType = base64String.match(/^data:(image\/\w+);base64/)?.[1] || 'image/png';

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
   
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    link.download = fileName;

    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    
    return `/products/${fileName}`;
};