import './Checkbox.css'

function Checkbox({ 
  checked, 
  onChange, 
  label,
  id
}) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <label htmlFor={id} className={`checkbox-label ${checked ? 'checkbox-label--checked' : ''}`}>
        {checked && <span className="checkbox-icon">✓</span>}
      </label>
      {label && <span className="checkbox-text">{label}</span>}
    </div>
  )
}

export default Checkbox
