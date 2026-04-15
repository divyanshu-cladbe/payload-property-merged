import React from "react";
// import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
// import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
// import { useStyles } from "@/hooks/useStyles";
import { ProfileFormData } from "@/hooks/useProfileForm";
import { FormField, FormActions, ProfileImageUpload, FormSelect, FormMultiSelect } from "@/components/Form";
import { AddressAutocompleteField } from "@/components/Form/AddressAutocompleteField";
import { Card } from "@/components/Compound/Card";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoCardProps {
  formData: ProfileFormData;
  isEditing: boolean;
  isSaving?: boolean;
  profileImage?: string | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onImageChange?: (image: string) => void;
}

export const PersonalInfoCard = React.memo<PersonalInfoCardProps>(
  ({
    formData,
    isEditing,
    isSaving = false,
    profileImage,
    onEdit,
    onSave,
    onCancel,
    onInputChange,
    onImageChange,
  }) => {
    const { toast } = useToast();

    const handleAddressSelect = (addressData: { address: string; city: string; state: string }) => {
      // Create synthetic events to update city and state
      if (addressData.city) {
        const cityEvent = {
          target: { name: "city", value: addressData.city },
        } as React.ChangeEvent<HTMLInputElement>;
        onInputChange(cityEvent);
      }
      if (addressData.state) {
        const stateEvent = {
          target: { name: "state", value: addressData.state },
        } as React.ChangeEvent<HTMLInputElement>;
        onInputChange(stateEvent);
      }
    };

    const handleMultiSelectChange = (name: string, value: string[]) => {
      // Create a synthetic event for multi-select changes
      const syntheticEvent = {
        target: { name, value: value },
      } as any;
      onInputChange(syntheticEvent);
    };

    const handleSave = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      onSave();
    };

    return (
      <Card className="mb-6">
        <Card.Header>
          <Card.Title className="md:ml-5">Personal Info</Card.Title>
          <Card.Actions>
            <FormActions
              isEditing={isEditing}
              isSaving={isSaving}
              onEdit={onEdit}
              onSave={handleSave}
              onCancel={onCancel}
            />
          </Card.Actions>
        </Card.Header>

        <Card.Body>
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-6">
            <ProfileImageUpload
              profileImage={profileImage}
              userName={formData.name}
              phoneNumber={formData.phoneNumber}
              onImageChange={onImageChange}
            />

            {/* <UserLevelSection /> */}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              isEditing={isEditing}
              onChange={onInputChange}
              type="text"
            />

            <FormField
              label="Phone No."
              name="phoneNumber"
              value={formData.phoneNumber}
              isEditing={false} // Phone is typically non-editable
              onChange={onInputChange}
              readonly
            />

            <FormField
              label="E-mail"
              name="email"
              value={formData.email}
              isEditing={isEditing}
              onChange={onInputChange}
              type="email"
              error={
                isEditing && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                  ? "Invalid email format"
                  : undefined
              }
            />

            <FormMultiSelect
              label="Interested In"
              name="interestedIn"
              value={formData.interestedIn}
              options={[
                { label: "Residential", value: "Residential" },
                { label: "Commercial", value: "Commercial" },
                { label: "Plots", value: "Plots" },
                { label: "Villa", value: "Villa" },
              ]}
              isEditing={isEditing}
              onChange={handleMultiSelectChange}
            />

            <AddressAutocompleteField
              label="Address"
              name="address"
              value={formData.address}
              isEditing={isEditing}
              onChange={onInputChange}
              onAddressSelect={handleAddressSelect}
              className="md:col-span-2"
              placeholder="Enter your address"
            />

            <FormField
              label="City"
              name="city"
              value={formData.city}
              isEditing={isEditing}
              onChange={onInputChange}
              type="text"
            />

            <FormField
              label="State"
              name="state"
              value={formData.state}
              isEditing={isEditing}
              onChange={onInputChange}
              type="text"
            />


            <FormSelect
              label="Budget Range"
              name="budgetRange"
              value={formData.budgetRange}
              options={[
                { label: "Below 50L", value: "Below 50L" },
                { label: "50L - 1Cr", value: "50L - 1Cr" },
                { label: "1Cr - 2Cr", value: "1Cr - 2Cr" },
                { label: "2Cr - 5Cr", value: "2Cr - 5Cr" },
                { label: "Above 5Cr", value: "Above 5Cr" },
              ]}
              isEditing={isEditing}
              onChange={onInputChange}
            />
          </div>
        </Card.Body>
      </Card>
    );
  }
);

PersonalInfoCard.displayName = "PersonalInfoCard";
