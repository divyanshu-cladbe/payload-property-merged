import React from "react";
import { Button } from "../ui/button";

const COUNTRY_CODE = "+91";
const PHONE_LENGTH = 10;

interface PhoneInputProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  setPhoneNumber,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative w-full">
        <label className="text-left text-xs block text-gray-700 mb-2">
          What is your WhatsApp number?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm sm:text-base text-gray-500">
            {COUNTRY_CODE}
          </span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            maxLength={PHONE_LENGTH}
            placeholder="Enter your WhatsApp number"
            className="w-full pl-16 pr-4 py-3 text-xs sm:text-base rounded-full border shadow-[0_3px_10px_rgb(0,0,0,0.2)] outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200"
            disabled={isLoading}
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full text-white py-3 rounded-lg transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || phoneNumber.length !== PHONE_LENGTH}
      >
        {isLoading ? "Sending..." : "Get OTP"}
      </Button>
    </form>
  );
};

export default PhoneInput;
