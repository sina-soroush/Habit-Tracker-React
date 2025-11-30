import './App.css'
import Button from './components/UI/Button'
import Input from './components/UI/Input'
import Checkbox from './components/UI/Checkbox'
import Card from './components/UI/Card'
import { useState } from 'react'

function App() {
  const [checked, setChecked] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Habit Tracker</h1>
      </header>
      <main className="app-main">
        <Card>
          <h2 style={{ marginBottom: '2rem', color: 'var(--primary)' }}>Testing UI Components</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <Input 
              placeholder="Enter habit name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>

          <Checkbox 
            id="test-checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            label="Mark as completed"
          />
        </Card>
      </main>
    </div>
  )
}

export default App
