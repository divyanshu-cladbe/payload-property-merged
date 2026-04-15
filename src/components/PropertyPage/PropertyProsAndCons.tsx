import React from "react";
import Icons from "./Icons";


export default function PropertyProsAndCons({ city }: { city: string }) {
  const prosData = [
    `One of the biggest project in the heart of ${city}`,
    "Lorem ipsum dolor sit amet, consectetur adipiscing e",
    "Lorem ipsum dolor sit amet, consectetur adipiscing e",
    "Lorem ipsum dolor sit amet, consectetur adipiscing e",
  ];

  const consData = [
    `One of the biggest project in the heart of ${city}`,
    "Lorem ipsum dolor sit amet, consectetur adipiscing e",
    "Lorem ipsum dolor sit amet, consectetur adipiscing e",
    "Lorem ipsum dolor sit amet, consectetur adipiscing e",
  ];


  return (
    <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-t from-[#E7FFEB] to-[#FFFFFF] p-6 rounded-3xl">
          <h4 className="text-[#56B13F] font-bold text-xl mb-4">
            Pros of New {city}
          </h4>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 bg-[#A0D990] text-white flex shrink-0 items-center justify-center rounded-md text-[10px]">
                  +
                </span>
                One of the biggest project in the heart of bareilly
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-t from-[#FFE9E9] to-[#FFFFFF] p-6 rounded-3xl ">
          <h4 className="text-[#C44343] font-bold text-xl mb-4">
            Cons of New {city}
          </h4>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 bg-[#E28888] text-white flex shrink-0 items-center justify-center rounded-md text-[10px]">
                  -
                </span>
                One of the biggest project in the heart of bareilly
              </li>
            ))}
          </ul>
        </div>
      </section>
  );
}
