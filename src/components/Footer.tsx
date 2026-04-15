// components/ui/footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [openSections, setOpenSections] = useState({
    company: false,
    keyAdvantages: false,
    discover: false,
  });

  if (pathname === "/properties") {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Email submitted:", email);
    setEmail("");
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkHoverVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const collapseVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  const MobileCollapsibleSection = ({
    title,
    isOpen,
    onToggle,
    children,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-[#D5D5D5] last:border-b">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <h3 className="text-[#5C5C5C] font-semibold text-sm">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#5C5C5C] text-lg font-medium"
        >
          +
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={collapseVariants}
            className="pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const companyLinks = [
    { href: "/why-us", text: "Why us" },
    { href: "/faqs", text: "FAQs" },
    { href: "/careers", text: "Careers" },
    { href: "/privacy", text: "Privacy Policy" },
    { href: "/terms", text: "Terms & Conditions" },
    { href: "/press", text: "Press & Media" },
  ];

  const keyAdvantagesLinks = [
    { href: "/book-visit", text: "Book a Site-Visit" },
    { href: "/sales-enquiry", text: "Free Sales Enquiry" },
    { href: "/buyers-guide", text: "The Buyer's Guide" },
    { href: "/blogs", text: "Blogs & Articles" },
    { href: "/sitemap", text: "Site Map" },
    { href: "/help", text: "Help Centre" },
  ];

  const discoverLinks = [
    { href: "/ready-to-move", text: "Ready to Move Homes" },
    { href: "/pre-launch", text: "Pre-Launch Properties" },
    { href: "/value-homes", text: "Value For Money Homes" },
    { href: "/offers", text: "Booking discount Offers" },
    { href: "/highlighted", text: "Highlighted Projects" },
    { href: "/estate-iq", text: "Estate IQ" },
  ];

  const tagLinks = [
    { href: "/projects/delhi-ncr", text: "Projects in Delhi-NCR" },
    { href: "/projects/mmr", text: "Projects in MMR" },
    { href: "/projects/bangalore", text: "Projects in Bangalore" },
    { href: "/projects/hyderabad", text: "Projects in Hyderabad" },
    { href: "/projects/pune", text: "Projects in Pune" },
    { href: "/projects/chennai", text: "Projects in Chennai" },
    { href: "/projects/lucknow", text: "Projects in Lucknow" },
  ];

  return (
    <motion.footer
      className="bg-white border-t border-[#D5D5D5]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-8">
          {/* Desktop Layout */}
          <motion.div
            className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center items-start"
            variants={containerVariants}
          >
            {/* Logo Column */}
            <motion.div
              className="flex flex-col justify-between items-start gap-16 lg:gap-24 xl:gap-32"
              variants={itemVariants}
            >
              <motion.div
                className="self-start"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/svg/logo.svg"
                  alt="Property.new Logo"
                  width={150}
                  height={40}
                  className="h-10 md:h-14 lg:h-16 w-auto"
                />
              </motion.div>

              <motion.div
                className="flex flex-col justify-center items-center gap-1"
                variants={itemVariants}
              >
                <span className="text-[#919191] text-xs">Powered by</span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/icons/cladbe-logo.svg"
                    alt="Cladbe"
                    width={60}
                    height={20}
                    className="h-auto w-16 lg:w-20"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Company Column */}
            <motion.div variants={itemVariants}>
              <h3 className="text-[#5C5C5C] font-semibold text-sm xl:text-base mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={link.href}
                      className="text-[#5C5C5C] hover:text-gray-900 text-sm"
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Key Advantages Column */}
            <motion.div variants={itemVariants}>
              <h3 className="text-[#5C5C5C] font-semibold text-sm xl:text-base mb-4">
                Key Advantages
              </h3>
              <ul className="space-y-3">
                {keyAdvantagesLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={link.href}
                      className="text-[#5C5C5C] hover:text-gray-900 text-sm"
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Discover Column */}
            <motion.div variants={itemVariants}>
              <h3 className="text-[#5C5C5C] font-semibold text-sm xl:text-base mb-4">
                Discover
              </h3>
              <ul className="space-y-3">
                {discoverLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={link.href}
                      className="text-[#5C5C5C] hover:text-gray-900 text-sm"
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Feedback Form Column */}
            <motion.div variants={itemVariants}>
              <h3 className="text-black font-semibold text-sm xl:text-base mb-4">
                Submit a Feedback about any Project
              </h3>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.input
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-[#B6B6B6] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#BE5E5E] placeholder:text-[#ADADAD]"
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#BE5E5E" }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  type="submit"
                  className="w-full bg-black text-[#C4C4C4] py-2 px-4 rounded-md text-xs font-semibold hover:bg-gray-800 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Submit
                </motion.button>
              </motion.form>

              {/* Social Media Icons */}
              <motion.div
                className="mt-4 flex justify-start items-center space-x-6 lg:space-x-8"
                variants={itemVariants}
              >
                {[
                  {
                    href: "#",
                    src: "/icons/twitter.svg",
                    alt: "Twitter",
                    label: "Follow us on Twitter",
                  },
                  {
                    href: "#",
                    src: "/icons/instagram.svg",
                    alt: "Instagram",
                    label: "Follow us on Instagram",
                  },
                  {
                    href: "#",
                    src: "/icons/facebook.svg",
                    alt: "Facebook",
                    label: "Follow us on Facebook",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    variants={socialIconVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={social.href}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={social.label}
                    >
                      <Image
                        src={social.src}
                        alt={social.alt}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/svg/logo.svg"
                  alt="Property.new Logo"
                  width={150}
                  height={40}
                  className="h-12 w-auto"
                />
              </motion.div>
            </motion.div>

            {/* Collapsible Sections */}
            <motion.div variants={itemVariants}>
              <MobileCollapsibleSection
                title="Company"
                isOpen={openSections.company}
                onToggle={() => toggleSection("company")}
              >
                <ul className="space-y-3">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-[#5C5C5C] hover:text-gray-900 text-sm block"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MobileCollapsibleSection>

              <MobileCollapsibleSection
                title="Key Advantages"
                isOpen={openSections.keyAdvantages}
                onToggle={() => toggleSection("keyAdvantages")}
              >
                <ul className="space-y-3">
                  {keyAdvantagesLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-[#5C5C5C] hover:text-gray-900 text-sm block"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MobileCollapsibleSection>

              <MobileCollapsibleSection
                title="Discover"
                isOpen={openSections.discover}
                onToggle={() => toggleSection("discover")}
              >
                <ul className="space-y-3">
                  {discoverLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-[#5C5C5C] hover:text-gray-900 text-sm block"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MobileCollapsibleSection>
            </motion.div>

            {/* Feedback Form - Always Visible on Mobile */}
            <motion.div className="mt-2 pt-6 px-1" variants={itemVariants}>
              <h3 className="text-black font-semibold text-sm mb-4">
                Submit a Feedback about any Project
              </h3>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.input
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-[#B6B6B6] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#BE5E5E] focus:border-transparent placeholder:text-[#ADADAD]"
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#BE5E5E" }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  type="submit"
                  className="w-full bg-black text-[#C4C4C4] py-2 px-4 rounded-md text-xs font-semibold hover:bg-gray-800 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Submit
                </motion.button>
              </motion.form>

              {/* Social Media Icons */}
              <motion.div
                className="mt-8 mb-2 flex justify-center items-center space-x-7"
                variants={itemVariants}
              >
                {[
                  {
                    href: "#",
                    src: "/icons/twitter.svg",
                    alt: "Twitter",
                    label: "Follow us on Twitter",
                  },
                  {
                    href: "#",
                    src: "/icons/instagram.svg",
                    alt: "Instagram",
                    label: "Follow us on Instagram",
                  },
                  {
                    href: "#",
                    src: "/icons/facebook.svg",
                    alt: "Facebook",
                    label: "Follow us on Facebook",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    variants={socialIconVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={social.href}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={social.label}
                    >
                      <Image
                        src={social.src}
                        alt={social.alt}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tags Section */}
        <motion.div
          className="py-5 border-t border-[#D5D5D5] flex flex-col lg:flex-row justify-center items-center lg:items-start"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-4">
            <span className="text-[#5C5C5C] font-bold text-sm text-center">
              Tags:
            </span>
          </div>
          <motion.div
            className="flex justify-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/delhi-ncr"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Delhi-NCR
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/mmr"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in MMR
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/bangalore"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Bangalore
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/hyderabad"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Hyderabad
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/pune"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Pune
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/chennai"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Chennai
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/lucknow"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Lucknow
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex justify-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm mt-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/delhi-ncr"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Delhi-NCR
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/mmr"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in MMR
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/bangalore"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Bangalore
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/hyderabad"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Hyderabad
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/pune"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Pune
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/chennai"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Chennai
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/lucknow"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Lucknow
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex justify-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm mt-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/delhi-ncr"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Delhi-NCR
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/mmr"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in MMR
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/bangalore"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Bangalore
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/hyderabad"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Hyderabad
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/pune"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Pune
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/chennai"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Chennai
              </Link>
            </motion.div>
            <span className="text-gray-400">|</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/projects/lucknow"
                className="text-gray-600 hover:text-gray-900"
              >
                Projects in Lucknow
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Disclaimer Section */}
        <motion.div
          className="py-4 sm:py-5 border-t border-[#D5D5D5] text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <p className="text-[#5C5C5C] text-xs leading-relaxed">
              <strong className="font-bold">Disclaimer :</strong> Our platform
              serves as a dedicated marketplace where Builder(s)/Developer(s)
              list their new residential projects, and
              Customer(s)/Buyer(s)/User(s) can directly discover and book.
              Property.new is an enabling platform and is not involved in, nor
              controls, the direct transaction between the
              Builder(s)/Developer(s) and the Customer(s)/Buyer(s)/User(s). All
              project information, pricing, offers, and services are provided
              and managed exclusively by the advertising
              Builder(s)/Developer(s). We facilitate communication, but
              Property.new holds no responsibility for the fulfillment of offers
              or resolution of any disputes arising between the parties.
            </p>
          </div>

          {/* Powered by Cladbe - Mobile */}
          <motion.div
            className="md:hidden flex flex-col justify-center items-center gap-1"
            variants={itemVariants}
          >
            <span className="text-[#919191] text-xs">Powered by</span>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/icons/cladbe-logo.svg"
                alt="Cladbe"
                width={60}
                height={20}
                className="h-auto w-16"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
