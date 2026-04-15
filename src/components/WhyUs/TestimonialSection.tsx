import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface Testimonial {
  id: number;
  text: string;
  image: string;
  name?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "There are many different animals in the zoo, but I liked the giraffe the most. He is very kind and sociable. I will come to the giraffe every week.",
    image: "/svg/why-us/user-testimonial.svg",
  },
  {
    id: 2,
    text: "There are many different animals in the zoo, but I liked the giraffe the most. He is very kind and sociable. I will come to the giraffe every week.",
    image: "/svg/why-us/user-testimonial.svg",
  },
  {
    id: 3,
    text: "There are many different animals in the zoo, but I liked the giraffe the most. He is very kind and sociable. I will come to the giraffe every week.",
    image: "/svg/why-us/user-testimonial.svg",
  },
  {
    id: 4,
    text: "There are many different animals in the zoo, but I liked the giraffe the most. He is very kind and sociable. I will come to the giraffe every week.",
    image: "/svg/why-us/user-testimonial.svg",
  },
  {
    id: 5,
    text: "There are many different animals in the zoo, but I liked the giraffe the most. He is very kind and sociable. I will come to the giraffe every week.",
    image: "/svg/why-us/user-testimonial.svg",
  },
];

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!containerRef.current) return;

    const cardWidth = 400 + 24; // card width + gap
    const totalWidth = cardWidth * testimonials.length;

    const animate = async () => {
      if (isPaused) return;

      await controls.start({
        x: -totalWidth,
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    animate();

    return () => {
      controls.stop();
    };
  }, [controls, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (!containerRef.current) return;

    const cardWidth = 400 + 24;
    const totalWidth = cardWidth * testimonials.length;

    controls.start({
      x: -totalWidth,
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            animate={controls}
            className="flex gap-6 px-4"
            style={{ willChange: "transform" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-[350px] md:w-[400px]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Quote Icon */}
                  <motion.svg
                    initial={{ rotate: -10, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="w-9 h-9 text-black/80 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </motion.svg>
                </div>

                {/* Text + Image side by side */}
                <div className="flex items-start gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-black text-sm xl:text-base leading-relaxed flex-1"
                  >
                    {testimonial.text}
                  </motion.p>

                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt="User testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
