import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode,
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="flex flex-col items-center gap-4 py-2.5  rounded-md text-slate-950 bg-slate-50 hover:bg-slate-50/80 transition-colors w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {
  Button
};