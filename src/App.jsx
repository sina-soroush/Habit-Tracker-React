import { useState, useEffect } from 'react'
import './App.css'
import useHabits from './hooks/useHabits'
import Navigation from './components/Navigation'
import AddHabitForm from './components/AddHabitForm'
import HabitList from './components/HabitList'
import CalendarView from './components/CalendarView'
import Statistics from './components/Statistics'
import ProgressChart from './components/ProgressChart'

function App() {
  const { habits, addHabit, toggleCompletion, deleteHabit } = useHabits()
  const [activeTab, setActiveTab] = useState('habits')
  const [overlayActive, setOverlayActive] = useState(false)

  const handleTabChange = (tabId, color) => {
    setOverlayActive(true)
    document.documentElement.style.setProperty('--active-tab-color', color)
    
    setTimeout(() => {
      setActiveTab(tabId)
      setOverlayActive(false)
    }, 500)
  }

  useEffect(() => {
    const overlay = document.querySelector('.overlay')
    if (overlay) {
      if (overlayActive) {
        overlay.classList.add('overlay--active')
      } else {
        overlay.classList.remove('overlay--active')
      }
    }
  }, [overlayActive])

  const renderContent = () => {
    switch (activeTab) {
      case 'habits':
        return (
          <>
            <AddHabitForm onAdd={addHabit} />
            <HabitList 
              habits={habits}
              onToggle={toggleCompletion}
              onDelete={deleteHabit}
            />
          </>
        )
      case 'calendar':
        return habits.length > 0 ? (
          <CalendarView habits={habits} />
        ) : (
          <div className="empty-message">No habits to display. Create your first habit!</div>
        )
      case 'statistics':
        return habits.length > 0 ? (
          <Statistics habits={habits} />
        ) : (
          <div className="empty-message">No statistics available. Create habits to see your progress!</div>
        )
      case 'charts':
        return habits.length > 0 ? (
          <ProgressChart habits={habits} />
        ) : (
          <div className="empty-message">No data to visualize. Start tracking your habits!</div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Habit Tracker</h1>
      </header>
      <main className="app-main">
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
