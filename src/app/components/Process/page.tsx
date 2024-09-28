"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ResultPage = () => {
  const router = useRouter();

  const handleShare = () => {
    console.log("Sharing result...");
  };

  const handleReportPharmacy = () => {
    console.log("Reporting pharmacy...");
  };

  return (
    <div  id='process' className="min-h-screen bg-gray-100 flex flex-col text-2xl">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Image src="/images/bhetalogo.png" alt="Bheta Logo" width={100} height={40} />
          <nav>
            <ul className="flex space-x-6 mb-9">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="#" className="text-red-600 hover:text-red-700 font-medium">Check Drug</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pharmacy Finder</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center">
        <div className=" shadow-md rounded-lg p-16 w-full max-w-2xl mt-16"> 
          <h2 className="text-xl font-semibold mb-4">Drug Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name of the Drug:</span> Cefixime</p>
            <br />
            <p><span className="font-medium">Status:</span> Recalled</p>
            <br />
            <p><span className="font-medium">Batch no:</span> 25592009-0</p>
            <br />
            <p><span className="font-medium">Manufacture Date:</span> 21-05-2024</p>
          </div>
          </div>
          <div className="mt-6 flex gap-60">
            <div>
            <button
              onClick={handleReportPharmacy}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Report Pharmacy
            </button>
            </div>
            <div>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-#0D1730 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Share
            </button>
            </div>
          </div>
       
      </main>
    </div>
  );
};

export default ResultPage;
