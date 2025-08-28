import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const Button = ({
  children,
  isLoading = false,
  loadingText = "Carregando...",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400/50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <>
          <span className="loader mr-3" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
