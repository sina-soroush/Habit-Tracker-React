import Card from './UI/Card'
import { calculateStreak, calculateBestStreak } from '../utils/habitHelpers'
import './StreakCounter.css'

function StreakCounter({ habit }) {
  const currentStreak = calculateStreak(habit.completions)
  const bestStreak = calculateBestStreak(habit.completions)
  const totalCompletions = habit.completions?.filter(c => c.completed).length || 0
  
  return (
    <div className="streak-counter">
      <div className="streak-stat">
        <span className="streak-stat__value">{currentStreak}</span>
        <span className="streak-stat__label">Current Streak</span>
        <span className="streak-stat__icon">🔥</span>
      </div>
      
      <div className="streak-stat">
        <span className="streak-stat__value">{bestStreak}</span>
        <span className="streak-stat__label">Best Streak</span>
        <span className="streak-stat__icon">🏆</span>
      </div>
      
      <div className="streak-stat">
        <span className="streak-stat__value">{totalCompletions}</span>
        <span className="streak-stat__label">Total Days</span>
        <span className="streak-stat__icon">✨</span>
      </div>
    </div>
  )
}

export default StreakCounter
