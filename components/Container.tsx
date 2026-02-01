import React from "react";

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <main className={`w-full px-1 relative ${className} max-w-7xl mx-auto border-l border-r border-stone-300`}>
      {children}
    </main>
  );
};
