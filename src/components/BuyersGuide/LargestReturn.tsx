import Image from "next/image";
import SearchForm from "../SearchFilter";

const LargestReturnSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl max-w-7xl mx-auto px-4 my-8">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
        <Image
          src="/images/buyers-guide/luxury-residential-bg.png"
          alt="Luxury residential property"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto mb-8 lg:mb-12">
          {/* Top Text */}
          <p
            className="text-[#C7BDBD] text-sm sm:text-base lg:text-lg font-bold mb-3 md:mb-4"
            style={{ fontFamily: "Helvetica" }}
          >
            Unlock Returns Like Never Before
          </p>

          {/* Main Heading */}
          <h1
            className="text-white text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold mb-4 md:mb-6"
            style={{ fontFamily: "Helvetica" }}
          >
            Your Largest Purchase Should
            <br />
            Deliver Your Largest Returns
          </h1>

          {/* Subtitle */}
          <p className="text-white text-sm md::text-base    font-medium max-w-3xl mx-auto">
            Invest in an asset that pays you while you sleep and builds equity
            with every passing year.
          </p>
        </div>

        {/* Search Form Container */}
        <div className="w-full max-w-6xl px-2">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default LargestReturnSection;
