import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, X, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import * as faceapi from "face-api.js";

interface FaceVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (faceData: FaceVerificationData) => void;
  onError: (error: string) => void;
}

export interface FaceVerificationData {
  faceImage: string;
  confidence: number;
  qualityScore: number;
  verificationLevel: "basic" | "enhanced" | "advanced" | "failed";
  faceBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  verified: boolean;
  verifiedAt: Date;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({
  isOpen,
  onClose,
  onVerify,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceBox, setFaceBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "detecting" | "verifying" | "success" | "failed"
  >("idle");

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load face detection models
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);

        setModelsLoaded(true);
        console.log("Face detection models loaded successfully");
      } catch (err) {
        console.error("Error loading face detection models:", err);
        setError(
          "Failed to load face detection models. Please refresh the page."
        );
        onError("Failed to load face detection models");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadModels();
    }
  }, [isOpen, onError]);

  // Start webcam
  const startWebcam = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError(
        "Unable to access webcam. Please check permissions and try again."
      );
      onError("Webcam access denied");
    }
  }, [onError]);

  // Stop webcam
  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Start webcam when component opens
  useEffect(() => {
    if (isOpen && modelsLoaded) {
      startWebcam();
    }
    return () => {
      stopWebcam();
    };
  }, [isOpen, modelsLoaded, startWebcam, stopWebcam]);

  // Real-time face detection
  useEffect(() => {
    if (!isOpen || !modelsLoaded || !videoRef.current) return;

    const detectFaces = async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) return;

      try {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        if (detections.length === 1) {
          const detection = detections[0];
          const box = detection.detection.box;

          setFaceDetected(true);
          setFaceBox({
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
          });
        } else {
          setFaceDetected(false);
          setFaceBox(null);
        }
      } catch (err) {
        console.error("Face detection error:", err);
      }
    };

    const interval = setInterval(detectFaces, 100); // Check every 100ms
    return () => clearInterval(interval);
  }, [isOpen, modelsLoaded]);

  // Assess face quality
  const assessFaceQuality = (face: any, imageData: string): number => {
    let score = 0;
    let maxScore = 0;

    // Face detection confidence (40% weight)
    const confidenceScore = face.detection?.score || 0;
    score += confidenceScore * 0.4;
    maxScore += 0.4;

    // Face size (20% weight) - ideal size between 100-300px
    const faceSize = face.detection?.box?.width || 0;
    const sizeScore = Math.min(1, Math.max(0, (faceSize - 50) / 250));
    score += sizeScore * 0.2;
    maxScore += 0.2;

    // Face position (20% weight) - check if face is centered
    const faceBox = face.detection?.box;
    const isCentered = faceBox
      ? Math.abs(faceBox.x - (640 - faceBox.width) / 2) < 100
      : false;
    const positionScore = isCentered ? 1 : 0.5;
    score += positionScore * 0.2;
    maxScore += 0.2;

    // Image quality (20% weight) - basic check
    const imageQuality = 0.8; // Assume good quality for now
    score += imageQuality * 0.2;
    maxScore += 0.2;

    return maxScore > 0 ? score / maxScore : 0;
  };

  // Determine verification level
  const determineVerificationLevel = (
    confidence: number,
    qualityScore: number
  ): "basic" | "enhanced" | "advanced" | "failed" => {
    if (confidence > 0.95 && qualityScore > 0.9) return "advanced";
    if (confidence > 0.9 && qualityScore > 0.8) return "enhanced";
    if (confidence > 0.8 && qualityScore > 0.6) return "basic";
    return "failed";
  };

  // Capture and verify face
  const captureAndVerify = async () => {
    if (!videoRef.current || !canvasRef.current || !faceDetected || !faceBox) {
      onError(
        "No face detected. Please ensure your face is visible in the frame."
      );
      return;
    }

    try {
      setIsCapturing(true);
      setVerificationStatus("verifying");

      // Capture image from video
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      canvas.width = 640;
      canvas.height = 480;
      ctx.drawImage(videoRef.current, 0, 0, 640, 480);

      // Convert to base64
      const imageData = canvas.toDataURL("image/jpeg", 0.8);

      // Detect faces in captured image
      const detections = await faceapi
        .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections.length === 0) {
        throw new Error("No face detected in captured image");
      }

      if (detections.length > 1) {
        throw new Error(
          "Multiple faces detected. Please ensure only you are in the frame"
        );
      }

      const face = detections[0];
      const confidence = face.detection?.score || 0;
      const qualityScore = assessFaceQuality(face, imageData);
      const verificationLevel = determineVerificationLevel(
        confidence,
        qualityScore
      );

      if (verificationLevel === "failed") {
        throw new Error(
          "Face verification failed. Please ensure good lighting and position your face properly"
        );
      }

      // Create verification data
      const faceBox = face.detection?.box;
      const faceData: FaceVerificationData = {
        faceImage: imageData,
        confidence,
        qualityScore,
        verificationLevel,
        faceBox: {
          x: faceBox?.x || 0,
          y: faceBox?.y || 0,
          width: faceBox?.width || 0,
          height: faceBox?.height || 0,
        },
        verified: true,
        verifiedAt: new Date(),
      };

      setVerificationStatus("success");

      // Call success callback after a brief delay
      setTimeout(() => {
        onVerify(faceData);
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Face verification error:", err);
      setVerificationStatus("failed");
      onError(err instanceof Error ? err.message : "Face verification failed");
    } finally {
      setIsCapturing(false);
    }
  };

  // Reset verification
  const resetVerification = () => {
    setVerificationStatus("idle");
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Face Verification
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading face detection models...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={resetVerification} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          {/* Webcam Interface */}
          {!isLoading && !error && (
            <div className="space-y-4">
              {/* Instructions */}
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  Position your face in the frame below and click "Capture" when
                  ready
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span
                    className={`flex items-center ${
                      faceDetected ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        faceDetected ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    {faceDetected ? "Face Detected" : "No Face Detected"}
                  </span>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover"
                  autoPlay
                  muted
                  playsInline
                />

                {/* Face Detection Overlay */}
                {faceBox && (
                  <div
                    className="absolute border-2 border-green-500 rounded-lg pointer-events-none"
                    style={{
                      left: faceBox.x,
                      top: faceBox.y,
                      width: faceBox.width,
                      height: faceBox.height,
                    }}
                  />
                )}

                {/* Verification Status Overlay */}
                {verificationStatus === "verifying" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Verifying face...</p>
                    </div>
                  </div>
                )}

                {verificationStatus === "success" && (
                  <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-lg font-semibold">
                        Verification Successful!
                      </p>
                    </div>
                  </div>
                )}

                {verificationStatus === "failed" && (
                  <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-lg font-semibold">
                        Verification Failed
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden Canvas for Image Capture */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={captureAndVerify}
                  disabled={
                    !faceDetected ||
                    isCapturing ||
                    verificationStatus === "verifying"
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {isCapturing ? "Capturing..." : "Capture & Verify"}
                </Button>

                <Button
                  onClick={resetVerification}
                  variant="outline"
                  disabled={isCapturing || verificationStatus === "verifying"}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1 text-sm">
                  Tips for best results:
                </h4>
                <ul className="text-xs text-blue-800 space-y-0.5">
                  <li>• Ensure good lighting on your face</li>
                  <li>• Look directly at the camera</li>
                  <li>• Keep your face centered in the frame</li>
                  <li>• Remove sunglasses or face coverings</li>
                  <li>• Make sure only you are in the frame</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FaceVerification;
