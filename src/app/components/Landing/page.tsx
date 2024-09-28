


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img src="/images/bhetalogo.png" alt="" className="w-full h-10"/>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="#" className="text-red-500 font-semibold">Check Drug</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Pharmacy Finder</a></li>
          </ul>
        </nav>

      </header>



      <main className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex space-x-6">
          <div className="w-1/2">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <Image src="/images/drug.png"  alt="Drug packaging example" width={400} height={300} className="w-full h-auto" />
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-lg mb-4">
                Please take a <span className="font-bold">clear</span> and well-lit picture of the drug 
                packaging where the <span className="font-bold">batch number</span> is printed.
              </p>

              <p className="text-lg mb-4">
                Make sure the entire batch number is <span className="font-bold">fully visible</span> 
                and in focus, avoiding any glare or obstructions that 
                could obscure the text.
              </p>

            </div>
            
            <div className="flex justify-between">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                Back
              </button>

              <Link href="/components/Camera">
               <button className="px-6 py-2 bg-slate-900 text-white rounded transition-colors"> Take a picture </button>
               </Link>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;