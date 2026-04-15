import Image from "next/image";

const WriteForUsSection = () => {
  const images = [
    {
      src: "/images/blogs/contributor1.png",
      alt: "Contributor 1",
      position: "top-[10%] left-[5%]",
      rotation: "-rotate-12",
    },
    {
      src: "/images/blogs/contributor2.png",
      alt: "Contributor 2",
      position: "top-[5%] left-[20%]",
      rotation: "rotate-6",
    },
    {
      src: "/images/blogs/contributor3.png",
      alt: "Contributor 3",
      position: "top-[15%] left-[35%]",
      rotation: "-rotate-6",
    },
    {
      src: "/images/blogs/contributor4.png",
      alt: "Contributor 4",
      position: "top-[8%] right-[35%]",
      rotation: "rotate-12",
    },
    {
      src: "/images/blogs/contributor5.png",
      alt: "Contributor 5",
      position: "top-[18%] right-[20%]",
      rotation: "-rotate-6",
    },
    {
      src: "/images/blogs/contributor6.png",
      alt: "Contributor 6",
      position: "top-[5%] right-[5%]",
      rotation: "rotate-6",
    },
    {
      src: "/images/blogs/contributor7.png",
      alt: "Contributor 7",
      position: "bottom-[15%] left-[8%]",
      rotation: "rotate-12",
    },
    {
      src: "/images/blogs/contributor8.png",
      alt: "Contributor 8",
      position: "bottom-[8%] left-[25%]",
      rotation: "-rotate-6",
    },
    {
      src: "/images/blogs/contributor9.png",
      alt: "Contributor 9",
      position: "bottom-[5%] right-[25%]",
      rotation: "rotate-6",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-[#FFE9E9] py-20 px-4 mt-10 overflow-hidden">
      {/* Floating Images */}
      {/* {images.map((image, index) => (
        <div
          key={index}
          className={`absolute ${image.position} ${image.rotation} hidden lg:block transition-transform hover:scale-105 duration-300`}
        >
          <div className="relative w-32 h-32 xl:w-40 xl:h-40 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 128px, 160px"
            />
          </div>
        </div>
      ))} */}

      {/* Central Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-8">
          <div className="bg-[#FFDEDE] backdrop-blur-sm text-[#BB2828] px-5 py-3 rounded-2xl text-sm xl:text-base font-bold">
            Share Your Story, Inspire Others
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl    font-bold text-[#060606] mb-6">
          Write for property.new
        </h2>

        {/* Description */}
        <p className="text-[#919191]   font-medium text-sm xl:text-base leading-relaxed">
          We believe that every home has a story, and every home-buying journey
          is unique. That's why we're opening our platform to passionate voices
          from the real estate community. Whether you're a seasoned blogger with
          a knack for market analysis or a first-time home-buyer with a personal
          story to tell, we want to hear from you.
        </p>
      </div>
    </section>
  );
};

export default WriteForUsSection;
