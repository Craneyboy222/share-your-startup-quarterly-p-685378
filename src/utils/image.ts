/* Image utilities */

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
    });
}

export function getImageDimensions(url: string): Promise<{ width: number, height: number }> {
    return loadImage(url).then(img => ({ width: img.width, height: img.height }));
}