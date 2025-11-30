import { useState } from 'react'
import Card from './UI/Card'
import Button from './UI/Button'
import CalendarDay from './CalendarDay'
import { generateCalendarDays, getMonthName } from '../utils/dateHelpers'
import './CalendarView.css'

function CalendarView({ habits }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calendarDays = generateCalendarDays(year, month)
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }
  
  const goToToday = () => {
    setCurrentDate(new Date())
  }
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <Card className="calendar-view">
      <div className="calendar-header">
        <h2 className="calendar-title">{getMonthName(currentDate)}</h2>
        <div className="calendar-nav">
          <Button onClick={goToPreviousMonth}>←</Button>
          <Button onClick={goToToday}>Today</Button>
          <Button onClick={goToNextMonth}>→</Button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        
        {calendarDays.map((date, index) => (
          <CalendarDay
            key={index}
            date={date}
            currentMonth={month}
            habitCompletions={habits}
          />
        ))}
      </div>
      
      <div className="calendar-legend">
        <h4>Your Habits:</h4>
        <div className="calendar-legend__items">
          {habits.map(habit => (
            <div key={habit.id} className="calendar-legend__item">
              <div 
                className="calendar-legend__dot"
                style={{ backgroundColor: habit.color }}
              />
              <span>{habit.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default CalendarView
