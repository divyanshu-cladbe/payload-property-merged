"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LocationPicker from "@/components/Property/LocationPicker/LocationPicker";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/providers/NavigationProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhoneAuthModal from "./auth/PhoneAuthModal";
import { useResponsiveLayout } from "@/utils/layoutConfig";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLocation } from "@/store/slices/locationSlice";

export const Navbar = () => {
  const { isMobile } = useResponsiveLayout();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0); // Track Y scroll for transition
  const pathname = usePathname();
  const { isScrolled: navProviderScrolled } = useNavigation();
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const { currentLocation, selectedCity } = useAppSelector(selectLocation);

  const citySlug = (
    currentLocation?.city ||
    selectedCity ||
    "delhi"
  ).toLowerCase();
  const cityLabel = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

  /**
   * ROUTE LOGIC:
   * Add any path to this array to make the navbar fixed by default.
   */
  const solidBgRoutes = [
    "/properties",
    "/why-us",
    "/contact",
    "/profile",
    "/careers",
    "/loaning",
    "/buyers-guide",
    "/book-visit",
    "/tools",
    "/blogs",
  ];

  // Logic to determine if navbar should be fixed (Full width)
  // 1. Check if current path is in solidBgRoutes
  // 2. OR check if Y scroll has passed 200px
  const isPathInSolidList =
    solidBgRoutes.includes(pathname ?? "") ||
    pathname?.startsWith("/property/") ||
    pathname?.startsWith("/property-media-gallery/") ||
    pathname?.startsWith("/blogs");

  const shouldHaveSolidBg = isPathInSolidList || scrollY >= 200;

  useEffect(() => {
    setMounted(true);

    // Optimized scroll listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const style = document.createElement("style");
      style.id = "sidebar-modal-fix";
      style.textContent = `
        [data-radix-popper-content-wrapper],
        [role="dialog"],
        .modal-overlay {
          z-index: 150 !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.style.overflow = "unset";
      const style = document.getElementById("sidebar-modal-fix");
      if (style) style.remove();
    }
    return () => {
      document.body.style.overflow = "unset";
      const style = document.getElementById("sidebar-modal-fix");
      if (style) style.remove();
    };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { name: `Projects in ${cityLabel}`, href: "/properties" },
    { name: "Smart Tools", href: "/tools" },
    { name: "Contact", href: "/contact" },
    { name: "Why Us", href: "/why-us" },
  ];

  if (!mounted) return null;

  if (isMobile && pathname === "/properties") {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "top-0 fixed left-0 right-0 transition-all duration-700 mx-auto bg-white shadow-[0px_2px_20px_0px_#00000026]",
          shouldHaveSolidBg
            ? "w-full max-w-full rounded-none top-0"
            : "w-[94%] max-w-6xl rounded-full top-5 bg-white/40 xl:bg-white/60 backdrop-blur-[4px] xl:backdrop-blur-[30px]",
          isMenuOpen ? "z-40" : "z-50",
        )}
      >
        {/* Desktop Navigation */}
        <div className="hidden xl:block">
          <div className="container mx-auto px-2 xl:px-8 2xl:px-12">
            <div className="h-16 flex justify-between items-center gap-1">
              {/* Logo - Left Column */}
              <div className="flex justify-center items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/svg/logo.svg"
                    alt="Property.new"
                    width={95}
                    height={35}
                    priority
                    style={{ height: "auto" }}
                  />
                </Link>
              </div>

              {/* Navigation Links - Center Column */}
              <nav className="flex items-center justify-center text-nowrap space-x-5 lg:space-x-6 xl:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-xs lg:text-sm hover:text-red-600 transition-colors font-inter",
                      shouldHaveSolidBg ? "text-[#404040]" : "text-[#2B2B2B]",
                      pathname === item.href && "text-red-600",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Actions - Right Column */}
              <div className="flex items-center justify-center space-x-3 lg:space-x-4 xl:space-x-6">
                <LocationPicker />
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 border border-[#BB2828] hover:text-white font-medium text-xs rounded-full text-black shadow-[inset_0px_0px_10px_#BB282840] px-5 py-4"
                >
                  <PhoneCall className="h-1 w-1" />
                  <span className="max-w-[100px] truncate ">Get assistant</span>
                </Button>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="custom"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8 text-red-700">
                          <AvatarImage
                            src="/default-avatar.png"
                            alt={user?.name}
                          />
                          <AvatarFallback>
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}

                <PhoneAuthModal checkPersistence={true}>
                  {!user && (
                    <Button
                      size="sm"
                      className=" hover:bg-opacity-50 text-white text-xs lg:px-7 rounded-xl "
                    >
                      Login
                    </Button>
                  )}
                </PhoneAuthModal>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn("xl:hidden", isMenuOpen && "hidden")}>
          <div className="px-5">
            <div className="h-14 flex items-center justify-between">
              <div className="flex items-center justify-center space-x-1">
                <button
                  className="me-1"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} color="#BB2828" />
                </button>
                <Link
                  href="/"
                  className="flex justify-center items-center"
                  onClick={closeMenu}
                >
                  <Image
                    src="/svg/logo.svg"
                    alt="Property.new"
                    width={80}
                    height={32}
                    priority
                    style={{ height: "auto" }}
                  />
                </Link>
              </div>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8 text-red-700">
                        <AvatarImage
                          src="/default-avatar.png"
                          alt={user?.name}
                        />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}

              <PhoneAuthModal>
                {!user && (
                  <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 font-medium text-xs rounded-xl">
                    Login
                  </button>
                )}
              </PhoneAuthModal>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[50] xl:hidden"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 z-[100] w-[85%] max-w-[320px] h-full bg-white shadow-2xl xl:hidden overflow-y-auto"
            >
              <div className="flex flex-col min-h-full">
                <div
                  className="flex items-center justify-between px-5 bg-white shadow-sm"
                  style={{
                    height: shouldHaveSolidBg ? "56px" : "72px",
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={closeMenu}
                      aria-label="Close menu"
                      className="p-1"
                    >
                      <X size={24} color="#BB2828" />
                    </button>
                    <Image
                      src="/svg/logo.svg"
                      alt="Property.new"
                      width={80}
                      height={32}
                      priority
                      style={{ height: "auto" }}
                    />
                  </div>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full"
                        >
                          <Avatar className="h-8 w-8 text-red-700">
                            <AvatarImage
                              src="/default-avatar.png"
                              alt={user?.name}
                            />
                            <AvatarFallback>
                              {user?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuItem asChild>
                          <Link href="/profile" onClick={closeMenu}>
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            logout();
                            closeMenu();
                          }}
                        >
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}

                  <PhoneAuthModal>
                    {!user && (
                      <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 font-medium text-xs rounded-xl">
                        Login
                      </button>
                    )}
                  </PhoneAuthModal>
                </div>

                <div className="px-6 pt-8 pb-6 flex gap-3">
                  <LocationPicker />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 border border-[#BB2828] hover:text-white font-medium text-xs rounded-full text-black shadow-[inset_0px_0px_10px_#BB282840] px-5 py-4"
                  >
                    <PhoneCall className="h-1 w-1" />
                    <span className="max-w-[100px] truncate ">
                      Get assistant
                    </span>
                  </Button>
                </div>

                <nav className="flex-1 px-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "block py-4 text-[17px] font-normal transition-colors border-b border-gray-100 last:border-b-0",
                        pathname === item.href
                          ? "text-red-600 font-medium"
                          : "text-[#3D3D3D] hover:text-red-600",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="px-6 py-8 mt-auto">
                  <p className="text-center text-[13px] text-gray-500 font-light">
                    &copy; {new Date().getFullYear()} All Rights Reserved
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
