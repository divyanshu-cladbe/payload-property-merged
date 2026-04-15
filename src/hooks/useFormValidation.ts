import { useState, useCallback, useMemo } from "react";

export type ValidationRule<T = any> = {
  validate: (value: T) => boolean;
  message: string;
};

export type FieldValidation<T = any> = {
  rules: ValidationRule<T>[];
  required?: boolean;
  requiredMessage?: string;
};

export type FormValidationConfig<T extends Record<string, any>> = {
  [K in keyof T]?: FieldValidation<T[K]>;
};

export type ValidationErrors<T extends Record<string, any>> = {
  [K in keyof T]?: string[];
};

export type TouchedFields<T extends Record<string, any>> = {
  [K in keyof T]?: boolean;
};

// Common validation rules
export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return value != null && value !== "";
    },
    message,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    validate: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    },
    message,
  }),

  phone: (message = "Please enter a valid phone number"): ValidationRule => ({
    validate: (value: string) => {
      const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
      return !value || phoneRegex.test(value.replace(/\s+/g, ""));
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validate: (value: string) => !value || value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    validate: (value: string) => !value || value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  minValue: (min: number, message?: string): ValidationRule => ({
    validate: (value: number) => !value || value >= min,
    message: message || `Must be at least ${min}`,
  }),

  maxValue: (max: number, message?: string): ValidationRule => ({
    validate: (value: number) => !value || value <= max,
    message: message || `Must be no more than ${max}`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validate: (value: string) => !value || regex.test(value),
    message,
  }),

  custom: <T>(
    validator: (value: T) => boolean,
    message: string
  ): ValidationRule<T> => ({
    validate: validator,
    message,
  }),
};

export const useFormValidation = <T extends Record<string, any>>(
  validationConfig: FormValidationConfig<T>,
  initialValues: Partial<T> = {}
) => {
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<TouchedFields<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (fieldName: keyof T, value: any): string[] => {
      const fieldConfig = validationConfig[fieldName];
      if (!fieldConfig) return [];

      const fieldErrors: string[] = [];

      // Check required validation
      if (fieldConfig.required) {
        const isValueEmpty =
          value == null ||
          value === "" ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0);

        if (isValueEmpty) {
          fieldErrors.push(
            fieldConfig.requiredMessage || "This field is required"
          );
          return fieldErrors; // Return early if required field is empty
        }
      }

      // Run other validation rules
      for (const rule of fieldConfig.rules) {
        if (!rule.validate(value)) {
          fieldErrors.push(rule.message);
        }
      }

      return fieldErrors;
    },
    [validationConfig]
  );

  // Validate all fields
  const validateAllFields = useCallback((): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let hasErrors = false;

    for (const fieldName of Object.keys(validationConfig)) {
      const fieldErrors = validateField(
        fieldName as keyof T,
        values[fieldName as keyof T]
      );
      if (fieldErrors.length > 0) {
        newErrors[fieldName as keyof T] = fieldErrors;
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  }, [validationConfig, values, validateField]);

  // Set field value and validate
  const setFieldValue = useCallback(
    (fieldName: keyof T, value: any) => {
      setValues((prev) => ({ ...prev, [fieldName]: value }));

      // Validate field if it has been touched
      if (touched[fieldName]) {
        const fieldErrors = validateField(fieldName, value);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: fieldErrors.length > 0 ? fieldErrors : undefined,
        }));
      }
    },
    [touched, validateField]
  );

  // Set field as touched and validate
  const setFieldTouched = useCallback(
    (fieldName: keyof T, isTouched = true) => {
      setTouched((prev) => ({ ...prev, [fieldName]: isTouched }));

      if (isTouched) {
        const fieldErrors = validateField(fieldName, values[fieldName]);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: fieldErrors.length > 0 ? fieldErrors : undefined,
        }));
      }
    },
    [values, validateField]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (onSubmit: (values: T) => Promise<void> | void) => {
      setIsSubmitting(true);

      // Mark all fields as touched
      const allTouched: TouchedFields<T> = {};
      for (const fieldName of Object.keys(validationConfig)) {
        allTouched[fieldName as keyof T] = true;
      }
      setTouched(allTouched);

      // Validate all fields
      const isValid = validateAllFields();

      if (isValid) {
        try {
          await onSubmit(values as T);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }

      setIsSubmitting(false);
    },
    [values, validationConfig, validateAllFields]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Computed properties
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const hasErrors = useMemo(() => {
    return Object.values(errors).some(
      (fieldErrors) => fieldErrors && fieldErrors.length > 0
    );
  }, [errors]);

  return {
    // Values and state
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    hasErrors,

    // Field operations
    setFieldValue,
    setFieldTouched,
    validateField,
    validateAllFields,

    // Form operations
    handleSubmit,
    resetForm,

    // Utilities
    getFieldError: (fieldName: keyof T) => errors[fieldName]?.[0],
    getAllFieldErrors: (fieldName: keyof T) => errors[fieldName] || [],
    isFieldTouched: (fieldName: keyof T) => touched[fieldName] || false,
    isFieldValid: (fieldName: keyof T) =>
      !errors[fieldName] || errors[fieldName]!.length === 0,
  };
};
