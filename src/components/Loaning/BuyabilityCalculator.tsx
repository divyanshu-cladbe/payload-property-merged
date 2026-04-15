"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import PhoneAuthModal from "@/components/auth/PhoneAuthModal";
import { useLocationPicker } from "@/hooks/useLocationPicker";
import { LocationPickerModal } from "../Property/LocationPicker";
import {
  calculateBuyerAbility,
  validateInputs,
  type CalculatorInputs,
} from "@/utils/buyerabilitycalculator";
import {
  fetchLoanParametersWithCache,
  type LoanApplicationParams,
} from "@/utils/loanapi";
import { useToast } from "@/hooks/use-toast";

export default function BuyabilityCalculatorSection() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [existingEMI, setExistingEMI] = useState<string>("");
  const [targetRange, setTargetRange] = useState<number | null>(null);
  const [pendingCalculation, setPendingCalculation] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loanParams, setLoanParams] = useState<LoanApplicationParams | null>(
    null
  );
  const [calculationDetails, setCalculationDetails] = useState<string>("");

  const { user, updateProfile } = useAuth();
  const locationPicker = useLocationPicker();
  const { toast } = useToast();

  // Load loan parameters on component mount
  useEffect(() => {
    const loadLoanParams = async () => {
      const params = await fetchLoanParametersWithCache();
      setLoanParams(params);
    };
    loadLoanParams();
  }, []);

  // Close auth modal when user successfully logs in and proceed with location picker
  useEffect(() => {
    if (user && authModalOpen && pendingCalculation) {
      setAuthModalOpen(false);
      // Show location picker after brief delay to allow modal to close
      setTimeout(() => {
        setShowLocationPicker(true);
      }, 100);
    }
  }, [user, authModalOpen, pendingCalculation]);

  const performCalculation = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const applicantAge = parseFloat(age) || 0;
    const down = parseFloat(downPayment) || 0;
    const emi = parseFloat(existingEMI) || 0;

    // Use default parameters if API fetch failed
    const params = loanParams || {
      loanRate: 8, // Default loan rate
      maxAge: 70, // Default max age
      maxTenure: 30, // Default max tenure in years
      customerMarginRate: 0.2, // Default margin rate (20%)
      foir: 70, // Default FOIR
    };

    // Validate inputs with max age
    const validationResult = validateInputs(
      {
        monthlyIncome: income,
        currentAge: applicantAge,
        existingEMI: emi,
        downPayment: down,
      },
      params.maxAge
    );

    if (!validationResult.valid) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: (
          <div className="mt-2 space-y-1">
            {validationResult.errors.map((error, index) => (
              <div key={index}>• {error}</div>
            ))}
          </div>
        ),
      });
      return;
    }

    const inputs: CalculatorInputs = {
      monthlyIncome: income,
      currentAge: applicantAge,
      existingEMI: emi,
      downPayment: down,
    };

    const result = calculateBuyerAbility(inputs, {
      loanRate: params.loanRate,
      maxAge: params.maxAge,
      maxTenure: params.maxTenure,
      customerMarginRate: params.customerMarginRate,
      foir: params.foir,
    });

    // Round to nearest lakh
    const roundedCapacity =
      Math.round(result.estimatedTargetRange / 100000) * 100000;
    setTargetRange(roundedCapacity);
    setCalculationDetails(result.details);
  };

  const calculateBuyability = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const applicantAge = parseFloat(age) || 0;
    const down = parseFloat(downPayment) || 0;

    // Validate all required fields
    if (income === 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter monthly income",
      });
      return;
    }
    if (applicantAge === 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter age",
      });
      return;
    }
    if (down === 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter down payment",
      });
      return;
    }

    // Check if user is logged in
    if (!user) {
      setPendingCalculation(true);
      // Open auth modal with controlled state
      setAuthModalOpen(true);
      return;
    }

    // User is logged in, perform calculation
    performCalculation();
  };

  const handleAuthSuccess = () => {
    // Auth modal will close via the useEffect above
    // Location picker will show via the useEffect above
    // No need to do anything here - let the useEffect handle the flow
  };

  const handleCitySelect = (cityName: string) => {
    // console.log("Selected city:", cityName);
    // Use the location picker's handler
    locationPicker.handleCitySelect(cityName);
    setShowLocationPicker(false);

    // Now perform the calculation after location is selected
    if (pendingCalculation) {
      performCalculation();
      setPendingCalculation(false);
    }
  };

  const handleDetectLocation = () => {
    // Use the location picker's handler
    locationPicker.handleDetectLocation();
    setShowLocationPicker(false);

    // After detection, perform calculation
    if (pendingCalculation) {
      performCalculation();
      setPendingCalculation(false);
    }
  };

  const handleLocationModalClose = () => {
    setShowLocationPicker(false);
    // Reset pending calculation flag - don't perform calculation without location selection
    setPendingCalculation(false);
  };

  const formatCurrency = (value: number): string => {
    if (value >= 10000000) {
      return `Rs. ${(value / 10000000).toFixed(2)} Cr/-`;
    } else if (value >= 100000) {
      return `Rs. ${(value / 100000).toFixed(2)} L/-`;
    } else {
      return `Rs. ${value.toLocaleString("en-IN")}/-`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <style jsx global>{`
        /* Remove number input arrows */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <motion.div
        className="w-full xl:px-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#CACACA] shadow-[0px_0px_20px_2px_#00000026] overflow-hidden">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-0">
            {/* Left Section - Form */}
            <motion.div
              className="p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#C5C5C5]"
              variants={itemVariants}
            >
              <motion.h1
                className="text-black    text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-6 sm:mb-8 md:mb-10"
                variants={itemVariants}
              >
                Buy-ability <span className="text-[#BB2828]">Calculator</span>
              </motion.h1>

              <div className="space-y-5 sm:space-y-6">
                {/* First Row - Monthly Income and Age */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
                  variants={itemVariants}
                >
                  {/* Monthly Income */}
                  <div>
                    <label className="block text-black font-medium text-sm sm:text-base mb-2">
                      Monthly Income{" "}
                      <span className="text-[#ADADAD]">(Combined)</span>
                    </label>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="w-full px-4 py-3 text-sm sm:text-base border-b border-[#BDBDBD] focus:border-[#BB2828] outline-none transition-all duration-300"
                      placeholder="Enter amount"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-black font-medium text-sm sm:text-base mb-2">
                      Age{" "}
                      <span className="text-[#ADADAD]">(Oldest Applicant)</span>
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 text-sm sm:text-base border-b border-[#BDBDBD] focus:border-[#BB2828] outline-none transition-all duration-300"
                      placeholder="Enter age"
                    />
                  </div>
                </motion.div>

                {/* Second Row - Down Payment and Existing EMI */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
                  variants={itemVariants}
                >
                  {/* Down Payment */}
                  <div>
                    <label className="block text-black font-medium text-sm sm:text-base mb-2">
                      Down Payment
                    </label>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className="w-full px-4 py-3 text-sm sm:text-base border-b border-[#BDBDBD] focus:border-[#BB2828] outline-none transition-all duration-300"
                      placeholder="Enter amount"
                    />
                  </div>

                  {/* Existing EMI */}
                  <div>
                    <label className="block text-black font-medium text-sm sm:text-base mb-2">
                      Existing EMI{" "}
                      <span className="text-[#ADADAD]">(if any)</span>
                    </label>
                    <input
                      type="number"
                      value={existingEMI}
                      onChange={(e) => setExistingEMI(e.target.value)}
                      className="w-full px-4 py-3 text-sm sm:text-base border-b border-[#BDBDBD] focus:border-[#BB2828] outline-none transition-all duration-300"
                      placeholder="Enter amount"
                    />
                  </div>
                </motion.div>

                {/* Disclaimer */}
                <motion.div className="pt-4" variants={itemVariants}>
                  <p className="   text-xs sm:text-sm font-medium text-[#CFCBCB] mb-8 leading-relaxed">
                    <span className="font-semibold">Disclaimer</span>
                    <br />
                    This is an estimated value based on industry standard
                    formulas (such as Debt-to-Income Ratio) and does not
                    guarantee loan approval. Factors like your credit score,
                    employment status and current interest rates will also
                    influence your final borrowing power.
                  </p>

                  {/* Calculate Button */}
                  <motion.button
                    onClick={calculateBuyability}
                    className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white font-medium text-sm xl:text-base rounded-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Calculate
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Section - Result */}
            <motion.div
              className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12"
              variants={resultVariants}
            >
              <motion.div
                className="relative w-48 h-48 sm:w-56 sm:h-48 mb-6"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              >
                <Image
                  src="/images/loaning/money-gold-coins.png"
                  alt="Money and savings illustration"
                  width={256}
                  height={256}
                  className="object-contain w-full h-full"
                />
              </motion.div>

              <div className="text-center w-full max-w-md">
                <motion.p
                  className="text-[#898282] font-medium text-sm sm:text-base lg:text-lg mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Estimated Target Range
                </motion.p>
                <motion.p
                  className="text-[#ADADAD] text-xs sm:text-sm font-medium mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  around
                </motion.p>
                <motion.h2
                  className="   font-semibold text-2xl sm:text-3xl lg:text-4xl text-black mb-6 sm:mb-8 md:mb-10"
                  key={targetRange}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" as const }}
                >
                  {targetRange !== null
                    ? formatCurrency(targetRange)
                    : "Rs. 0/-"}
                </motion.h2>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <motion.button
                    onClick={() => {
                      if (calculationDetails) {
                        toast({
                          title: "Calculation Details",
                          description: (
                            <pre className="mt-2 text-xs whitespace-pre-wrap font-mono">
                              {calculationDetails}
                            </pre>
                          ),
                          variant: "default",
                        });
                      }
                    }}
                    disabled={!calculationDetails}
                    className="px-6 sm:px-8 py-3 border border-[#A4A4A4] text-[#BB2828] font-medium text-sm xl:text-base rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Details
                  </motion.button>
                  <motion.button
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#E05D31] to-[#E91614] text-white font-medium text-sm xl:text-base rounded-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Pre Approved Loan
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Phone Auth Modal - Controlled */}
      <PhoneAuthModal
        onSuccess={handleAuthSuccess}
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      >
        <button className="hidden" aria-hidden="true" />
      </PhoneAuthModal>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={showLocationPicker}
        onClose={handleLocationModalClose}
        availableCities={locationPicker.availableCities}
        onCitySelect={handleCitySelect}
        onDetectLocation={handleDetectLocation}
      />
    </div>
  );
}
