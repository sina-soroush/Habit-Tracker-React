import Card from './UI/Card'
import StreakCounter from './StreakCounter'
import { isCompletedToday, getCompletionRate } from '../utils/habitHelpers'
import './Statistics.css'

function Statistics({ habits }) {
  const totalHabits = habits.length
  const completedToday = habits.filter(h => isCompletedToday(h)).length
  const completionPercentage = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0
  
  const avgCompletionRate = totalHabits > 0
    ? Math.round(
        habits.reduce((sum, h) => sum + getCompletionRate(h, 30), 0) / totalHabits
      )
    : 0
  
  const mostConsistent = habits.length > 0
    ? habits.reduce((best, habit) => {
        const rate = getCompletionRate(habit, 30)
        return rate > getCompletionRate(best, 30) ? habit : best
      }, habits[0])
    : null
  
  return (
    <div className="statistics">
      <Card className="statistics-overview">
        <h2 className="statistics-title">Overview</h2>
        
        <div className="statistics-grid">
          <div className="stat-box">
            <span className="stat-box__icon">📊</span>
            <span className="stat-box__value">{totalHabits}</span>
            <span className="stat-box__label">Total Habits</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-box__icon">✅</span>
            <span className="stat-box__value">{completedToday}/{totalHabits}</span>
            <span className="stat-box__label">Completed Today</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-box__icon">🎯</span>
            <span className="stat-box__value">{completionPercentage}%</span>
            <span className="stat-box__label">Today's Progress</span>
          </div>
          
          <div className="stat-box">
            <span className="stat-box__icon">📈</span>
            <span className="stat-box__value">{avgCompletionRate}%</span>
            <span className="stat-box__label">30-Day Average</span>
          </div>
        </div>
        
        {mostConsistent && (
          <div className="most-consistent">
            <h3>🌟 Most Consistent Habit</h3>
            <div className="most-consistent__habit">
              <div 
                className="most-consistent__color"
                style={{ backgroundColor: mostConsistent.color }}
              />
              <span className="most-consistent__name">{mostConsistent.name}</span>
              <span className="most-consistent__rate">
                {getCompletionRate(mostConsistent, 30)}% completion
              </span>
            </div>
          </div>
        )}
      </Card>
      
      {habits.length > 0 && (
        <Card className="individual-stats">
          <h2 className="statistics-title">Habit Details</h2>
          {habits.map(habit => (
            <div key={habit.id} className="habit-detail">
              <div className="habit-detail__header">
                <div 
                  className="habit-detail__color"
                  style={{ backgroundColor: habit.color }}
                />
                <h3 className="habit-detail__name">{habit.name}</h3>
              </div>
              <StreakCounter habit={habit} />
              <div className="habit-detail__rate">
                <div className="progress-bar">
                  <div 
                    className="progress-bar__fill"
                    style={{ 
                      width: `${getCompletionRate(habit, 30)}%`,
                      backgroundColor: habit.color
                    }}
                  />
                </div>
                <span className="progress-text">
                  {getCompletionRate(habit, 30)}% completed (last 30 days)
                </span>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}

export default Statistics
