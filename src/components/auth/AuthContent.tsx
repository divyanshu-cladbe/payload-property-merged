import React from "react";
import Image from "next/image";
import PhoneInput from "./PhoneInput";
import OtpVerification from "./OtpVerification";
import { UseOtpAuthReturn } from "@/hooks/useOtpAuth";

interface AuthContentProps extends UseOtpAuthReturn {
  onClose: () => void;
}

const AuthContent: React.FC<AuthContentProps> = ({
  showOtp,
  phoneNumber,
  setPhoneNumber,
  error,
  handleGetOtp,
  otp,
  handleOtpChange,
  handleKeyDown,
  inputRefs,
  handleVerify,
  handleResend,
  isLoading,
  resendTimer,
  onClose,
}) => {
  return (
    <div className="w-full">
      {/* Logo - Only on Desktop */}
      <div className="absolute hidden sm:block">
        <Image
          src="/images/LocationPickerLogo.png"
          alt="Property.new"
          width={120}
          height={96}
          className="object-contain"
          priority
        />
      </div>

      <div className="text-center space-y-4 sm:mt-14 p-6 px-0 pb-0">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold">Welcome to</h1>
          <div className="mx-auto w-32">
            <Image
              src="/images/logo-phone-auth-model.svg"
              alt="Property.new logo"
              width={120}
              height={96}
              className="object-contain"
              priority
            />
            {/* <h2 className="text-4xl font-extrabold text-[#BB2828]">
            Property.New
          </h2> */}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-md mx-auto w-full mt-8">
          {showOtp ? (
            <OtpVerification
              otp={otp}
              onOtpChange={handleOtpChange}
              onKeyDown={handleKeyDown}
              inputRefs={inputRefs}
              onVerify={handleVerify}
              onResend={handleResend}
              isLoading={isLoading}
              resendTimer={resendTimer}
            />
          ) : (
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              onSubmit={handleGetOtp}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Footer Image */}
        <div className="mt-8 hidden sm:flex overflow-hidden" >
          <Image
            src="/images/LoginModal.png"
            alt="Property showcase"
            width={400}
            height={300}
            className="w-full  object-cover"
          />
        </div>
        <div className="mt-8 block sm:hidden overflow-hidden ">
          <Image
            src="/images/home/mobile-login-footer.png"
            alt="Property showcase"
            width={400}
            height={200}
            className="w-full h-auto max-h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthContent;
