const STORAGE_KEY = 'habitTracker_habits'

export const loadHabits = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading habits:', error)
    return []
  }
}

export const saveHabits = (habits) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
    return true
  } catch (error) {
    console.error('Error saving habits:', error)
    return false
  }
}

export const clearHabits = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing habits:', error)
    return false
  }
}

export const exportHabits = (habits) => {
  const dataStr = JSON.stringify(habits, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `habits_backup_${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export const importHabits = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const habits = JSON.parse(e.target.result)
        resolve(habits)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsText(file)
  })
}
