import React from "react";

interface LoadingIndicatorProps {
  isCalculatingRoutes: boolean;
  message?: string;
}

export const LoadingIndicator = React.memo<LoadingIndicatorProps>(
  ({ isCalculatingRoutes, message = "Calculating routes..." }) => {
    if (!isCalculatingRoutes) return null;

    return (
      <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-md shadow-md z-10">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
          <span className="text-sm">{message}</span>
        </div>
      </div>
    );
  }
);

LoadingIndicator.displayName = "LoadingIndicator";
