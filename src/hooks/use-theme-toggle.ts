"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")
  
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const getThemeValue = <T,>(lightValue: T, darkValue: T): T => {
    if (!mounted) return lightValue
    return isDark ? darkValue : lightValue
  }

  const themeClasses = {
    background: isDark ? "bg-gray-900" : "bg-white",
    text: isDark ? "text-white" : "text-gray-900",
    border: isDark ? "border-gray-800" : "border-gray-200",
    hover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-100",
    muted: isDark ? "text-gray-400" : "text-gray-500",
    accent: isDark ? "bg-gray-800" : "bg-gray-100",
  }

  return {
    theme,
    setTheme,
    isDark,
    mounted,
    toggleTheme,
    getThemeValue,
    themeClasses,
  }
}