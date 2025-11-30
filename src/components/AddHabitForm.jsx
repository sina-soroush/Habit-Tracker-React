import { useState } from 'react'
import Button from './UI/Button'
import Input from './UI/Input'
import Card from './UI/Card'
import './AddHabitForm.css'

function AddHabitForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6d5dfc',
    goal: 'daily'
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.name.trim()) {
      onAdd(formData)
      setFormData({
        name: '',
        description: '',
        color: '#6d5dfc',
        goal: 'daily'
      })
      handleClose()
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const colorOptions = [
    { name: 'Purple', value: '#6d5dfc' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Red', value: '#ef4444' }
  ]

  if (!isOpen) {
    return (
      <div className="add-habit-trigger">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          + Add New Habit
        </Button>
      </div>
    )
  }

  return (
    <Card className={`add-habit-form ${isClosing ? 'add-habit-form--closing' : ''}`}>
      <h2 className="form-title">Create New Habit</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Habit Name *</label>
          <Input
            id="name"
            name="name"
            placeholder="e.g., Morning Exercise"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            name="description"
            placeholder="e.g., 30 minutes workout"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Choose Color</label>
          <div className="color-picker">
            {colorOptions.map(color => (
              <button
                key={color.value}
                type="button"
                className={`color-option ${formData.color === color.value ? 'color-option--selected' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="form-select"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Create Habit
          </Button>
          <Button type="button" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default AddHabitForm
