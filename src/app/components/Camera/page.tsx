
"use client"
import React from 'react';
import Link from 'next/link';

const CameraPage = () => {
  return (
    <div id='camera' className="min-h-screen bg-gray-100 flex flex-col">
        

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <p className="text-center text-gray-700 mb-4">
            Bheta wants permission to use your camera
          </p>
          <div className="flex justify-between">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>


            <Link href='/components/Camerapermission'>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-md ">
                  Allow
                  </button>
      </Link>
    

          </div>
        </div>
      </main>

     
    </div>
  );
};

export default CameraPage;