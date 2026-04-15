import Image from "next/image";
import { Phone, Video } from "lucide-react";
import { motion } from "framer-motion";

export default function CommitmentSection() {
  const teamMembers = [
    "/svg/why-us/member1.svg",
    "/svg/why-us/member2.svg",
    "/svg/why-us/member3.svg",
    "/svg/why-us/member4.svg",
    "/svg/why-us/member5.svg",
  ];

  const benefits = [
    "Secure Better Deals",
    "Expert Financial Navigation",
    "Flawless Paperwork & Coordination",
  ];

  return (
    <section className="bg-gradient-to-b from-white to-[#FFEBEB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-black    text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center mb-6"
        >
          Our <span className="text-[#BB2828]">Commitment</span> Continues.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#919191]   font-medium text-center max-w-xl md:max-w-4xl mx-auto mb-10 text-sm md:text-base xl:text-lg"
        >
          Effortlessly book a site visit to the properties you love, on a day
          and time that works for you. No more endless phone calls or
          back-and-forth emails. We make it easy for you to see your future
          home, on your terms.
        </motion.p>

        {/* Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center items-center gap-10 mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            <Phone
              className="w-14 h-14 sm:w-16 sm:h-16 text-black/10 fill-black/15"
              strokeWidth={1}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            <Video
              className="w-16 h-16 sm:w-20 sm:h-20 text-black/10 fill-black/15"
              strokeWidth={1}
            />
          </motion.div>
        </motion.div>

        {/* Team Members - Overlapping Circles */}
        <div className="flex justify-center mb-14 sm:mb-20">
          <div className="flex items-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-lg"
                style={{ marginLeft: index > 0 ? "-20px" : "0" }}
              >
                <Image
                  src={member}
                  alt={`Team member ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Image
                src="/svg/why-us/gradient-tick.svg"
                alt=""
                width={15}
                height={15}
                className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
              />
              <span className="text-[#595353]   font-medium text-sm md:text-base xl:text-lg">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
