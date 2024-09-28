// File: src/app/components/Camerapermission/page.tsx

"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Camerapermission: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Failed to access camera. Please check your camera permissions.");
      router.push("/"); // Adjust this to your home route
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const extractBatchNumber = (text: string): string | null => {
    const batchNumberRegex = /Batch\s*(?:No|Number)?[:.]?\s*(\w+)/i;
    const match = text.match(batchNumberRegex);
    return match ? match[1] : null;
  };

  const handleUpload = async () => {
    setIsProcessing(true);
    try {
      if (!capturedImage) throw new Error("No image captured");

      // Send image to Google Vision API
      const visionResponse = await fetch("/api/google-vision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: capturedImage }),
      });

      if (!visionResponse.ok) {
        throw new Error("Failed to process image");
      }

      const visionData = await visionResponse.json();

      // Extract batch number from OCR result
      const batchNumber = extractBatchNumber(visionData.text);

      if (!batchNumber) {
        throw new Error("Batch number not found in the image");
      }

      // Query your database API with the batch number
      const dbResponse = await fetch("/api/check-drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchNumber }),
      });

      if (!dbResponse.ok) {
        if (dbResponse.status === 404) {
          // Drug not found in database, consider it as not recalled
          const drugStatus = {
            name: "Unknown",
            status: "Good - Not Recalled",
            batchNo: batchNumber,
            manufactureDate: "N/A",
          };
          navigateToProcessPage(drugStatus);
          return;
        }
        throw new Error("Failed to fetch drug information");
      }

      const drugData = await dbResponse.json();

      // Prepare the drug status based on the database response
      const drugStatus = {
        name: drugData.name,
        status: drugData.recalled ? "Recalled" : "Good - Not Recalled",
        batchNo: drugData.batchNumber,
        manufactureDate: drugData.manufactureDate,
      };

      navigateToProcessPage(drugStatus);
    } catch (error) {
      console.error("Error processing image:", error);
      alert(
        "An error occurred while processing the image: " +
          (error as Error).message
      );
      setIsProcessing(false);
    }
  };

  const navigateToProcessPage = (drugStatus: {
    name: string;
    status: string;
    batchNo: string;
    manufactureDate: string;
  }) => {
    const queryParams = new URLSearchParams({
      name: drugStatus.name,
      status: drugStatus.status,
      batchNo: drugStatus.batchNo,
      manufactureDate: drugStatus.manufactureDate,
    }).toString();

    router.push(`/Process?${queryParams}`);
  };

  const handleBack = () => {
    setCapturedImage(null);
  };

  return (
    <div
      id="permission"
      className="min-h-screen bg-gray-100 flex flex-col text-black"
    >
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Image
            src="/images/bhetalogo.png"
            alt="Bheta Logo"
            width={100}
            height={40}
          />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/check-drug"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Check Drug
                </Link>
              </li>
              <li>
                <Link
                  href="/pharmacy-finder"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pharmacy Finder
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl relative">
          {isProcessing ? (
            <div className="text-center">
              <p className="mb-4">Processing......</p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="w-1/2 h-full bg-blue-600 rounded animate-pulse"></div>
              </div>
            </div>
          ) : capturedImage ? (
            <>
              <Image
                src={capturedImage}
                alt="Captured image"
                width={640}
                height={480}
                className="w-full h-64 object-cover mb-4"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-slate-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Upload
                </button>
              </div>
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={captureImage}
                  className="w-16 h-16 bg-white border-4 border-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="w-12 h-12 bg-black rounded-full"></div>
                </button>
              </div>
            </>
          )}
          <canvas
            ref={canvasRef}
            style={{ display: "none" }}
            width="640"
            height="480"
          />
        </div>
      </main>
    </div>
  );
};

export default Camerapermission;
