'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Dumbbell,
  Target,
  TrendingUp,
  Users,
  Award,
  Play,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const features = [
  {
    icon: Target,
    title: 'Personalized Plans',
    description: 'Custom workout and nutrition plans tailored to your fitness goals and lifestyle.',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your fitness journey with detailed analytics and progress photos.',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Get professional advice from certified trainers and nutritionists.',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Unlock badges and rewards as you reach your fitness milestones.',
    color: 'bg-gradient-to-br from-orange-500 to-red-500'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    image: '/testimonials/sarah.jpg',
    rating: 5,
    text: 'FitnessPro transformed my entire approach to health and wellness. The personalized plans are incredible!'
  },
  {
    name: 'Mike Chen',
    role: 'Professional Athlete',
    image: '/testimonials/mike.jpg',
    rating: 5,
    text: 'As a professional athlete, I need precise tracking and planning. This platform delivers exactly that.'
  },
  {
    name: 'Emma Davis',
    role: 'Busy Professional',
    image: '/testimonials/emma.jpg',
    rating: 5,
    text: 'Perfect for my busy schedule. Quick workouts that actually work and nutrition tracking made simple.'
  }
]

const stats = [
  { number: '50K+', label: 'Active Users' },
  { number: '1M+', label: 'Workouts Completed' },
  { number: '98%', label: 'Success Rate' },
  { number: '24/7', label: 'Support Available' }
]

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Transform Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Achieve your fitness goals with personalized workout plans, nutrition tracking,
              and expert guidance. Start your transformation today.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isAuthenticated ? (
                <Link href="/dashboard" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                    <Play className="h-5 w-5 mr-2" />
                    Start Free Trial
                  </Link>
                  <Link href="/plans" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                    View Plans
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Our comprehensive platform provides all the tools and support you need
              for your fitness transformation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800 p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Get started in three simple steps and transform your fitness journey.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description: 'Tell us about your fitness goals, current level, and preferences.'
              },
              {
                step: '2',
                title: 'Get Your Plan',
                description: 'Receive a personalized workout and nutrition plan designed just for you.'
              },
              {
                step: '3',
                title: 'Track Progress',
                description: 'Monitor your journey with our comprehensive tracking and analytics tools.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-xl font-bold rounded-full">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Join thousands of satisfied users who have transformed their lives with FitnessPro.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to Start Your Transformation?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of users who have already transformed their lives.
              Start your free trial today.
            </motion.p>
            <motion.div variants={fadeInUp}>
              {isAuthenticated ? (
                <Link href="/dashboard" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                  <Dumbbell className="h-5 w-5 mr-2" />
                  Continue Your Journey
                </Link>
              ) : (
                <Link href="/auth/signup" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}