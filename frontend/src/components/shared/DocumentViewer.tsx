import React from "react";
import { FileData } from "@/utils/fileUtils";

interface DocumentViewerProps {
  documents: FileData[];
  title?: string;
  className?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documents,
  title = "Documents",
  className = "",
}) => {
  if (documents.length === 0) {
    return (
      <div className={`p-4 text-center text-gray-500 ${className}`}>
        <p>No documents available</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="mb-2">
              <h4 className="font-medium text-sm text-gray-800 truncate">
                {doc.originalName}
              </h4>
              <p className="text-xs text-gray-500">
                {doc.mimetype} • {(doc.size / 1024).toFixed(1)} KB
              </p>
              <p className="text-xs text-gray-400">
                {doc.uploadedAt.toLocaleDateString()}
              </p>
            </div>

            {doc.publicUrl && (
              <div className="mt-2">
                <img
                  src={doc.publicUrl}
                  alt={doc.originalName}
                  className="w-full h-32 object-contain border border-gray-100 rounded"
                  onError={(e) => {
                    console.error("Failed to load image:", doc.originalName);
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => {
                  // Open image in new tab
                  window.open(doc.publicUrl, "_blank");
                }}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                View Full Size
              </button>
              <button
                onClick={() => {
                  // Download the file
                  const link = document.createElement("a");
                  link.href = doc.publicUrl;
                  link.download = doc.originalName;
                  link.click();
                }}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentViewer;
