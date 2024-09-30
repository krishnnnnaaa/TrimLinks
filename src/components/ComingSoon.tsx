import Image from "next/image";
import React from "react";
import qrCode from '../app/qr_code.png'
const QrCodeComponent = () => {
  return (
    <div className="dark:bg-white bg-[#030315] flex justify-center items-center py-20">
    <div className="flex flex-col md:flex-row w-11/12 items-center justify-around bg-white dark:bg-[#030315] text-white md:p-20 px-10 py-20 rounded-xl md:w-[70%] ">
      {/* QR Code Image */}
      <div className="dark:bg-white bg-[#030315] p-4 rounded-xl">
        <Image
          src={qrCode} // Replace with the actual path
          alt="QR Code"
          className="h-[230px] md:w-[230px] w-full pointer-events-none"
        />
        {/* URL below the QR Code */}
        <div className="flex justify-center mt-2">
          <span className="bg-white text-black px-3 -m-8 py-1 text-xl md:text-sm">
          trimlinks.vercel.app/1fpsBG
          </span>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col md:items-start items-center md:ml-6 text-[#030315] md:mt-o mt-8 ml-0 dark:text-white">
        <h1 className="text-3xl font-bold">Generate Qr Code</h1>
        <p className="text-lg mt-2">Convert your Url into a QR Code</p>
        <button className="dark:text-[#030315] dark:bg-white bg-[#030315] text-white py-2 px-4 rounded-lg font-semibold mt-6 hover:bg-gray-800">
          Coming Soon
        </button>
      </div>
    </div>
    </div>
  );
};

export default QrCodeComponent;
