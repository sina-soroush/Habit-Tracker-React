import './Button.css'

function Button({ 
  children, 
  variant = 'default', 
  onClick, 
  disabled = false,
  type = 'button',
  className = ''
}) {
  const variantClass = variant === 'primary' ? 'button--primary' : 'button--secondary'
  
  return (
    <button
      type={type}
      className={`button ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
