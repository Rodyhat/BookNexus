const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark",

  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200",

  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white",

  ghost:
    "text-primary hover:bg-primary-light",

  danger:
    "bg-error text-white hover:bg-error-dark",
    
    light: 'bg-white text-primary hover:bg-primary hover:text-white'
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-[10px] text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  onClick,
  rightIcon,
  leftIcon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-ui
        font-medium
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;