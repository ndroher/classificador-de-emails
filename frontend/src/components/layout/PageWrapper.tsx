import React from "react";
import { AnimatedBackground } from "./AnimatedBackground";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-12 sm:py-24">{children}</div>
      </div>
    </div>
  );
};
