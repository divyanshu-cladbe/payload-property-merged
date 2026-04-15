import { User } from "./../lib/auth";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { authService } from "@/services/authService";

const OTP_LENGTH = 6;
const PHONE_LENGTH = 10;
const OTP_RESEND_DELAY = 60;

export interface UseOtpAuthReturn {
  // State
  phoneNumber: string;
  showOtp: boolean;
  otp: string[];
  error: string | null;
  isLoading: boolean;
  resendTimer: number;
  inputRefs: React.RefObject<HTMLInputElement | null>[];

  // Actions
  setPhoneNumber: (value: string) => void;
  handleGetOtp: () => Promise<void>;
  handleOtpChange: (index: number, value: string) => void;
  handleKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handleVerify: () => Promise<User | void>;
  handleResend: () => Promise<void>;
  resetAuth: () => void;
}

export interface UseOtpAuthOptions {
  onVerifySuccess?: (user: User) => void;
}

export const useOtpAuth = (options?: UseOtpAuthOptions): UseOtpAuthReturn => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastOtpRequest, setLastOtpRequest] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);
  const [workflowId, setWorkflowId] = useState<string | null>(null);

  const { toast } = useToast();
  const { login } = useAuth();

  // Create refs for OTP inputs
  const inputRefs = Array(OTP_LENGTH)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  // Focus first OTP input when OTP view is shown
  useEffect(() => {
    if (showOtp && inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }
  }, [showOtp]);

  // Handle resend timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lastOtpRequest > 0 && showOtp) {
      const updateTimer = () => {
        const timeElapsed = Math.floor((Date.now() - lastOtpRequest) / 1000);
        const remainingTime = OTP_RESEND_DELAY - timeElapsed;
        if (remainingTime > 0) {
          setResendTimer(remainingTime);
        } else {
          setResendTimer(0);
          clearInterval(interval);
        }
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    }
    return () => clearInterval(interval);
  }, [lastOtpRequest, showOtp]);

  const handleGetOtp = async (): Promise<void> => {
    if (phoneNumber.length !== PHONE_LENGTH) {
      setError(`Please enter a valid ${PHONE_LENGTH}-digit phone number`);
      return;
    }

    setShowOtp(true);
    setOtp(Array(OTP_LENGTH).fill(""));
    setLastOtpRequest(Date.now());
    setIsLoading(true);
    setError(null);

    try {
      const success = await authService.sendOtp(phoneNumber);
      if (success?.workflowId) {
        setWorkflowId(success.workflowId);
        // console.log("WorkflowId stored:", success.workflowId);

        toast({
          title: "OTP sent successfully",
          duration: 3000,
          variant: "success",
        });
      } else {
        setShowOtp(false);
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setShowOtp(false);
      setOtp(Array(OTP_LENGTH).fill(""));
      setLastOtpRequest(0);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to send OTP. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string): void => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(null);

      // Auto-focus next input
      if (
        value !== "" &&
        index < OTP_LENGTH - 1 &&
        inputRefs[index + 1]?.current
      ) {
        inputRefs[index + 1].current?.focus();
      }

      // Auto-verify when complete - only if not already loading
      if (index === OTP_LENGTH - 1 && value !== "" && !isLoading) {
        const completeOtp = [...otp.slice(0, OTP_LENGTH - 1), value];
        if (completeOtp.every((digit) => digit !== "")) {
          handleVerify(completeOtp.join(""));
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0 &&
      inputRefs[index - 1]?.current
    ) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async (
    codeToVerify: string = ""
  ): Promise<User | void> => {
    const otpToVerify = codeToVerify || otp.join("");
    if (otpToVerify.length !== OTP_LENGTH) {
      setError(`Please enter a valid ${OTP_LENGTH}-digit OTP`);
      return;
    }

    setIsLoading(true);
    setError(null);
    if (!workflowId) {
      setError("Missing workflow session. Please request OTP again.");
      return;
    }

    try {
      const user = await authService.verifyOtp(
        phoneNumber,
        otpToVerify,
        workflowId
      );
      login(user);
      toast({
        title: "Logged in successfully",
        duration: 3000,
        variant: "success",
      });
      // Call the callback if provided
      options?.onVerifySuccess?.(user);
      return user;
    } catch (error) {
      handleVerificationError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationError = (error: unknown) => {
    if (error instanceof Error) {
      if (
        error.message.includes("expired") ||
        error.message.includes("session")
      ) {
        setError("Session expired. Please request a new OTP.");
        setShowOtp(false);
        setOtp(Array(OTP_LENGTH).fill(""));
      } else if (error.message.includes("Incorrect OTP")) {
        setError("Incorrect OTP. Please try again.");
        setOtp(Array(OTP_LENGTH).fill(""));
      } else {
        setError(error.message);
      }
    } else {
      setError("Verification failed. Please try again.");
    }
  };

  const handleResend = async (): Promise<void> => {
    const now = Date.now();
    if (now - lastOtpRequest < OTP_RESEND_DELAY * 1000) {
      setError(
        `Please wait at least ${OTP_RESEND_DELAY} seconds before requesting another OTP`
      );
      return;
    }

    setOtp(Array(OTP_LENGTH).fill(""));
    setLastOtpRequest(now);
    setResendTimer(OTP_RESEND_DELAY);
    setIsLoading(true);
    setError(null);

    try {
      const success = await authService.sendOtp(phoneNumber);
      if (success?.workflowId) {
        setWorkflowId(success.workflowId);
        // console.log("New WorkflowId stored on resend:", success.workflowId);
        setOtp(Array(OTP_LENGTH).fill(""));
        setLastOtpRequest(now);
        setResendTimer(OTP_RESEND_DELAY);
        toast({
          title: "New OTP sent successfully",
          duration: 3000,
          variant: "success",
        });
      } else {
        setLastOtpRequest(0);
        setResendTimer(0);
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setLastOtpRequest(0);
      setResendTimer(0);

      const message =
        error instanceof Error ? error.message : "Failed to resend OTP";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAuth = () => {
    setShowOtp(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError(null);
    setPhoneNumber("");
    setIsLoading(false);
    setResendTimer(0);
    setLastOtpRequest(0);
    setWorkflowId(null);
  };

  return {
    phoneNumber,
    showOtp,
    otp,
    error,
    isLoading,
    resendTimer,
    inputRefs,
    setPhoneNumber,
    handleGetOtp,
    handleOtpChange,
    handleKeyDown,
    handleVerify,
    handleResend,
    resetAuth,
  };
};
