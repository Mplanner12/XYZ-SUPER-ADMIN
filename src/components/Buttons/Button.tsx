import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  // variant?: 'primary'
  // size?: 'small' | 'medium' | 'large'
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  // variant = 'primary',
  // size = 'medium',
  disabled = false,
  className,
  icon,
  isLoading
}) => {
  // const baseStyles = 'rounded focus:outline-none focus:ring-2 focus:ring-offset-2'

  // const variantStyles = {
  //   primary: 'bg-tertiaryColor text-white hover:bg-tertiaryColor-700 focus:ring-tertiaryColor-500',
  //   // secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  //   // danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  // }

  // const sizeStyles = {
  //   small: 'px-3 py-1 text-sm',
  //   medium: 'px-4 py-2 text-base',
  //   large: 'px-6 py-3 text-lg'
  // }

  // const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
  //   disabled ? 'opacity-50 cursor-not-allowed' : ''
  // }`

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <div className="spinner-border text-light flex justify-center items-center" role="status">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
        </div>
      ) : (
        <>
          {label} {icon}
        </>
      )}
    </button>
  );
};

export default Button;
