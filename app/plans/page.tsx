'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Types
interface FitnessPlan {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: number
  price: number
  image?: string
  workoutCount: number
  subscriberCount: number
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface PlansResponse {
  success: boolean
  data: {
    plans: FitnessPlan[]
    pagination: PaginationInfo
  }
}

// Mock data for development (remove when API is working)
const mockPlans: FitnessPlan[] = [
  {
    id: '1',
    title: 'Beginner\'s Full Body Transformation',
    description: 'Perfect for fitness newcomers. Build strength, improve endurance, and establish healthy habits.',
    category: 'Strength Training',
    difficulty: 'Beginner',
    duration: 30,
    price: 1500,
    image: '/images/beginner-plan.jpg',
    workoutCount: 12,
    subscriberCount: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Advanced HIIT Challenge',
    description: 'High-intensity interval training for experienced athletes. Push your limits and achieve peak performance.',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 21,
    price: 49.99,
    image: '/images/hiit-plan.jpg',
    workoutCount: 8,
    subscriberCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Yoga & Flexibility Mastery',
    description: 'Improve flexibility, balance, and mental well-being through guided yoga sessions.',
    category: 'Yoga',
    difficulty: 'Intermediate',
    duration: 45,
    price: 19.99,
    image: '/images/yoga-plan.jpg',
    workoutCount: 20,
    subscriberCount: 203,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const categories = ['All', 'Strength Training', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'CrossFit']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function PlansPage() {
  const { data: session } = useSession()
  const [plans, setPlans] = useState<FitnessPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filters
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  // Pagination info
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  // Fetch plans from API
  const fetchPlans = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      })
      
      if (category !== 'All') params.append('category', category)
      if (difficulty !== 'All') params.append('difficulty', difficulty)
      if (search.trim()) params.append('search', search.trim())
      
      const response = await fetch(`/api/plans?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch plans')
      }
      
      const data: PlansResponse = await response.json()
      
      if (data.success) {
        setPlans(data.data.plans)
        setPagination(data.data.pagination)
      } else {
        throw new Error('API returned error')
      }
    } catch (err) {
      console.error('Error fetching plans:', err)
      setError('Failed to load fitness plans. Using sample data.')
      // Fallback to mock data
      setPlans(mockPlans)
      setPagination({
        page: 1,
        limit: 12,
        totalCount: mockPlans.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch plans when filters change
  useEffect(() => {
    fetchPlans()
  }, [category, difficulty, search, page])

  // Reset page when filters change
  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    }
  }, [category, difficulty, search])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading fitness plans...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fitness Plans
        </h1>
        <p className="text-lg text-gray-600">
          Choose from our curated collection of fitness plans designed to help you achieve your goals.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plans..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setCategory('All')
                setDifficulty('All')
                setSearch('')
                setPage(1)
              }}
              className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {pagination ? `${pagination.totalCount} plans found` : `${plans.length} plans`}
        </p>
        {session?.user?.role === 'ADMIN' && (
          <Link
            href="/admin/plans/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create New Plan
          </Link>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            {/* Plan Image */}
            <div className="h-48 bg-gray-200 relative">
              {plan.image ? (
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Difficulty Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(plan.difficulty)}`}>
                  {plan.difficulty}
                </span>
              </div>
            </div>

            {/* Plan Content */}
            <div className="p-6">
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {plan.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  {plan.category}
                </p>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {plan.description}
              </p>

              {/* Plan Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{plan.duration} days</span>
                <span>{plan.workoutCount} workouts</span>
                <span>{plan.subscriberCount} subscribers</span>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900">
                  ${plan.price}
                </div>
                <Link
                  href={`/plans/${plan.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing page {pagination.page} of {pagination.totalPages}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!pagination.hasPrev}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-2 text-sm border rounded-md ${
                  pageNum === pagination.page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasNext}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {plans.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No plans found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  )
}