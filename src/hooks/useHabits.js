import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './useLocalStorage'
import { formatDateKey } from '../utils/dateHelpers'
import { calculateStreak, isCompletedToday } from '../utils/habitHelpers'

function useHabits() {
  const [habits, setHabits] = useLocalStorage('habitTracker_habits', [])

  const addHabit = useCallback((habitData) => {
    const newHabit = {
      id: uuidv4(),
      name: habitData.name,
      description: habitData.description || '',
      color: habitData.color || '#6d5dfc',
      goal: habitData.goal || 'daily',
      createdAt: new Date().toISOString(),
      completions: []
    }

    setHabits(prevHabits => [...prevHabits, newHabit])
    return newHabit
  }, [setHabits])

  const updateHabit = useCallback((habitId, updates) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === habitId 
          ? { ...habit, ...updates }
          : habit
      )
    )
  }, [setHabits])

  const deleteHabit = useCallback((habitId) => {
    setHabits(prevHabits => 
      prevHabits.filter(habit => habit.id !== habitId)
    )
  }, [setHabits])

  const toggleCompletion = useCallback((habitId, date = new Date()) => {
    const dateKey = formatDateKey(date)

    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id !== habitId) return habit

        const completions = habit.completions || []
        const existingIndex = completions.findIndex(c => c.date === dateKey)

        let newCompletions
        if (existingIndex >= 0) {
          newCompletions = completions.map((c, i) => 
            i === existingIndex 
              ? { ...c, completed: !c.completed }
              : c
          )
        } else {
          newCompletions = [...completions, { date: dateKey, completed: true }]
        }

        return { ...habit, completions: newCompletions }
      })
    )
  }, [setHabits])

  const getHabitStats = useCallback((habitId) => {
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return null

    return {
      currentStreak: calculateStreak(habit.completions),
      isCompletedToday: isCompletedToday(habit),
      totalCompletions: habit.completions?.filter(c => c.completed).length || 0
    }
  }, [habits])

  const clearAllHabits = useCallback(() => {
    setHabits([])
  }, [setHabits])

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    getHabitStats,
    clearAllHabits
  }
}

export default useHabits
