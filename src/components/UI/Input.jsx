import './Input.css'

function Input({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange,
  name,
  required = false,
  className = ''
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`input ${className}`}
    />
  )
}

export default Input
