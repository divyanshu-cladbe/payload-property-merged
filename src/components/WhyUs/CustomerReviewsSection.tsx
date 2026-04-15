import Image from "next/image";

export default function CustomerReviewsSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#FFE9E9] py-20 px-4 overflow-hidden my-2">
      {/* Decorative customer images */}
      <div className=""></div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-10">
          <span className="bg-[#FFDEDE] text-[#BB2828] px-4 py-2 rounded-2xl text-sm font-medium">
            Customer Reviews
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-black    text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-6">
          Book, dont <span className="text-[#BB2828]">Bookmark</span>
        </h2>

        {/* Description */}
        <p className="text-[#919191]   text-sm md:text-base xl:text-lg max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
          True satisfaction comes from understanding and exceeding the diverse
          expectations of every individual- at Property.new, we do exactly that.
        </p>
      </div>
    </section>
  );
}
