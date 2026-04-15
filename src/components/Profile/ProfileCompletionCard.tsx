import React from "react";
import { Button } from "@/components/ui/button";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { useStyles } from "@/hooks/useStyles";

interface ProfilePreferences {
  interestedIn: string[] | string;
  budgetRange: string;
}

interface ProfileCompletionCardProps {
  completionPercentage: number;
  userName: string;
  preferences: ProfilePreferences;
  onAddDetails?: () => void;
}

export const ProfileCompletionCard = React.memo<ProfileCompletionCardProps>(
  ({ completionPercentage, userName, preferences, onAddDetails }) => {
    const styles = useStyles();

    return (
      <div className="bg-white rounded-lg p-6 mb-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border">
        <div className="flex flex-wrap justify-between items-center">
          {/* Completion Percentage */}
          <div className="mb-4 md:ml-9 md:mb-0">
            <div className="text-6xl font-bold" style={styles.primaryText}>
              {completionPercentage}%
            </div>
            <div className="text-sm text-gray-500">
              of your requirement information is complete
            </div>
            {completionPercentage === 100 ? <></> :
              <Button
                variant="destructive"
                className="mt-4 rounded-full"
                style={{
                  backgroundColor: PROPERTY_COLORS.primary,
                  borderColor: PROPERTY_COLORS.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    PROPERTY_COLORS.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = PROPERTY_COLORS.primary;
                }}
                onClick={onAddDetails}
              >
                Add Details
              </Button>
            }
          </div>

          {/* User Info and Progress */}
          <div className="w-full md:w-3/5">
            <div className="mb-4 md:ml-9">
              <h2 className="text-2xl font-medium" style={styles.primaryText}>
                Hi, {userName || "User"}!
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="h-4 rounded-full transition-all duration-300"
                  style={{
                    width: `${completionPercentage}%`,
                    backgroundColor: PROPERTY_COLORS.primary,
                  }}
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-4 md:ml-9">
              <p className="mb-2">
                Please add more information about your preferences
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <PreferenceItem
                  label="Interested in"
                  value={
                    Array.isArray(preferences.interestedIn)
                      ? (preferences.interestedIn.length > 0 ? preferences.interestedIn.join(", ") : "Not specified")
                      : (preferences.interestedIn || "Not specified")
                  }
                />
                <PreferenceItem
                  label="Budget"
                  value={preferences.budgetRange}
                />
                <PreferenceItem
                  label="Budget"
                  value={preferences.budgetRange}
                  className="hidden md:block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Sub-component for preference items
const PreferenceItem = React.memo<{
  label: string;
  value: string;
  className?: string;
}>(({ label, value, className }) => {
  return (
    <div className={className}>
      <div className="font-medium">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
});

ProfileCompletionCard.displayName = "ProfileCompletionCard";
PreferenceItem.displayName = "PreferenceItem";
