import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const PropertyVisitSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" as const}}
            className="space-y-6 lg:space-y-7 text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="   text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold"
            >
              Seeing is <span className="text-[#AA1C1C]">believing</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg xl:text-xl font-bold text-black"
            >
              Schedule Your Visit and Experience Your Dream Property in Person
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#575757]   font-medium text-sm md:text-base xl:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              You've seen the photos, explored the floor plans, and imagined
              your life here. Now, it's time to turn that vision into a reality.
              While our digital tour gives you a glimpse, there's no substitute
              for walking through the spaces, feeling the quality of the
              finishings, and experiencing the natural light for yourself.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-l from-[#E91614] to-[#E05D31] hover:bg-red-700 text-white font-medium text-sm xl:text-base px-8 py-3 rounded-lg transition-colors duration-200 shadow-md"
            >
              Schedule Now
            </motion.button>
          </motion.div>

          {/* Right Content - Image with Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" as const}}
            className="relative"
          >
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative overflow-hidden"
            >
              <Image
                src="/images/why-us/house-lawn.png"
                alt="Beautiful house with green lawn"
                width={500}
                height={400}
                className="rounded-3xl object-cover w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
              />
            </motion.div>

            {/* Visit Scheduled Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                type: "spring" as const,
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="absolute top-12 -left-2 sm:top-20 sm:left-24 lg:-left-16 bg-white rounded-2xl shadow-[0px_0px_10px_5px_#00000026] p-2 sm:p-3 flex items-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[#54CD58] rounded-lg p-1 sm:p-2 flex-shrink-0"
              >
                <CalendarDays color="white" strokeWidth={1.3} size={22} />
              </motion.div>
              <span className="font-bold text-xs sm:text-sm xl:text-base text-gray-900">
                Visit Scheduled!
              </span>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                type: "spring" as const,
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="absolute bottom-12 -right-2 sm:bottom-40 sm:right-24 lg:bottom-32 lg:-right-6 bg-white rounded-2xl shadow-[0px_0px_10px_5px_#00000026] py-2 px-3 sm:py-3 sm:px-5 flex items-center gap-3 max-w-xs"
            >
              <div className="bg-[#8E83F0] rounded-lg p-1 sm:p-2 flex-shrink-0">
                <Image
                  src="/svg/why-us/user-mic-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs sm:text-sm xl:text-base">
                  Experience the Space at
                  <br />
                  your desired time.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyVisitSection;
