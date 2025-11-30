import HabitItem from './HabitItem'
import './HabitList.css'

function HabitList({ habits, onToggle, onDelete }) {
  if (habits.length === 0) {
    return (
      <div className="habit-list--empty">
        <div className="empty-state">
          <span className="empty-state__icon">📝</span>
          <h3 className="empty-state__title">No habits yet</h3>
          <p className="empty-state__text">
            Start building better habits by creating your first one!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default HabitList
