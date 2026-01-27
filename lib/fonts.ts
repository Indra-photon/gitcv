// lib/fonts.ts (or fonts/index.ts)
import localFont from "next/font/local";

export const CalSans = localFont({
  src: [
    { 
      path: "../fonts/CalSans-SemiBold.woff2",
      weight: "400",
      style: "normal"
    },
    { 
      path: "../fonts/CalSans-SemiBold.woff2",
      weight: "600",
      style: "normal"
    },
    { 
      path: "../fonts/CalSans-SemiBold.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  display: "swap",
  variable: "--font-calsans" // Add CSS variable
});