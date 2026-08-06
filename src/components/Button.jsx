const variants = {
    primary: "bg-[#3730A3] text-white hover:bg-indigo-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-[#3730A3] text-[#3730A3] hover:bg-[#3730A3] hover:text-white",
    ghost: "text-[#3730A3] hover:bg-indigo-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
};
const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
};

const Button = ({ children, variant = 'primary', size = 'md', type = 'button', disabled = false, className = '', onClick, rightIcon, leftIcon }) => {

    return (
        <div>
            <button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium ${variants[variant]} ${sizes[size]} ${className}`} >{children}{leftIcon}{rightIcon}</button>
        </div>
    )
}

export default Button;