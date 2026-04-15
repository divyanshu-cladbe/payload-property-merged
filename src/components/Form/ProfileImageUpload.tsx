import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";

interface ProfileImageUploadProps {
  profileImage?: string | null;
  userName: string;
  phoneNumber: string;
  onImageChange?: (image: string) => void;
  size?: "sm" | "md" | "lg";
  showEditButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-32 h-32",
  lg: "w-48 h-48",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-4xl",
  lg: "text-6xl",
};

export const ProfileImageUpload = React.memo<ProfileImageUploadProps>(
  ({
    profileImage,
    userName,
    phoneNumber,
    onImageChange,
    size = "md",
    showEditButton = true,
    className = "",
  }) => {
    const handleImageClick = () => {
      if (onImageChange) {
        // TODO: Implement actual image upload logic
        // console.log("Image upload not implemented");
      }
    };

    return (
      <div className={`flex flex-col items-center md:w-1/3 ${className}`}>
        <div className="relative">
          <div
            className={`${sizeClasses[size]} bg-red-100 rounded-full flex items-center justify-center overflow-hidden`}
          >
            {profileImage ? (
              <Avatar className={sizeClasses[size]}>
                <AvatarImage src={profileImage} alt={userName} />
                <AvatarFallback
                  className={`${textSizeClasses[size]} text-white`}
                  style={{ backgroundColor: PROPERTY_COLORS.primary }}
                >
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className={sizeClasses[size]}>
                <AvatarFallback
                  className={textSizeClasses[size]}
                  style={{
                    backgroundColor: PROPERTY_COLORS.backgroundSoft,
                    color: PROPERTY_COLORS.primary,
                  }}
                >
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {showEditButton && onImageChange && (
            <button
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={handleImageClick}
              aria-label="Edit profile image"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>

        <div className="mt-3 text-center md:text-left">
          <div className="text-lg font-medium">{userName}</div>
          <div className="text-gray-500">{phoneNumber}</div>
        </div>
      </div>
    );
  }
);

ProfileImageUpload.displayName = "ProfileImageUpload";
