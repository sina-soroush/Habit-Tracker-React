import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameDay,
  isToday,
  differenceInDays
} from 'date-fns'

export const formatDateKey = (date) => {
  return format(date, 'yyyy-MM-dd')
}

export const formatDisplayDate = (date) => {
  return format(date, 'MMM dd, yyyy')
}

export const isSameDayHelper = (date1, date2) => {
  return isSameDay(date1, date2)
}

export const isTodayHelper = (date) => {
  return isToday(date)
}

export const generateCalendarDays = (year, month) => {
  const firstDay = startOfMonth(new Date(year, month))
  const lastDay = endOfMonth(new Date(year, month))
  const startDate = startOfWeek(firstDay)
  const endDate = endOfWeek(lastDay)
  
  const days = []
  let currentDay = startDate
  
  while (currentDay <= endDate) {
    days.push(new Date(currentDay))
    currentDay = addDays(currentDay, 1)
  }
  
  return days
}

export const getDayName = (date) => {
  return format(date, 'EEEE')
}


export const getMonthName = (date) => {
  return format(date, 'MMMM yyyy')
}
export const daysBetween = (date1, date2) => {
  return differenceInDays(date1, date2)
}
