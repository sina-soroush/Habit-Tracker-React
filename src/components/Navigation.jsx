import { useState } from 'react'
import './Navigation.css'

function Navigation({ activeTab, onTabChange }) {
  const [animating, setAnimating] = useState(false)

  const tabs = [
    { id: 'habits', icon: '/icons/Habits.png', name: 'Habits', color: '#00a8b5' },
    { id: 'calendar', icon: '/icons/Calendar.png', name: 'Calendar', color: '#58a6ff' },
    { id: 'statistics', icon: '/icons/Statistics.png', name: 'Statistics', color: '#774898' },
    { id: 'charts', icon: '/icons/Charts.png', name: 'Charts', color: '#de4383' }
  ]

  const handleTabClick = (tabId, color) => {
    if (tabId !== activeTab && !animating) {
      setAnimating(true)
      onTabChange(tabId, color)
      setTimeout(() => setAnimating(false), 1000)
    }
  }

  return (
    <>
      <div className="overlay"></div>
      <nav className="nav">
        <ul className="tabs">
          {tabs.map(tab => (
            <li
              key={tab.id}
              className={`tabs_item tab ${activeTab === tab.id ? 'tab__is-active' : ''}`}
              style={{ 
                backgroundColor: `${tab.color}20`,
                color: tab.color
              }}
              onClick={() => handleTabClick(tab.id, tab.color)}
            >
              <div 
                className="tab_circle"
                style={{ borderColor: tab.color }}
              ></div>
              <img src={tab.icon} alt={tab.name} className="tab_icon" />
              <span className="tab_name">{tab.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navigation
