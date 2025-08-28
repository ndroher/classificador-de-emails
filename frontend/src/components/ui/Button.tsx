import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  children,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="inline-flex items-center justify-center min-w-[150px] px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? (
        <>
          <span className="material-symbols-outlined animate-spin -ml-1 mr-3">
            data_usage
          </span>
          <span>Analisando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
