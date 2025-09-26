'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'
import {
  Activity,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Clock,
  Flame,
  Users,
  Play,
  Plus,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Mock data for demonstration
const workoutData = [
  { day: 'Mon', calories: 320 },
  { day: 'Tue', calories: 450 },
  { day: 'Wed', calories: 380 },
  { day: 'Thu', calories: 520 },
  { day: 'Fri', calories: 290 },
  { day: 'Sat', calories: 600 },
  { day: 'Sun', calories: 400 },
]

const recentWorkouts = [
  { id: 1, name: 'Morning HIIT', duration: 30, calories: 320, date: '2024-01-15' },
  { id: 2, name: 'Strength Training', duration: 45, calories: 280, date: '2024-01-14' },
  { id: 3, name: 'Cardio Blast', duration: 25, calories: 250, date: '2024-01-13' },
]

const upcomingWorkouts = [
  { id: 1, name: 'Leg Day Workout', time: '10:00 AM', difficulty: 'Hard' },
  { id: 2, name: 'Yoga Flow', time: '2:00 PM', difficulty: 'Easy' },
  { id: 3, name: 'Core Strength', time: '6:00 PM', difficulty: 'Medium' },
]

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalWorkouts: 24,
    weeklyGoal: 5,
    completedThisWeek: 3,
    caloriesBurned: 2840,
    activeStreak: 7
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-8"
        >
          <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'Fitness Enthusiast'}! 👋
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mt-2">
            Ready to crush your fitness goals today?
          </motion.p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Target, label: 'Weekly Goal', value: `${stats.completedThisWeek}/${stats.weeklyGoal}`, color: 'bg-blue-500', progress: (stats.completedThisWeek / stats.weeklyGoal) * 100 },
            { icon: Flame, label: 'Calories Burned', value: stats.caloriesBurned.toLocaleString(), color: 'bg-red-500' },
            { icon: Activity, label: 'Total Workouts', value: stats.totalWorkouts, color: 'bg-green-500' },
            { icon: Award, label: 'Active Streak', value: `${stats.activeStreak} days`, color: 'bg-purple-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              {stat.progress && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(stat.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts and Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Activity</h3>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Calories burned</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="day" 
                      className="text-gray-600 dark:text-gray-400" 
                    />
                    <YAxis className="text-gray-600 dark:text-gray-400" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(30 41 59)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Workouts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Workouts</h3>
                <button className="btn btn-sm btn-primary">
                  <Plus className="h-4 w-4 mr-1" />
                  Log Workout
                </button>
              </div>
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{workout.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{workout.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{workout.duration}min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame className="h-4 w-4" />
                          <span>{workout.calories} cal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {upcomingWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{workout.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{workout.time}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      workout.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      workout.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {workout.difficulty}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn btn-outline btn-sm">
                View Full Schedule
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn btn-primary btn-sm justify-start">
                  <Play className="h-4 w-4 mr-2" />
                  Start Quick Workout
                </button>
                <button className="w-full btn btn-outline btn-sm justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Nutrition
                </button>
                <button className="w-full btn btn-outline btn-sm justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Progress
                </button>
                <button className="w-full btn btn-outline btn-sm justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Plans
                </button>
              </div>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Award className="h-8 w-8" />
                <div>
                  <h3 className="font-bold">Week Warrior!</h3>
                  <p className="text-sm opacity-90">7-day streak achieved</p>
                </div>
              </div>
              <p className="text-sm opacity-90">
                Congratulations! You've maintained your fitness routine for a full week. Keep it up!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}