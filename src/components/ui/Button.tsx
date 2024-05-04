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
      className={`flex items-center shadow-md hover:shadow-sm active:shadow transition-all ease-in-out duration-500 justify-center gap-2 py-2.5 px-4 rounded-md text-slate-950 bg-slate-50 hover:bg-slate-50/80 ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {
  Button
};