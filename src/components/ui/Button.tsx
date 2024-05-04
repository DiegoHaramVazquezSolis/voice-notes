import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean
}

const Button = ({ children, onClick, fullWidth = true }: ButtonProps) => {
  const buttonStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`flex flex-col items-center gap-4 py-2.5 px-6 rounded-md text-slate-950 bg-slate-50 hover:bg-slate-50/80 transition-colors ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {
  Button
};