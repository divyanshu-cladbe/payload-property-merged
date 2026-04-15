import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const ProcessSection = () => {
  // Animation variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: any = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: any = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto   ">
        {/* Top Row - 3 Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 - Realtime Inventory Access */}
          <motion.div
            className="bg-white rounded-3xl border border-[#DCDCDC] p-6 shadow-sm"
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="h-52 mb-4 flex items-center justify-center overflow-hidden rounded-lg"
              variants={imageVariants}
            >
              <Image
                src="/images/book-visit/living-room-interior.png"
                alt="Living room interior with tags"
                width={350}
                height={250}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <h3 className="text-base md:text-lg font-bold mb-2 text-black">
              01 Realtime Inventory Access
            </h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">
              No guesswork, just facts. Our cutting-edge digital platform
              ensures you always view the absolute latest availability, pricing,
              and project details. You'll never fall in love with a home that's
              already sold. Select your perfect unit with guaranteed accuracy.
            </p>
          </motion.div>

          {/* Card 2 - Negotiate & Offer */}
          <motion.div
            className="bg-white rounded-3xl border border-[#DCDCDC] p-6 shadow-sm"
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="bg-gradient-to-b from-[#FFEAEA] to-white rounded-2xl p-6 mb-4 h-52 flex items-center justify-center"
              variants={imageVariants}
            >
              <div className="text-center">
                <div className="  text-sm text-[#323B49] mb-3">
                  EOI for{" "}
                  <span className="text-[#BB2828] font-bold">
                    Havanna Greens
                  </span>{" "}
                  Unit 105
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-[#44DDF7] px-4 py-2 rounded-full shadow-sm">
                  <div className="bg-gradient-to-r from-[#F38080] to-[#BB2828] rounded-full p-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium   text-sm text-[#323B49]">
                    Booked
                  </span>
                </div>
              </div>
            </motion.div>

            <h3 className="text-base md:text-lg font-bold mb-2 text-black">
              02 Negotiate & Offer
            </h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">
              Ready to commit? Submit your Expression of Interest (EOI) or
              formal offer directly through our platform. This initiates the
              commercial conversation. Once terms are agreed upon, you will
              secure the unit with an initial token deposit or Booking Amount.
            </p>
          </motion.div>

          {/* Card 3 - Verification & Acceptance */}
          <motion.div
            className="bg-white rounded-3xl border border-[#DCDCDC] p-6 shadow-sm"
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="flex items-center justify-center h-52 mb-4"
              variants={imageVariants}
            >
              <div className="relative">
                <Image
                  src="/images/book-visit/decorative-dots.png"
                  alt="Check and dots image"
                  height={300}
                  width={300}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <h3 className="text-base md:text-lg font-bold mb-2 text-black">
              03 Verification & Acceptance
            </h3>
            <p className="text-[#7A7A7A] text-sm leading-relaxed">
              This is the handshake phase. We perform necessary checks (KYC) on
              our end, and you finalize your personal legal and financial due
              diligence. Upon mutual satisfaction, your booking is formally
              accepted and confirmed via an official Allotment Letter.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Row - 2 Cards */}
        <div className="flex justify-center">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Card 4 - Documentation & handling */}
            <motion.div
              className="bg-white rounded-3xl border border-[#DCDCDC] p-6 shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="flex items-center justify-center h-48 mb-4 rounded-2xl"
                variants={imageVariants}
              >
                <Image
                  src="/images/book-visit/legal-documents.png"
                  alt="Legal documents"
                  width={300}
                  height={200}
                  className="object-contain"
                />
              </motion.div>

              <h3 className="text-base md:text-lg font-bold mb-2 text-black">
                Documentation & handling
              </h3>
              <p className="text-[#7A7A7A] text-sm leading-relaxed">
                The legal paperwork, simplified. We guide you through the
                preparation and signing of the Agreement for Sale or
                Builder-Buyer Agreement. Our dedicated team provides continuous
                hand-holding to ensure every legal and financial document is
                clearly understood and correctly executed. The unit gets booked
                for 24 hrs.
              </p>
            </motion.div>

            {/* Card 5 - Transaction & Possession */}
            <motion.div
              className="bg-white rounded-3xl border border-[#DCDCDC] p-6 shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="flex items-center justify-center h-48 mb-4 rounded-2xl"
                variants={imageVariants}
              >
                <Image
                  src="/images/book-visit/transaction-possession.png"
                  alt="Transaction & Possession with all tags"
                  width={300}
                  height={200}
                  className="object-contain"
                />
              </motion.div>

              <h3 className="text-base md:text-lg font-bold mb-2 text-black">
                Transaction & Possession
              </h3>
              <p className="text-[#7A7A7A] text-sm leading-relaxed">
                The final legal transfer. This step involves completing all
                payments, including stamp duty and registration fees, and
                officially executing the Sale Deed at the sub-registrar's
                office. This legally registers the property in your name, making
                you the undisputed owner.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
