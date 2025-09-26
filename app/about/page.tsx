'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  Target, 
  Zap, 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react'
import Header from '@/components/Navbar'
import Footer from '@/components/Footer'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.2 
    } 
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

// Data arrays
const values = [
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand that every fitness journey is personal and unique.",
    color: "bg-gradient-to-br from-red-500 to-pink-500"
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Everything we do is focused on helping you achieve measurable results.",
    color: "bg-gradient-to-br from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Science-Based",
    description: "Our methods are grounded in the latest fitness and nutrition research.",
    color: "bg-gradient-to-br from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of supportive communities to drive success.",
    color: "bg-gradient-to-br from-purple-500 to-violet-500"
  }
]

const stats = [
  { icon: Users, number: "50K+", label: "Active Users" },
  { icon: Award, number: "95%", label: "Success Rate" },
  { icon: Clock, number: "2M+", label: "Workouts Completed" },
  { icon: Globe, number: "120+", label: "Countries" }
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Former Olympic trainer with 15 years of experience in personalized fitness coaching.",
    specialization: "Strength Training & Leadership"
  },
  {
    name: "Dr. Michael Chen",
    role: "Head of Nutrition",
    bio: "PhD in Sports Nutrition, published researcher, and registered dietitian.",
    specialization: "Sports Nutrition & Metabolism"
  },
  {
    name: "Emily Rodriguez",
    role: "Senior Trainer",
    bio: "Certified in multiple fitness disciplines with expertise in functional movement.",
    specialization: "Functional Training & Mobility"
  },
  {
    name: "James Thompson",
    role: "Wellness Coach",
    bio: "Licensed therapist specializing in the mind-body connection in fitness.",
    specialization: "Mental Wellness & Coaching"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center text-white"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              About FitnessPro
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Empowering millions of people worldwide to transform their lives through 
              personalized fitness and nutrition guidance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To democratize access to world-class fitness guidance and make healthy living achievable 
              for everyone, regardless of their starting point, schedule, or budget. We're here to support 
              you every step of the way on your fitness journey.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <Zap className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Why We Started</h3>
                <p className="text-blue-100 leading-relaxed">
                  After seeing too many people struggle with inconsistent results from generic fitness 
                  programs, our founder Sarah Johnson decided to create a platform that delivers 
                  personalized, science-backed fitness solutions that actually work.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-8">
                <Target className="h-12 w-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To be the world's most trusted fitness platform, where millions of people achieve 
                  their health and wellness goals through personalized guidance, supportive community, 
                  and cutting-edge technology.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for our users.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className={`inline-flex p-4 rounded-2xl ${value.color} mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact in Numbers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how we're helping people achieve their fitness goals worldwide.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Expert Team
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our certified trainers and nutrition experts are here to guide you to success.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {member.specialization}
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
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of people who have transformed their lives with FitnessPro. 
              Your personalized fitness journey starts today.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}