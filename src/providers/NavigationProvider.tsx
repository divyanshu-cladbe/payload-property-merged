"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  isScrolled: boolean;
  isTransparent: boolean;
}

const NavigationContext = createContext<NavigationContextType>({
  isScrolled: false,
  isTransparent: false,
});

export const useNavigation = () => useContext(NavigationContext);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll listener for all pages
    window.addEventListener("scroll", handleScroll);

    // Reset scroll state when pathname changes
    setIsScrolled(false);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Add pathname as dependency to reset on route change

  return (
    <NavigationContext.Provider
      value={{
        isScrolled,
        isTransparent: !isScrolled, // Now transparent when not scrolled
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
