import { apiRequest } from "@/api/api";
import { User } from "@/lib/auth";

const COUNTRY_CODE = "+91";

interface ApiResponse {
  status: "success" | "error";
  message: string;
  workflowId?: string;
  data?: {
    user: User;
    token?: string;
  };
}

interface UserProfileResponse {
  data: User;
}

export const authService = {
  async sendOtp(phoneNumber: string): Promise<{ workflowId: string }> {
    try {
      const response = await apiRequest<ApiResponse>("/auth/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `${COUNTRY_CODE}${phoneNumber}`,
        }),
      });

      if (response.status === "success") {
        return { workflowId: response.workflowId! };
        // return true;
      } else {
        throw new Error(response.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  },

  async verifyOtp(
    phoneNumber: string,
    otp: string,
    workflowId: string,
  ): Promise<User> {
    try {
      const response = await apiRequest<ApiResponse>("/auth/verify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: `${COUNTRY_CODE}${phoneNumber}`,
          otp,
          workflowId,
        }),
      });

      const token = response.data?.token;

      // console.log("Verification Response:", response);

      if (response.status === "error") {
        throw new Error(response.message || "OTP verification failed");
      }

      // Fetch user profile after successful verification
      const userData = await apiRequest<UserProfileResponse>("/users/profile", {
        
        credentials: "include",
      });

      // console.log("User Data:", userData);
      return userData.data;
    } catch (error) {
      console.error("Verification Error:", error);
      throw error;
    }
  },
};
