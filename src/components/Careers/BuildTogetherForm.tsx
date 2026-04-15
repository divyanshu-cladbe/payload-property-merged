"use client";
import Image from "next/image";
import React, { useState } from "react";

// TypeScript interfaces
interface FormData {
  applicationType: "channel" | "career";
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  department: string;
  role: string;
  cv: File | null;
}

interface ValidationErrors {
  [key: string]: string;
}

interface ValidationRule {
  pattern: RegExp;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface CountryCode {
  code: string;
  country: string;
  name: string;
}

const BuildTogetherFormSection: React.FC = () => {
  // Country codes data
  const countryCodes: CountryCode[] = [
    { code: "+91", country: "IN", name: "India" },
    { code: "+1", country: "US", name: "United States" },
    { code: "+44", country: "GB", name: "United Kingdom" },
    { code: "+86", country: "CN", name: "China" },
    { code: "+81", country: "JP", name: "Japan" },
    { code: "+49", country: "DE", name: "Germany" },
    { code: "+33", country: "FR", name: "France" },
    { code: "+39", country: "IT", name: "Italy" },
    { code: "+34", country: "ES", name: "Spain" },
    { code: "+7", country: "RU", name: "Russia" },
    { code: "+55", country: "BR", name: "Brazil" },
    { code: "+61", country: "AU", name: "Australia" },
    { code: "+82", country: "KR", name: "South Korea" },
    { code: "+65", country: "SG", name: "Singapore" },
    { code: "+971", country: "AE", name: "UAE" },
    { code: "+966", country: "SA", name: "Saudi Arabia" },
    { code: "+60", country: "MY", name: "Malaysia" },
    { code: "+66", country: "TH", name: "Thailand" },
    { code: "+84", country: "VN", name: "Vietnam" },
    { code: "+62", country: "ID", name: "Indonesia" },
  ];

  const [formData, setFormData] = useState<FormData>({
    applicationType: "channel",
    fullName: "",
    email: "",
    countryCode: "+91", 
    phone: "",
    department: "",
    role: "",
    cv: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  // Regex patterns for validation
  const validationRules: ValidationRules = {
    fullName: {
      pattern: /^[a-zA-Z\s\-\.\']{2,50}$/,
      message:
        "Name must be 2-50 characters and contain only letters, spaces, hyphens, dots, and apostrophes",
    },
    email: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address",
    },
    phone: {
      pattern: /^[\d]{6,15}$/,
      message: "Please enter a valid phone number (6-15 digits)",
    },
  };

  // Validate individual field
  const validateField = (name: string, value: string): string => {
    let error = "";

    if (!value.trim()) {
      error = `${
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")
      } is required`;
    } else if (validationRules[name]) {
      const { pattern, message } = validationRules[name];
      if (!pattern.test(value.trim())) {
        error = message;
      }
    }

    return error;
  };

  // Validate file
  const validateFile = (file: File | null): string => {
    let error = "";
    const maxSize = 5 * 1024 * 1024; 
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!file) {
      error = "CV file is required";
    } else if (file.size > maxSize) {
      error = "File size must be less than 5MB";
    } else if (!allowedTypes.includes(file.type)) {
      error = "Only PDF, DOC, and DOCX files are allowed";
    }

    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    
    if (value.trim()) {
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));

    // Clear previous file error
    if (errors.cv) {
      setErrors((prev) => ({
        ...prev,
        cv: "",
      }));
    }

    // Validate file immediately
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          cv: error,
        }));
      }
    }
  };

  const resetForm = (): void => {
    setFormData({
      applicationType: "channel",
      fullName: "",
      email: "",
      countryCode: "+91", 
      phone: "",
      department: "",
      role: "",
      cv: null,
    });
    setErrors({});

    // Reset file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: ValidationErrors = {};

    // Validate text fields
    Object.keys(validationRules).forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof FormData] as string
      );
      if (error) newErrors[field] = error;
    });

    // Validate required select fields
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    // Validate file
    const fileError = validateFile(formData.cv);
    if (fileError) newErrors.cv = fileError;

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        // Here you would typically send the data to your backend
        const submitData = {
          ...formData,
          fullPhoneNumber: `${formData.countryCode}${formData.phone}`, 
        };
        // console.log("Form submitted successfully:", submitData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Show success message
        setShowSuccessMessage(true);

        // Reset form after successful submission
        resetForm();

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } catch (error) {
        console.error("Submission error:", error);
        setErrors({
          submit:
            "There was an error submitting your application. Please try again.",
        });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message Toast */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-medium   ">
                Application Submitted Successfully!
              </p>
              <p className="   text-sm opacity-90">
                We'll get back to you soon.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
              aria-label="Close notification"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-start">
          {/* Left Side - Header and Image */}
          <div className="space-y-8 lg:mt-14">
            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-black    font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl">
                Let's Build something
                <br />
                great <span className="text-[#D93455]">together</span>
              </h2>
              <p
                className="text-[#707070] text-sm sm:text-base md:text-lg xl:text-xl max-w-md mx-auto lg:mx-0"
                style={{ fontFamily: "Helvetica" }}
              >
                Start a conversation that leads to growth and experience a
                partnership where success is simple and guaranteed.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/careers/apply-form-img.png"
                alt="Paper airplanes illustration"
                width={450}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Application Type Radio Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="applicationType"
                      value="channel"
                      checked={formData.applicationType === "channel"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        formData.applicationType === "channel"
                          ? "border-[#BB2828]"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.applicationType === "channel" && (
                        <div className="w-3 h-3 rounded-full bg-[#BB2828]"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[#747474]    font-medium text-xs sm:text-sm xl:text-base">
                    Channel Partner Application
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="applicationType"
                      value="career"
                      checked={formData.applicationType === "career"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        formData.applicationType === "career"
                          ? "border-[#BB2828]"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.applicationType === "career" && (
                        <div className="w-3 h-3 rounded-full bg-[#BB2828]"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[#747474]    font-medium text-xs sm:text-sm xl:text-base">
                    Career Application
                  </span>
                </label>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:border-transparent outline-none transition-all    font-medium text-xs sm:text-sm xl:text-base text-gray-700 placeholder-[#747474] ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#DADADA] focus:ring-[#BB2828]"
                    }`}
                    required
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E - Mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:border-transparent outline-none transition-all    font-medium text-xs sm:text-sm xl:text-base text-gray-700 placeholder-[#747474] ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#DADADA] focus:ring-[#BB2828]"
                    }`}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone with Country Code */}
                <div>
                  <div className="flex">
                    {/* Country Code Selector */}
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className={`px-3 py-3 border border-r-0 rounded-l-lg focus:ring-1 focus:border-transparent outline-none transition-all    font-medium text-xs sm:text-sm xl:text-base text-gray-700 bg-gray-50 min-w-[80px] ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "border-[#DADADA] focus:ring-[#BB2828]"
                      }`}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`flex-1 px-4 py-3 border border-l-0 rounded-r-lg focus:ring-1 focus:border-transparent outline-none transition-all    font-medium text-xs sm:text-sm xl:text-base text-gray-700 placeholder-[#747474] ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "border-[#DADADA] focus:ring-[#BB2828]"
                      }`}
                      required
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                  </div>
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:border-transparent outline-none transition-all    font-medium text-xs sm:text-sm xl:text-base text-gray-700 placeholder-[#747474] ${
                      errors.department
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#DADADA] focus:ring-[#BB2828]"
                    }`}
                    required
                    aria-invalid={!!errors.department}
                    aria-describedby={
                      errors.department ? "department-error" : undefined
                    }
                  >
                    <option value="" disabled>
                      Choose Department
                    </option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                    <option value="operations">Other</option>
                  </select>
                  {errors.department && (
                    <p
                      id="department-error"
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:border-transparent outline-none transition-all    font-medium text-xs sm:text-sm xl:text-base text-gray-700 placeholder-[#747474] ${
                      errors.role
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#DADADA] focus:ring-[#BB2828]"
                    }`}
                    required
                    aria-invalid={!!errors.role}
                    aria-describedby={errors.role ? "role-error" : undefined}
                  >
                    <option value="" disabled>
                      Choose Role
                    </option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                    <option value="manager">Manager</option>
                    <option value="director">Director</option>
                  </select>
                  {errors.role && (
                    <p
                      id="role-error"
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.role}
                    </p>
                  )}
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      aria-describedby={errors.cv ? "cv-error" : "cv-help"}
                    />
                    <div
                      className={`w-full px-4 py-8 border rounded-lg hover:border-[#D93455] transition-colors cursor-pointer bg-white hover:bg-gray-100 ${
                        errors.cv
                          ? "border-red-500 bg-red-50"
                          : "border-[#DADADA]"
                      }`}
                    >
                      <div className="text-center space-y-2">
                        <div
                          className={`mx-auto w-10 h-10 ${
                            errors.cv ? "text-red-400" : "text-gray-400"
                          }`}
                        >
                          <svg
                            fill="none"
                            stroke="#939292"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <div className="text-[#747474]    font-medium text-sm xl:text-base">
                          {formData.cv ? (
                            <div className="space-y-1">
                              <span className="font-medium text-green-600">
                                ✓ {formData.cv.name}
                              </span>
                              <div className="text-xs text-gray-500">
                                {(formData.cv.size / (1024 * 1024)).toFixed(2)}{" "}
                                MB
                              </div>
                            </div>
                          ) : (
                            <span>Upload Your Latest CV</span>
                          )}
                        </div>
                        <div
                          id="cv-help"
                          className="   text-xs text-[#747474]"
                        >
                          Supports PDF, DOC, DOCX (Max 5MB)
                        </div>
                      </div>
                    </div>
                  </label>
                  {errors.cv && (
                    <p
                      id="cv-error"
                      className="mt-1 text-sm text-red-600 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.cv}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-medium py-4 rounded-lg transition-all duration-200 text-xs sm:text-sm xl:text-base flex items-center justify-center ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed text-gray-600"
                      : "bg-gradient-to-l from-[#E91614] to-[#E05D31] hover:bg-[#C02945] text-white hover:shadow-lg transform hover:-translate-y-0.5"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BuildTogetherFormSection;
