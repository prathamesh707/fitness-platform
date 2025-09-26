'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import {
  Users,
  Dumbbell,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Calendar,
  Award,
  Bell
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

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
const adminStats = {
  totalUsers: 50234,
  activePlans: 47,
  totalWorkouts: 1250000,
  monthlyRevenue: 125500
}

const recentUsers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', joinDate: '2024-01-15', plan: 'Premium' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', joinDate: '2024-01-14', plan: 'Basic' },
  { id: 3, name: 'Mike Wilson', email: 'mike@example.com', joinDate: '2024-01-13', plan: 'Pro' },
  { id: 4, name: 'Emma Davis', email: 'emma@example.com', joinDate: '2024-01-12', plan: 'Premium' },
]

const fitnessPlans = [
  { id: 1, title: 'Beginner Full Body', category: 'Strength', subscribers: 1250, status: 'Active' },
  { id: 2, title: 'HIIT Cardio Blast', category: 'Cardio', subscribers: 890, status: 'Active' },
  { id: 3, title: 'Advanced Strength', category: 'Strength', subscribers: 567, status: 'Active' },
  { id: 4, title: 'Yoga Flow', category: 'Yoga', subscribers: 2100, status: 'Active' },
]

const monthlyData = [
  { month: 'Jan', users: 1200, revenue: 45000, workouts: 25000 },
  { month: 'Feb', users: 1450, revenue: 52000, workouts: 28000 },
  { month: 'Mar', users: 1680, revenue: 58000, workouts: 32000 },
  { month: 'Apr', users: 1920, revenue: 65000, workouts: 35000 },
  { month: 'May', users: 2150, revenue: 72000, workouts: 38000 },
  { month: 'Jun', users: 2380, revenue: 78000, workouts: 42000 },
]

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'plans', label: 'Fitness Plans', icon: Dumbbell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderOverview = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Users', 
            value: adminStats.totalUsers.toLocaleString(), 
            change: '+12.5%',
            icon: Users,
            color: 'bg-blue-500'
          },
          { 
            label: 'Active Plans', 
            value: adminStats.activePlans, 
            change: '+3.2%',
            icon: Dumbbell,
            color: 'bg-green-500'
          },
          { 
            label: 'Total Workouts', 
            value: adminStats.totalWorkouts.toLocaleString(), 
            change: '+18.7%',
            icon: Award,
            color: 'bg-purple-500'
          },
          { 
            label: 'Monthly Revenue', 
            value: `$${adminStats.monthlyRevenue.toLocaleString()}`, 
            change: '+9.1%',
            icon: TrendingUp,
            color: 'bg-orange-500'
          }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} vs last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Growth
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
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
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Revenue
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(30 41 59)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        variants={fadeInUp}
        className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Users
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Join Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )

  const renderUsers = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search users..."
            className="input"
          />
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <motion.div
        variants={fadeInUp}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{user.joinDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  const renderPlans = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fitness Plans</h2>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fitnessPlans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={fadeInUp}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {plan.title}
              </h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                plan.status === 'Active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>
                {plan.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Category:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{plan.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Subscribers:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{plan.subscribers.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="btn btn-sm btn-outline flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              <button className="btn btn-sm btn-ghost">
                <Edit className="h-4 w-4" />
              </button>
              <button className="btn btn-sm btn-ghost text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const renderSettings = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">User Registration</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Allow new users to register</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Send system notifications via email</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Maintenance Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Put the platform in maintenance mode</p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            <button className="w-full btn btn-outline justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Send Announcement
            </button>
            <button className="w-full btn btn-outline justify-start">
              <Users className="h-4 w-4 mr-2" />
              Bulk Email Users
            </button>
            <button className="w-full btn btn-outline justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Notification
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'users':
        return renderUsers()
      case 'plans':
        return renderPlans()
      case 'settings':
        return renderSettings()
      default:
        return renderOverview()
    }
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
            Admin Dashboard
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your fitness platform and monitor key metrics
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-8"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}
