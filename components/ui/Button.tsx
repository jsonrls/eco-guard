import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";
  
  const variants = {
    primary: "bg-primary hover:bg-[#047857] text-white shadow-lg shadow-primary/20 border border-transparent focus:ring-primary",
    secondary: "bg-secondary hover:bg-black text-white shadow-md border border-transparent focus:ring-secondary",
    outline: "bg-transparent text-primary border-2 border-primary/20 hover:border-primary hover:bg-primary/5 focus:ring-primary",
    white: "bg-white text-slate-900 hover:bg-gray-50 shadow-md border border-transparent focus:ring-white",
    ghost: "bg-transparent text-slate-600 hover:text-primary hover:bg-primary/5 border border-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;