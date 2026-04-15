import React from "react";
import { FaTools, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="animate-bounce">
          <FaTools className="text-6xl text-[#bb2727] mx-auto" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Contact Page Under Development
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          We're working hard to bring you an amazing contact experience. Please
          check back soon!
        </p>

        <div className="flex items-center justify-center space-x-2 text-[#bb2727]">
          <FaEnvelope className="text-xl" />
          <span className="font-medium">support@property.new</span>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-3 w-3 bg-[#bb2727] rounded-full"></div>
            <div className="h-3 w-3 bg-[#b72828] rounded-full"></div>
            <div className="h-3 w-3 bg-[#ae2626] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
