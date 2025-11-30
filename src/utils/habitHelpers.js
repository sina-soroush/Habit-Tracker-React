import { formatDateKey, isSameDayHelper, daysBetween } from './dateHelpers'


export const calculateStreak = (completions) => {
  if (!completions || completions.length === 0) return 0
  

  const sorted = [...completions]
    .filter(c => c.completed)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  if (sorted.length === 0) return 0
  
  const today = new Date()
  const mostRecent = new Date(sorted[0].date)
  
  const daysDiff = daysBetween(today, mostRecent)
  if (daysDiff > 1) return 0 // Streak broken
  
  let streak = 0
  let checkDate = new Date(today)
  
  if (daysDiff === 1) {
    checkDate.setDate(checkDate.getDate() - 1)
  }
  
  for (let completion of sorted) {
    const compDate = new Date(completion.date)
    if (isSameDayHelper(compDate, checkDate)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
}

export const calculateBestStreak = (completions) => {
  if (!completions || completions.length === 0) return 0
  
  const sorted = [...completions]
    .filter(c => c.completed)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  
  let bestStreak = 0
  let currentStreak = 0
  let previousDate = null
  
  for (let completion of sorted) {
    const currentDate = new Date(completion.date)
    
    if (previousDate === null) {
      currentStreak = 1
    } else {
      const diff = daysBetween(currentDate, previousDate)
      if (diff === 1) {
        currentStreak++
      } else {
        currentStreak = 1
      }
    }
    
    bestStreak = Math.max(bestStreak, currentStreak)
    previousDate = currentDate
  }
  
  return bestStreak
}

export const isCompletedToday = (habit) => {
  if (!habit.completions) return false
  
  const today = formatDateKey(new Date())
  const todayCompletion = habit.completions.find(c => c.date === today)
  
  return todayCompletion?.completed || false
}

export const getCompletionRate = (habit, days = 30) => {
  if (!habit.completions || habit.completions.length === 0) return 0
  
  const today = new Date()
  const startDate = new Date()
  startDate.setDate(today.getDate() - days)
  
  const completedDays = habit.completions.filter(c => {
    const compDate = new Date(c.date)
    return c.completed && compDate >= startDate && compDate <= today
  }).length
  
  return Math.round((completedDays / days) * 100)
}

export const getMonthCompletions = (habit, year, month) => {
  if (!habit.completions) return []
  
  return habit.completions.filter(c => {
    const date = new Date(c.date)
    return date.getFullYear() === year && date.getMonth() === month
  })
}
