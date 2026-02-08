import React from "react";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

const CalSans = localFont({
  src: [{ path: "../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
});

type HeadingProps<T extends React.ElementType = "h1"> = {
  className?: string;
  children: React.ReactNode;
  as?: T;
};

export const SubHeading = <T extends React.ElementType = "h1">({
  className,
  children,
  as,
}: HeadingProps<T>) => {
  const Tag = as || "h2";
  
  return (
    <Tag
      className={twMerge(
        CalSans.className,
        "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-white",
        className
      )}
    >
      {children}
    </Tag>
  );
};