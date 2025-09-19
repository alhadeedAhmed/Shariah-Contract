import React from "react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  maxWidth?: string;
  maxHeight?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  className = "max-w-xs max-h-32 object-contain border border-gray-200 rounded",
  maxWidth,
  maxHeight,
}) => {
  // Check if the src is a base64 data URL
  const isBase64 = src.startsWith("data:");

  if (!isBase64) {
    return null; // Don't render if it's not a base64 image
  }

  return (
    <div className="mt-2">
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          maxWidth: maxWidth || "100%",
          maxHeight: maxHeight || "128px",
        }}
        onError={(e) => {
          console.error("Failed to load image:", alt);
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
};

export default ImagePreview;
