import React from "react";
import Image from "next/image";

interface Bank {
  id: number;
  name: string;
  logo: string;
}

const banks: Bank[] = [
  {
    id: 1,
    name: "State Bank of India",
    logo: "/svg/loaning/sbi.svg",
  },
  {
    id: 2,
    name: "Punjab National Bank",
    logo: "/svg/loaning/pnb.svg",
  },
  {
    id: 3,
    name: "Bank of Baroda",
    logo: "/svg/loaning/bob.svg",
  },
  {
    id: 4,
    name: "HDFC Bank",
    logo: "/svg/loaning/hdfc.svg",
  },
  {
    id: 5,
    name: "ICICI Bank",
    logo: "/svg/loaning/icici.svg",
  },
  {
    id: 6,
    name: "Axis Bank",
    logo: "/svg/loaning/ab.svg",
  },
  {
    id: 7,
    name: "Kotak Bank",
    logo: "/svg/loaning/kotak.svg",
  },
  {
    id: 8,
    name: "LIC Housing Finance",
    logo: "/svg/loaning/lic.svg",
  },
];

const YourFavBanksSection: React.FC = () => {
  return (
    <section className="w-full px-4 py-12 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="   text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
            Your Fav <span className="text-[#BB2828]">Banks</span>
          </h2>
          <p className="text-[#848484] text-sm xl:text-base font-medium max-w-4xl mx-auto">
            Clarity today means no surprises tomorrow. So you and your family
            invest safely in your future home.
          </p>
        </div>

        {/* Banks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-center items-center">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="flex items-center gap-4 p-5 md:p-6 bg-white border border-[#D0D0D0] rounded-lg shadow hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <Image
                  src={bank.logo}
                  alt={`${bank.name} logo`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <h3 className="text-[#5C5C5C] font-semibold text-sm md:text-base">
                {bank.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YourFavBanksSection;
