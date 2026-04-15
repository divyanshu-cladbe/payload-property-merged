import React, { RefObject } from "react";

interface OtpInputProps {
  length: number;
  otp: string[];
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRefs: RefObject<HTMLInputElement | null>[];
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  otp,
  onChange,
  onKeyDown,
  inputRefs,
}) => {
  const preventDefault = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "e" ||
      e.key === "E" ||
      e.key === "+" ||
      e.key === "-" ||
      e.key === "."
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-between gap-3">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => onChange(index, e.target.value)}
          onKeyDown={(e) => {
            preventDefault(e);
            onKeyDown(index, e);
          }}
          className="w-12 h-12 text-center text-2xl font-semibold border-b-2 border-gray-300 focus:border-[#BB2828] focus:outline-none"
          autoComplete="off"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
