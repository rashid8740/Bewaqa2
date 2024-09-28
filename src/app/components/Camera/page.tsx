// File: src/app/components/Camera/page.tsx

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CameraPage = () => {
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleAllow = async () => {
    if (isRequesting) return; // Prevent multiple requests

    setIsRequesting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      // If permission is granted, navigate to Camerapermission
      router.push("/components/Camerapermission");
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Failed to access camera. Please check your camera permissions.");
      // If there's an error, stay on the current page
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCancel = () => {
    router.push("/"); // Go back to the home page
  };

  return (
    <div id="camera" className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <p className="text-center text-gray-700 mb-4">
            Bheta wants permission to use your camera
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isRequesting}
            >
              Cancel
            </button>
            <button
              onClick={handleAllow}
              className="px-4 py-2 bg-slate-900 text-white rounded-md"
              disabled={isRequesting}
            >
              {isRequesting ? "Requesting..." : "Allow"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CameraPage;
