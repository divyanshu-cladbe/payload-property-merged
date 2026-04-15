import Image from "next/image";

export default function RealEstateSection() {
  return (
    <section className="w-full bg-white py-6 pb-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl lg:max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[#2E2A2A]    font-medium text-xs sm:text-sm md:text-base mb-2 sm:mb-3 px-2">
            Be an Early Investor and acquire a high-yield asset with the
            Pre-Launch Power.
          </p>
          <h1 className="   text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black mb-3 sm:mb-4 px-2">
            Your Portfolio's Next Asset Lies in Real Estate
          </h1>
          <p className="text-[#2E2A2A]    font-medium text-xs sm:text-sm md:text-base max-w-3xl mx-auto px-2">
            We've created a curated space for those with a forward-thinking
            vision, offering exclusive access to projects with high-growth
            potential.
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-xl lg:max-w-6xl mx-auto">
          {/* Card 1 - Early Bid Advantage (Pink) */}
          <div className="bg-[#FFE6E6] rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[450px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[650px] overflow-hidden">
            <div>
              <p className="  text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black leading-relaxed max-w-md">
                Gain an exclusive Early Bid Advantage at the initial launch
                phase of projects.
              </p>
            </div>

            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] mt-4">
              {/* Property Image - Bottom Right */}
              <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 -right-6 sm:-right-8 md:-right-10 lg:-right-12 w-[85%] sm:w-[90%] overflow-visible">
                <Image
                  src="/images/buyers-guide/luxury-pool-property.png"
                  alt="Luxury pool property with badge"
                  width={400}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Two Cards */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Card 2 - Flexi Payment (Beige) */}
            <div className="bg-[#FFF6E8] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] md:min-h-[320px] overflow-hidden">
              <p className="  text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
                Get flexi-payment plans for new projects, which greatly eases
                the financial burden during the construction period.
              </p>

              <div className="relative flex justify-center h-[120px] sm:h-[140px] md:h-[160px]">
                <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 w-[90%] sm:w-[100%] md:w-[80%] max-w-[250px] md:max-w-none overflow-visible">
                  <Image
                    src="/images/buyers-guide/flexi-payment.png"
                    alt="Flexi payment plan illustration"
                    width={250}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 3 - Property Appreciation (Green) */}
            <div className="bg-[#E8FFF1] rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] md:min-h-[320px] overflow-hidden">
              <p className="  text-xs sm:text-sm md:text-base lg:text-lg font-medium text-black leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
                The property value will naturally appreciate as the project
                progresses from ground-breaking to completion
              </p>

              <div className="relative flex justify-center h-[140px] sm:h-[160px] md:h-[180px]">
                <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 lg:-bottom-12 w-[95%] sm:w-[90%] md:w-[85%] overflow-visible">
                  <Image
                    src="/images/buyers-guide/luxury-pool-property-appreciation.png"
                    alt="Luxury pool property appreciation"
                    width={450}
                    height={240}
                    className="w-full h-auto object-cover"
                  />

                  <div className="absolute top-0 sm:top-1 md:top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-[40%] md:right-[20%] lg:right-[35%] bg-white shadow-[0px_0px_11.86px_0px_#00000026] rounded-lg sm:rounded-xl md:rounded-2xl px-3 md:px-4 lg:px-5 py-2 md:py-3 flex items-center gap-1 z-10">
                    <span className="text-[#323B49]   font-medium text-[10px] sm:text-xs md:text-sm xl:text-base whitespace-nowrap">
                      up by{" "}
                    </span>
                    <span className="text-[#269438]   font-extrabold text-[10px] sm:text-xs md:text-sm xl:text-base whitespace-nowrap">
                      +20L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
