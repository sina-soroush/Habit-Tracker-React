import { formatDateKey, isTodayHelper } from '../utils/dateHelpers'
import './CalendarDay.css'

function CalendarDay({ date, currentMonth, habitCompletions }) {
  const isToday = isTodayHelper(date)
  const isCurrentMonth = date.getMonth() === currentMonth
  const dateKey = formatDateKey(date)
  
  const completedHabits = habitCompletions.filter(hc => 
    hc.completions.some(c => c.date === dateKey && c.completed)
  )
  
  const dayNumber = date.getDate()
  
  return (
    <div 
      className={`calendar-day ${!isCurrentMonth ? 'calendar-day--other-month' : ''} ${isToday ? 'calendar-day--today' : ''}`}
    >
      <span className="calendar-day__number">{dayNumber}</span>
      
      {completedHabits.length > 0 && (
        <div className="calendar-day__indicators">
          {completedHabits.slice(0, 3).map((habit) => (
            <div
              key={habit.id}
              className="calendar-day__dot"
              style={{ backgroundColor: habit.color }}
              title={habit.name}
            />
          ))}
          {completedHabits.length > 3 && (
            <span className="calendar-day__more">+{completedHabits.length - 3}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default CalendarDay
