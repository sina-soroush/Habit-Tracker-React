import { useState } from 'react'
import Card from './UI/Card'
import Checkbox from './UI/Checkbox'
import { calculateStreak, isCompletedToday } from '../utils/habitHelpers'
import './HabitItem.css'

function HabitItem({ habit, onToggle, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)
  
  const currentStreak = calculateStreak(habit.completions)
  const completedToday = isCompletedToday(habit)

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(habit.id)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 3000)
    }
  }

  return (
    <Card className="habit-item">
      <div className="habit-item__header">
        <div 
          className="habit-item__color" 
          style={{ backgroundColor: habit.color }}
        />
        <div className="habit-item__info">
          <h3 className="habit-item__name">{habit.name}</h3>
          {habit.description && (
            <p className="habit-item__description">{habit.description}</p>
          )}
        </div>
      </div>

      <div className="habit-item__body">
        <div className="habit-item__streak">
          <span className="streak-number">{currentStreak}</span>
          <span className="streak-label">day streak</span>
          <img 
            src={completedToday ? "/icons/streak-Today.png" : "/icons/streak-emoji.png"} 
            alt="Streak" 
            className="streak-emoji" 
            style={{ width: '2.5rem', height: '2.5rem' }} 
          />
        </div>

        <div className="habit-item__actions">
          <Checkbox
            id={`habit-${habit.id}`}
            checked={completedToday}
            onChange={() => onToggle(habit.id)}
            label="Today"
          />
          
          <button 
            className="habit-item__delete"
            onClick={handleDelete}
            title={showConfirm ? 'Click again to confirm' : 'Delete habit'}
          >
            {showConfirm ? (
              <>
                <img src="/icons/delete.png" alt="Delete" style={{ width: '1.6rem', height: '1.6rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Confirm
              </>
            ) : (
              <>
                <img src="/icons/delete.png" alt="Delete" style={{ width: '1.6rem', height: '1.6rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  )
}

export default HabitItem
