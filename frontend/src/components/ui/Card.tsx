import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant: "productive" | "unproductive";
}

export const Card = ({ children, variant }: CardProps) => {
  const baseClasses =
    "p-6 border-l-4 rounded-r-lg shadow-md transition-all duration-300";
  const variantClasses = {
    productive: "bg-blue-100 border-blue-500 text-blue-800",
    unproductive: "bg-gray-100 border-gray-400 text-gray-800",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};
