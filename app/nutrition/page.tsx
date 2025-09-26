'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import {
  Plus,
  Search,
  Calendar,
  Target,
  Flame,
  Droplets,
  Beef,
  Wheat,
  Cherry,
  TrendingUp,
  Clock,
  Edit,
  Trash2
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

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
const dailyGoals = {
  calories: 2200,
  protein: 150,
  carbs: 250,
  fats: 80
}

const mockNutritionLogs = [
  {
    id: 1,
    foodName: 'Greek Yogurt',
    calories: 150,
    protein: 20,
    carbs: 6,
    fats: 10,
    quantity: 1,
    unit: 'cup',
    mealType: 'BREAKFAST',
    loggedAt: new Date().toISOString()
  },
  {
    id: 2,
    foodName: 'Banana',
    calories: 105,
    protein: 1,
    carbs: 27,
    fats: 0.3,
    quantity: 1,
    unit: 'medium',
    mealType: 'BREAKFAST',
    loggedAt: new Date().toISOString()
  },
  {
    id: 3,
    foodName: 'Grilled Chicken Breast',
    calories: 231,
    protein: 43,
    carbs: 0,
    fats: 5,
    quantity: 100,
    unit: 'g',
    mealType: 'LUNCH',
    loggedAt: new Date().toISOString()
  },
  {
    id: 4,
    foodName: 'Brown Rice',
    calories: 216,
    protein: 5,
    carbs: 45,
    fats: 1.8,
    quantity: 1,
    unit: 'cup',
    mealType: 'LUNCH',
    loggedAt: new Date().toISOString()
  }
]

const weeklyData = [
  { day: 'Mon', calories: 2180, protein: 145, carbs: 240, fats: 75 },
  { day: 'Tue', calories: 2250, protein: 155, carbs: 260, fats: 82 },
  { day: 'Wed', calories: 2100, protein: 140, carbs: 230, fats: 70 },
  { day: 'Thu', calories: 2300, protein: 160, carbs: 270, fats: 85 },
  { day: 'Fri', calories: 2200, protein: 150, carbs: 250, fats: 80 },
  { day: 'Sat', calories: 2400, protein: 165, carbs: 280, fats: 88 },
  { day: 'Sun', calories: 2150, protein: 142, carbs: 240, fats: 78 }
]

const mealTypes = [
  { key: 'BREAKFAST', label: 'Breakfast', icon: '🌅' },
  { key: 'LUNCH', label: 'Lunch', icon: '☀️' },
  { key: 'DINNER', label: 'Dinner', icon: '🌙' },
  { key: 'SNACK', label: 'Snacks', icon: '🍎' }
]

export default function NutritionPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [nutritionLogs, setNutritionLogs] = useState(mockNutritionLogs)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

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

  // Calculate today's totals
  const todaysTotals = nutritionLogs.reduce(
    (totals, log) => ({
      calories: totals.calories + log.calories,
      protein: totals.protein + log.protein,
      carbs: totals.carbs + log.carbs,
      fats: totals.fats + log.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  )

  // Pie chart data for macronutrients
  const macroData = [
    { name: 'Protein', value: todaysTotals.protein * 4, color: '#3b82f6' },
    { name: 'Carbs', value: todaysTotals.carbs * 4, color: '#10b981' },
    { name: 'Fats', value: todaysTotals.fats * 9, color: '#f59e0b' }
  ]

  // Group foods by meal type
  const mealGroups = mealTypes.map(mealType => ({
    ...mealType,
    foods: nutritionLogs.filter(log => log.mealType === mealType.key),
    totals: nutritionLogs
      .filter(log => log.mealType === mealType.key)
      .reduce((totals, log) => ({
        calories: totals.calories + log.calories,
        protein: totals.protein + log.protein,
        carbs: totals.carbs + log.carbs,
        fats: totals.fats + log.fats
      }), { calories: 0, protein: 0, carbs: 0, fats: 0 })
  }))

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white">
                Nutrition Tracker
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mt-2">
                Track your daily nutrition and reach your health goals
              </motion.p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input"
              />
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Food
              </button>
            </div>
          </div>
        </motion.div>

        {/* Daily Summary Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Calories', 
              value: todaysTotals.calories, 
              goal: dailyGoals.calories, 
              unit: 'cal',
              icon: Flame,
              color: 'bg-red-500'
            },
            { 
              label: 'Protein', 
              value: todaysTotals.protein, 
              goal: dailyGoals.protein, 
              unit: 'g',
              icon: Beef,
              color: 'bg-blue-500'
            },
            { 
              label: 'Carbs', 
              value: todaysTotals.carbs, 
              goal: dailyGoals.carbs, 
              unit: 'g',
              icon: Wheat,
              color: 'bg-green-500'
            },
            { 
              label: 'Fats', 
              value: todaysTotals.fats, 
              goal: dailyGoals.fats, 
              unit: 'g',
              icon: Droplets,
              color: 'bg-yellow-500'
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            const percentage = (stat.value / stat.goal) * 100
            
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value.toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      / {stat.goal}{stat.unit}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      percentage >= 100 ? 'bg-green-600' : stat.color.replace('bg-', 'bg-')
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Food Log */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Food Log
                </h3>
              </div>

              <div className="p-6 space-y-6">
                {mealGroups.map((meal) => (
                  <div key={meal.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{meal.icon}</span>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {meal.label}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {meal.totals.calories} cal
                        </span>
                      </div>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Add Food
                      </button>
                    </div>

                    {meal.foods.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-sm italic pl-11">
                        No foods logged for {meal.label.toLowerCase()}
                      </p>
                    ) : (
                      <div className="space-y-2 pl-11">
                        {meal.foods.map((food) => (
                          <div
                            key={food.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                          >
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                                {food.foodName}
                              </h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {food.quantity} {food.unit} • {food.calories} cal
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Weekly Nutrition Trends
                </h3>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
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
                    <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Macro Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Macro Breakdown
              </h3>
              
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {macroData.map((macro, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: macro.color }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {macro.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {((macro.value / macroData.reduce((sum, m) => sum + m.value, 0)) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Water Intake */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Water Intake
                </h3>
                <Droplets className="h-5 w-5 text-blue-500" />
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    1.8
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    / 2.5L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              <button className="w-full btn btn-outline btn-sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Water
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Calories remaining
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.max(0, dailyGoals.calories - todaysTotals.calories)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Meals logged
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {mealGroups.filter(m => m.foods.length > 0).length}/4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Last meal
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    <Clock className="h-4 w-4 inline mr-1" />
                    2h ago
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}