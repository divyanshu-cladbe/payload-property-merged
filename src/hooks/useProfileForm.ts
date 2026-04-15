import { useState, useCallback } from "react";
import { useAsyncState } from "./useAsyncState";

export interface ProfileFormData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  interestedIn: string[];
  budgetRange: string;
}

export interface UseProfileFormOptions {
  initialData: ProfileFormData;
  onSave?: (data: ProfileFormData) => Promise<void>;
  onCancel?: () => void;
}

export const useProfileForm = ({
  initialData,
  onSave,
  onCancel,
}: UseProfileFormOptions) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [originalData, setOriginalData] =
    useState<ProfileFormData>(initialData);

  const {
    execute: executeSave,
    loading: isSaving,
    error: saveError,
  } = useAsyncState();

  // Handle input changes
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Handle field updates (for controlled components)
  const updateField = useCallback(
    (field: keyof ProfileFormData, value: string | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Start editing
  const handleEdit = useCallback(() => {
    setOriginalData(formData);
    setIsEditing(true);
  }, [formData]);

  // Save changes
  const handleSave = useCallback(async () => {
    if (!onSave) {
      setIsEditing(false);
      return;
    }

    try {
      await executeSave(() => onSave(formData));
      setIsEditing(false);
      setOriginalData(formData);
    } catch (error) {
      // Error handling is managed by useAsyncState
      console.error('Failed to save profile:', error);
    }
  }, [formData, onSave, executeSave]);

  // Cancel editing
  const handleCancel = useCallback(() => {
    setFormData(originalData);
    setIsEditing(false);
    onCancel?.();
  }, [originalData, onCancel]);

  // Reset form to initial data
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setOriginalData(initialData);
    setIsEditing(false);
  }, [initialData]);

  // Check if form has changes
  const hasChanges = useCallback(() => {
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  }, [formData, originalData]);

  // Update initial data (when user data changes externally)
  const updateInitialData = useCallback((newData: ProfileFormData) => {
    setFormData(newData);
    setOriginalData(newData);
  }, []);

  return {
    // State
    formData,
    isEditing,
    isSaving,
    saveError,

    // Actions
    handleInputChange,
    updateField,
    handleEdit,
    handleSave,
    handleCancel,
    resetForm,
    updateInitialData,

    // Utilities
    hasChanges: hasChanges(),
  };
};
