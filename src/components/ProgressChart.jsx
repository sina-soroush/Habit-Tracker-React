import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import Card from './UI/Card'
import { formatDateKey } from '../utils/dateHelpers'
import { isCompletedToday, getCompletionRate } from '../utils/habitHelpers'
import './ProgressChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function ProgressChart({ habits }) {
  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date)
    }
    return days
  }

  const last7Days = getLast7Days()
  const labels = last7Days.map(date => {
    const day = date.toLocaleDateString('en-US', { weekday: 'short' })
    const dateNum = date.getDate()
    return `${day} ${dateNum}`
  })

  const getWeeklyData = () => {
    return last7Days.map(date => {
      const dateKey = formatDateKey(date)
      return habits.filter(habit =>
        habit.completions?.some(c => c.date === dateKey && c.completed)
      ).length
    })
  }

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Habits Completed',
        data: getWeeklyData(),
        borderColor: '#6d5dfc',
        backgroundColor: 'rgba(109, 93, 252, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#6d5dfc',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  }

  const barChartData = {
    labels: habits.map(h => h.name),
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: habits.map(h => getCompletionRate(h, 30)),
        backgroundColor: habits.map(h => h.color),
        borderRadius: 10,
        borderSkipped: false
      }
    ]
  }

  const completedToday = habits.filter(h => isCompletedToday(h)).length
  const notCompleted = habits.length - completedToday

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completedToday, notCompleted],
        backgroundColor: ['#6d5dfc', '#E4EBF5'],
        borderWidth: 0,
        cutout: '70%'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#9baacf',
          font: {
            family: 'Poppins',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#E4EBF5',
        titleColor: '#6d5dfc',
        bodyColor: '#9baacf',
        borderColor: '#c8d0e7',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        titleFont: {
          family: 'Poppins',
          size: 14
        },
        bodyFont: {
          family: 'Poppins',
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9baacf',
          font: {
            family: 'Poppins'
          }
        },
        grid: {
          color: '#E4EBF5'
        }
      },
      x: {
        ticks: {
          color: '#9baacf',
          font: {
            family: 'Poppins'
          }
        },
        grid: {
          color: '#E4EBF5'
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#9baacf',
          font: {
            family: 'Poppins',
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#E4EBF5',
        titleColor: '#6d5dfc',
        bodyColor: '#9baacf',
        borderColor: '#c8d0e7',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'Poppins',
          size: 14
        },
        bodyFont: {
          family: 'Poppins',
          size: 12
        }
      }
    }
  }

  if (habits.length === 0) {
    return null
  }

  return (
    <div className="progress-charts">
      <Card className="chart-card">
        <h2 className="chart-title">Weekly Progress</h2>
        <div className="chart-container">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </Card>

      <Card className="chart-card">
        <h2 className="chart-title">Habit Comparison</h2>
        <div className="chart-container">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </Card>

      <Card className="chart-card chart-card--small">
        <h2 className="chart-title">Today's Completion</h2>
        <div className="chart-container chart-container--doughnut">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="doughnut-center">
            <span className="doughnut-percentage">
              {habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProgressChart
