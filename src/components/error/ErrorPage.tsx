import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";

interface ErrorPageProps {
  error: string;
  resetError?: () => void;
}

export function ErrorPage({ error, resetError }: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center max-w-md space-y-6 p-8 rounded-xl bg-white shadow-lg border border-gray-100">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">{error}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center pt-2">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="px-6 py-2 border-gray-300 hover:text-white"
            style={{ 
              ['--hover-bg' as string]: PROPERTY_COLORS.primary 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = PROPERTY_COLORS.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
            }}
          >
            Go Home
          </Button>
          {resetError && (
            <Button
              onClick={resetError}
              className="px-6 py-2 text-white"
              style={{ 
                backgroundColor: PROPERTY_COLORS.error,
                ['--hover-bg' as string]: PROPERTY_COLORS.primary 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = PROPERTY_COLORS.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = PROPERTY_COLORS.error;
              }}
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
