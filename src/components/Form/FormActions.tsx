import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Pencil, SquarePen, X } from "lucide-react";
import { PROPERTY_COLORS } from "@/constants/property-ui-constants";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FormActionsProps {
  isEditing: boolean;
  isSaving?: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editText?: string;
  saveText?: string;
  cancelText?: string;
  savingText?: string;
  showEditIcon?: boolean;
  disabled?: boolean;
}

export const FormActions = React.memo<FormActionsProps>(
  ({
    isEditing,
    isSaving = false,
    onEdit,
    onSave,
    onCancel,
    editText = "Edit",
    saveText = "Save Changes",
    cancelText = "Cancel",
    savingText = "Saving...",
    showEditIcon = true,
    disabled = false,
  }) => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    if (!isEditing) {
      return (
        <>
          {/* edit button */}
          <Button
            variant="outline"
            className="sm:w-36 sm:h-16 rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] border border-zinc-400 overflow-hidden flex items-center justify-center gap-3 text-[#A7A7A7] text-base font-medium leading-none"
            onClick={onEdit}
            disabled={disabled}
          >
            {showEditIcon && <SquarePen className="w-5 h-5 " />}
            {editText && isMobile ? "" : "Edit"}
          </Button>
        </>
      );
    }

    return (
      <div className="flex gap-2">
        {/* cancel button */}
        <Button
          variant="outline"
          className="sm:w-36 sm:h-16 rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] border border-zinc-400 overflow-hidden flex items-center justify-center gap-3 text-gray-600 text-base font-medium leading-none hover:bg-gradient-to-r from-rose-400 to-red-700 transition-colors"
          onClick={onCancel}
          disabled={isSaving || disabled}
        >
          {showEditIcon && isMobile ? <X className="w-5 h-5 " /> : <></>}
          {cancelText && isMobile ? "" : "Cancel"}
        </Button>
        {/* Save button  */}
        <Button
          variant="destructive"
          className="sm:w-44 sm:h-16 rounded-[10px] overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity bg-gradient-to-r from-rose-400 to-red-700 border-transparent"
          onClick={onSave}
          disabled={isSaving || disabled}
        >
          <span className="text-white text-base font-medium font-['Poppins'] leading-none">
            {showEditIcon && isMobile ? <Check className="w-5 h-5 " /> : <></>}
            {isSaving && !isMobile ? savingText : saveText && isMobile ? "" : "Save Changes"}
          </span>
        </Button>
      </div>
    );
  }
);

FormActions.displayName = "FormActions";
