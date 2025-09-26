'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Dumbbell, ArrowLeft } from 'lucide-react'
import { validateEmail } from '@/lib/utils'

interface SignInForm {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>()

  const onSubmit = async (data: SignInForm) => {
    if (!validateEmail(data.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    console.log(data.email, data.password)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid credentials. Please try again.')
      } else {
        toast.success('Welcome back!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account to continue your fitness journey
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => validateEmail(value) || 'Invalid email address',
                })}
                type="email"
                className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  className={`input pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg w-full disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Signing in..
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/signup/"
                className="btn btn-outline btn-lg w-full"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-primary-600 hover:text-primary-500">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  )
}