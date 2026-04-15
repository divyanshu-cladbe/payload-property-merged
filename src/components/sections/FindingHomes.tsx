import Image from "next/image";
import { motion } from "framer-motion";

// Animation Constants
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const hoverEffect: any = {
  y: -10,
  scale: 1.01,
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function FindingHomes() {
  return (
    <motion.section 
      className="max-w-[1704px] mx-auto px-6 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* --- Heading --- */}
      <motion.h2 
        variants={cardVariants}
        className="text-4xl md:text-5xl font-bold text-center mb-16"
      >
        <span className="text-[#BB2828]">Finding Homes</span>, in homely manner.
      </motion.h2>

      {/* --- Row 1: 3-Column Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        {/* Card 1: Instant Quote */}
        <motion.div variants={cardVariants} className="flex flex-col items-center w-full">
          <motion.div whileHover={hoverEffect} className="relative w-full h-[480px] bg-[#FFF6F6] rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="absolute top-8 left-8 bg-white py-4 pl-4 pr-36 ml-12 mt-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-start gap-4 z-10">
              <div className="text-[#E81B16] p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3.5 5A2.5 2.5 0 0 1 6 2.5h10A2.5 2.5 0 0 1 18.5 5v5.5a.5.5 0 0 1-1 0V5A1.5 1.5 0 0 0 16 3.5H6A1.5 1.5 0 0 0 4.5 5v14.382a.5.5 0 0 0 .724.447l1-.5a1.5 1.5 0 0 1 1.57.142l.906.679a.5.5 0 0 0 .6 0l.862-.647a1.5 1.5 0 0 1 1.672-.086l.673.404a.5.5 0 1 1-.514.858l-.674-.404a.5.5 0 0 0-.557.028l-.862.647a1.5 1.5 0 0 1-1.8 0l-.906-.68a.5.5 0 0 0-.523-.046l-1 .5A1.5 1.5 0 0 1 3.5 19.382z"></path>
                  <path fill="currentColor" d="M6.5 7a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h3.5a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h3.5a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5m11-1.5a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-4 3a4 4 0 1 1 8 0a4 4 0 0 1-8 0m5.666-1.229a.5.5 0 0 1 0 .708l-2.104 2.103l-1.228-1.228a.5.5 0 0 1 .707-.708l.521.522l1.397-1.397a.5.5 0 0 1 .707 0"></path>
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[22px] font-semibold text-black leading-tight">Quote for</p>
                <p className="font-bold text-[#6C6C6C] text-sm tracking-tight">Rs.10,000</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[65%] px-6">
              <Image src="/images/home/findinghomeimage3.png" alt="Laptop Interface" fill className="object-contain object-bottom" priority />
            </div>
          </motion.div>
          <div className="mt-8 text-center px-4 max-w-[400px]">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Instant Quote Booking</h3>
            <p className="text-[#898989] text-[15px] leading-relaxed tracking-tight">Generate customized payment plans in seconds. Our Smart Quotation engine calculates all taxes and premiums so you can book with 100% financial clarity.</p>
          </div>
        </motion.div>

        {/* Card 2: Immersive Discovery */}
        <motion.div variants={cardVariants} className="flex flex-col items-center w-full">
          <motion.div whileHover={hoverEffect} className="relative w-full h-[480px] bg-[#FFF6F6] rounded-[40px] flex flex-col items-center justify-center overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="absolute top-10 left-2 flex justify-center z-10">
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="text-[#E81B16]">
                  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 16 16">
                    <path fill="currentColor" d="M13.4 3c-1.837 0-3.486-.333-4.974-1.824a.6.6 0 0 0-.848 0C6.086 2.667 4.436 3 2.601 3a.6.6 0 0 0-.6.6v3.602c0 3.862 1.97 6.487 5.81 7.768a.6.6 0 0 0 .38 0c3.841-1.28 5.81-3.906 5.81-7.768V3.6c0-.331-.27-.6-.601-.6M13 7.201c0 3.396-1.636 5.614-5 6.776c-3.364-1.162-5-3.38-5-6.776V3.995c1.579-.039 3.352-.349 5.001-1.843C9.647 3.645 11.421 3.955 13 3.995zM7.499 8.793l2.646-2.646a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708z"></path>
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-[25px] whitespace-nowrap">Trusted by many</span>
              </div>
            </div>
            <div className="relative w-full h-[60%] mt-12 flex items-center -mb-36">
              <Image src="/images/home/findinghomeimage2.png" alt="Immersive Discovery Visual" fill className="object-contain" priority />
            </div>
          </motion.div>
          <div className="mt-8 text-center px-6 max-w-[400px]">
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">Immersive Discovery</h3>
            <p className="text-[#898989] text-[15px] leading-relaxed tracking-tight">Experience your future home before it's built. Take high-definition 360° virtual tours and explore every corner of the project from your device.</p>
          </div>
        </motion.div>

        {/* Card 3: Trust Score */}
        <motion.div variants={cardVariants} className="flex flex-col items-center">
          <motion.div whileHover={hoverEffect} className="relative w-full h-[480px] bg-[#FFF6F6] rounded-[40px] flex items-center justify-center p-12 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="absolute top-10 left-10 bg-white px-6 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
              <div className="text-[#E81B16]">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 16 16">
                  <path fill="currentColor" d="M13.4 3c-1.837 0-3.486-.333-4.974-1.824a.6.6 0 0 0-.848 0C6.086 2.667 4.436 3 2.601 3a.6.6 0 0 0-.6.6v3.602c0 3.862 1.97 6.487 5.81 7.768a.6.6 0 0 0 .38 0c3.841-1.28 5.81-3.906 5.81-7.768V3.6c0-.331-.27-.6-.601-.6M13 7.201c0 3.396-1.636 5.614-5 6.776c-3.364-1.162-5-3.38-5-6.776V3.995c1.579-.039 3.352-.349 5.001-1.843C9.647 3.645 11.421 3.955 13 3.995zM7.499 8.793l2.646-2.646a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708z"></path>
                </svg>
              </div>
              <span className="font-bold text-[24px]">Trusted by many</span>
            </div>
            <div className="absolute bottom-14">
              <Image src="/images/home/findinghomeimage1.png" width={380} height={380} alt="Model" />
            </div>
          </motion.div>
          <div className="mt-8 text-center px-4">
            <h3 className="text-2xl font-bold mb-3">Trust Score</h3>
            <p className="text-[#898989] text-sm leading-relaxed ">We believe your home should be a sanctuary, not a source of restlessness. Our Trust Score Comparison strips away the marketing noise to reveal the actual price.</p>
          </div>
        </motion.div>
      </div>

      {/* --- Row 2: 2-Column Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-36">
        {/* Card 4: Interactive Map */}
        <motion.div variants={cardVariants} className="flex flex-col items-center">
          <motion.div whileHover={hoverEffect} className="relative w-full h-[520px] bg-[#F8F9FA] rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
            <Image src="/images/home/mappic.png" alt="Map" fill className="object-cover" />
          </motion.div>
          <div className="mt-8 text-center px-4 max-w-md">
            <h3 className="text-2xl font-bold mb-3">Interactive Map Feature</h3>
            <p className="text-[#898989] text-sm leading-relaxed ">Scout the neighborhood with ease. View nearby schools, hospitals, and connectivity hubs mapped directly against your preferred unit location.</p>
          </div>
        </motion.div>

        {/* Card 5: Verified & Trusted */}
        <motion.div variants={cardVariants} className="flex flex-col items-center">
          <motion.div whileHover={hoverEffect} className="relative w-full h-[520px] bg-[#FFF6F6] rounded-[40px] flex items-end justify-center overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="absolute top-10 left-10 bg-white px-5 py-2.5 rounded-xl shadow-sm font-bold flex items-center gap-2 z-10">
              <div className="text-[#E81B16]">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 16 16">
                  <path fill="currentColor" d="M13.4 3c-1.837 0-3.486-.333-4.974-1.824a.6.6 0 0 0-.848 0C6.086 2.667 4.436 3 2.601 3a.6.6 0 0 0-.6.6v3.602c0 3.862 1.97 6.487 5.81 7.768a.6.6 0 0 0 .38 0c3.841-1.28 5.81-3.906 5.81-7.768V3.6c0-.331-.27-.6-.601-.6M13 7.201c0 3.396-1.636 5.614-5 6.776c-3.364-1.162-5-3.38-5-6.776V3.995c1.579-.039 3.352-.349 5.001-1.843C9.647 3.645 11.421 3.955 13 3.995zM7.499 8.793l2.646-2.646a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708z"></path>
                </svg>
              </div>
              <div className="text-[22px]">Trusted by many</div>
            </div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute right-6 bottom-40 bg-white px-8 py-4 rounded-2xl shadow-lg z-10"
            >
              <div className="flex text-[26px] gap-1">⭐ ⭐ ⭐ ⭐</div>
            </motion.div>

            <div className="absolute bottom-10 right-10 bg-white pl-3 pr-10 py-1 rounded-2xl shadow-xl flex items-center gap-3 z-10 ">
              <div className=" rounded-full p-1 text-[#E81B16]">
                <svg xmlns="http://www.w3.org/2000/svg" width={48} height={54} viewBox="0 0 1024 1024">
                  <path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"></path>
                </svg>
              </div>
              <span className="font-semibold text-[22px] text-gray-800">Verified listings</span>
            </div>

            <Image src="/images/home/business-woman.png" width={450} height={450} alt="Verified Person" className="z-0" />
          </motion.div>
          <div className="mt-8 text-center px-4 max-w-md">
            <h3 className="text-2xl font-bold mb-3">Verified & Trusted</h3>
            <p className="text-[#898989] text-sm leading-relaxed ">Buy with confidence. Every listing is RERA-compliant and developer-verified, backed by our secured Prism Logic data protection.</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}