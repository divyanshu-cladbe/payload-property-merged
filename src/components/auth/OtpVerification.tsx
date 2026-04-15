import React, { RefObject } from "react";
import OtpInput from "./OtpInput";
import { User } from "@/lib/auth";
import { Button } from "../ui/button";

const OTP_LENGTH = 6;

interface OtpVerificationProps {
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRefs: RefObject<HTMLInputElement | null>[];
  onVerify: () => Promise<User | void>;
  onResend: () => Promise<void>;
  isLoading: boolean;
  resendTimer: number;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  otp,
  onOtpChange,
  onKeyDown,
  inputRefs,
  onVerify,
  onResend,
  isLoading,
  resendTimer,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Enter OTP</label>
        <OtpInput
          length={OTP_LENGTH}
          otp={otp}
          onChange={onOtpChange}
          onKeyDown={onKeyDown}
          inputRefs={inputRefs}
        />
      </div>

      <Button
        type="submit"
        className="w-full text-white py-3 rounded-lg transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || otp.join("").length !== OTP_LENGTH}
      >
        {isLoading ? (otp.every(digit => digit === "") ? "Sending..." : "Verifying...") : "Verify OTP"}
      </Button>

      <div className="text-center">
        <span className="text-gray-600">Didn't receive the OTP? </span>
        {resendTimer > 0 ? (
          <span className="text-gray-600">Resend in {resendTimer}s</span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-[#BB2828] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Resend"}
          </button>
        )}
      </div>
    </form>
  );
};

export default OtpVerification;
