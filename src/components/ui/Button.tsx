import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean;
  variant?: "primary" | "ghost";
}

const Button = ({ children, onClick, fullWidth = true, variant = "primary" }: ButtonProps) => {
  const buttonStyle = fullWidth ? "w-full" : "";
  const variantStyle = variant === "primary" ? "bg-slate-50 hover:bg-slate-50/80 text-slate-950" : "bg-transparent hover:bg-slate-800/80 border border-slate-800 border-2 text-slate-50";

  return (
    <button
      className={`flex items-center shadow-md hover:shadow-sm active:shadow transition-all ease-in-out duration-500 justify-center gap-2 py-2.5 px-4 rounded-md ${variantStyle} ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {
  Button
};