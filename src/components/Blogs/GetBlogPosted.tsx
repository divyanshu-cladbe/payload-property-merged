"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GetBlogPostedSection = () => {
  const topics = [
    "Market trends and investment analysis in new home projects.",
    "Guides on home financing and home loan processes.",
    "In-depth reviews of new residential projects.",
    "Sustainable and smart home technologies in new constructions.",
    "Tips for first-time home-buyers.",
  ];

  // Form state
  const [formData, setFormData] = useState({
    projectName: "",
    developerName: "",
    location: "",
    contactPerson: "",
    emailPhone: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Regex patterns
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]+$/,
    name: /^[a-zA-Z\s\-\.]+$/,
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Project Name validation
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    } else if (formData.projectName.trim().length < 3) {
      newErrors.projectName = "Project name must be at least 3 characters";
    }

    // Developer Name validation
    if (!formData.developerName.trim()) {
      newErrors.developerName = "Developer name is required";
    } else if (!patterns.name.test(formData.developerName)) {
      newErrors.developerName = "Please enter a valid developer name";
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (formData.location.trim().length < 3) {
      newErrors.location = "Location must be at least 3 characters";
    }

    // Contact Person validation
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person and role is required";
    } else if (formData.contactPerson.trim().length < 3) {
      newErrors.contactPerson = "Please enter full name and role";
    }

    // Email & Phone validation
    if (!formData.emailPhone.trim()) {
      newErrors.emailPhone = "Email and phone number is required";
    } else {
      const parts = formData.emailPhone.split(/[,\s]+/);
      const hasEmail = parts.some((part) => patterns.email.test(part));
      const hasPhone = parts.some(
        (part) => patterns.phone.test(part) && part.length >= 10
      );

      if (!hasEmail) {
        newErrors.emailPhone = "Please include a valid email address";
      } else if (!hasPhone) {
        newErrors.emailPhone =
          "Please include a valid phone number (at least 10 digits)";
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send data to your backend
      // console.log("Form submitted:", formData);

      // Show success message
      setIsSubmitted(true);

      // Reset form
      setFormData({
        projectName: "",
        developerName: "",
        location: "",
        contactPerson: "",
        emailPhone: "",
        description: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const topicItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left Side - Topics */}
          <motion.div className="space-y-8" variants={leftColumnVariants}>
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl    font-bold text-black"
              variants={headingVariants}
            >
              Topics we are{" "}
              <span className="text-[#BB2828]">interested in</span>
            </motion.h2>

            <motion.div className="space-y-8" variants={containerVariants}>
              {/* Topic Items */}
              {topics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={topicItemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                  >
                    <svg
                      className="w-6 h-6 text-[#BB2828]"
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
                  </motion.div>
                  <p className="text-sm sm:text-base xl:text-lg text-[#151515]">
                    {topic}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div className="bg-white" variants={rightColumnVariants}>
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl xl:text-4xl    font-bold text-black mb-8"
              variants={headingVariants}
            >
              Get your blog posted
            </motion.h2>

            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <svg
                    className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">
                      Successfully Submitted!
                    </h3>
                    <p className="text-sm text-green-700">
                      Thank you for your submission. We'll review your blog post
                      request and get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
            >
              {/* Project Name */}
              <motion.div variants={formItemVariants}>
                <motion.input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Project Name:"
                  className={`w-full px-6 py-3 border ${errors.projectName ? "border-red-500" : "border-[#DADADA]"
                    } rounded-xl shadow focus:outline-none focus:ring-2 ${errors.projectName
                      ? "focus:ring-red-500"
                      : "focus:ring-red-600"
                    } focus:border-transparent text-[#171717] placeholder-[#171717]`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.projectName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectName}
                  </p>
                )}
              </motion.div>

              {/* Developer Name */}
              <motion.div variants={formItemVariants}>
                <motion.input
                  type="text"
                  name="developerName"
                  value={formData.developerName}
                  onChange={handleChange}
                  placeholder="Developer Name:"
                  className={`w-full px-6 py-3 border ${errors.developerName ? "border-red-500" : "border-[#DADADA]"
                    } rounded-xl shadow focus:outline-none focus:ring-2 ${errors.developerName
                      ? "focus:ring-red-500"
                      : "focus:ring-red-600"
                    } focus:border-transparent   text-[#171717] placeholder-[#171717]`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.developerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.developerName}
                  </p>
                )}
              </motion.div>

              {/* Location */}
              <motion.div variants={formItemVariants}>
                <motion.input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location:"
                  className={`w-full px-6 py-3 border ${errors.location ? "border-red-500" : "border-[#DADADA]"
                    } rounded-xl shadow focus:outline-none focus:ring-2 ${errors.location
                      ? "focus:ring-red-500"
                      : "focus:ring-red-600"
                    } focus:border-transparent   text-[#171717] placeholder-[#171717]`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </motion.div>

              {/* Contact Person & Role */}
              <motion.div variants={formItemVariants}>
                <motion.input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Contact Person & Role:"
                  className={`w-full px-6 py-3 border ${errors.contactPerson ? "border-red-500" : "border-[#DADADA]"
                    } rounded-xl shadow focus:outline-none focus:ring-2 ${errors.contactPerson
                      ? "focus:ring-red-500"
                      : "focus:ring-red-600"
                    } focus:border-transparent   text-[#171717] placeholder-[#171717]`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.contactPerson && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactPerson}
                  </p>
                )}
              </motion.div>

              {/* Email & Phone Number */}
              <motion.div variants={formItemVariants}>
                <motion.input
                  type="text"
                  name="emailPhone"
                  value={formData.emailPhone}
                  onChange={handleChange}
                  placeholder="Email & Phone Number:"
                  className={`w-full px-6 py-3 border ${errors.emailPhone ? "border-red-500" : "border-[#DADADA]"
                    } rounded-xl shadow focus:outline-none focus:ring-2 ${errors.emailPhone
                      ? "focus:ring-red-500"
                      : "focus:ring-red-600"
                    } focus:border-transparent   text-[#171717] placeholder-[#171717]`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.emailPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emailPhone}
                  </p>
                )}
              </motion.div>

              {/* Brief Project Description */}
              <motion.div variants={formItemVariants}>
                <motion.textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief Project Description:"
                  rows={4}
                  className={`w-full px-6 py-3 border ${errors.description ? "border-red-500" : "border-[#DADADA]"
                    } rounded-xl shadow focus:outline-none focus:ring-2 ${errors.description
                      ? "focus:ring-red-500"
                      : "focus:ring-red-600"
                    } focus:border-transparent   text-[#171717] placeholder-[#171717] resize-none`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={formItemVariants}>
                <motion.button
                  type="submit"
                  className="w-full bg-[#BB2828] hover:bg-red-700 text-white font-medium py-4 px-6 rounded-lg shadow transition duration-300 ease-in-out transform hover:scale-[1.02]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Apply
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetBlogPostedSection;
