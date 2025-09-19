/**
 * Utility functions for file handling and base64 operations
 */

export interface FileData {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  uploadedAt: Date;
  base64Data: string;
  publicUrl: string;
}

/**
 * Convert a File object to base64 data URL
 * @param file - The file to convert
 * @returns Promise<string> - The base64 data URL
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

/**
 * Create file data object with base64 conversion
 * @param file - The file to process
 * @param additionalData - Any additional data to include
 * @returns Promise<FileData> - The processed file data
 */
export const createFileData = async (
  file: File,
  additionalData: Record<string, any> = {}
): Promise<FileData> => {
  const base64Data = await fileToBase64(file);

  return {
    filename: `${Date.now()}_${file.name}`,
    originalName: file.name,
    mimetype: file.type,
    size: file.size,
    uploadedAt: new Date(),
    base64Data: base64Data,
    publicUrl: base64Data, // Use base64 as public URL for immediate display
    ...additionalData,
  };
};

/**
 * Check if a string is a valid base64 data URL
 * @param str - The string to check
 * @returns boolean - True if it's a valid base64 data URL
 */
export const isBase64DataUrl = (str: string): boolean => {
  return str.startsWith("data:") && str.includes("base64,");
};

/**
 * Extract file extension from base64 data URL
 * @param base64DataUrl - The base64 data URL
 * @returns string - The file extension (e.g., 'jpg', 'png', 'pdf')
 */
export const getFileExtensionFromBase64 = (base64DataUrl: string): string => {
  const match = base64DataUrl.match(/data:([^;]+);base64,/);
  if (match) {
    const mimeType = match[1];
    const extension = mimeType.split("/")[1];
    return extension || "unknown";
  }
  return "unknown";
};

/**
 * Get file size from base64 string (approximate)
 * @param base64String - The base64 string
 * @returns number - Approximate file size in bytes
 */
export const getBase64FileSize = (base64String: string): number => {
  // Remove data URL prefix
  const base64Data = base64String.split(",")[1] || base64String;
  // Calculate size: base64 is 4/3 the size of the original
  return Math.round((base64Data.length * 3) / 4);
};
