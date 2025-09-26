import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isActive: true
    }

    if (category && category !== 'All') {
      where.category = category
    }

    if (difficulty && difficulty !== 'All') {
      where.difficulty = difficulty
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get fitness plans with pagination
    const [plans, totalCount] = await Promise.all([
      prisma.fitnessPlan.findMany({
        where,
        include: {
          workouts: {
            select: {
              id: true,
              title: true,
              duration: true,
              calories: true
            },
            orderBy: { order: 'asc' }
          },
          subscriptions: {
            select: { id: true }
          },
          _count: {
            select: {
              subscriptions: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.fitnessPlan.count({ where })
    ])

    // Transform data to include subscriber count and workout count
    const transformedPlans = plans.map(plan => ({
      id: plan.id,
      title: plan.title,
      description: plan.description,
      category: plan.category,
      difficulty: plan.difficulty,
      duration: plan.duration,
      price: plan.price,
      image: plan.image,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
      workoutCount: plan.workouts.length,
      subscriberCount: plan._count.subscriptions,
      workouts: plan.workouts
    }))

    return NextResponse.json({
      plans: transformedPlans,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching fitness plans:', error)
    return NextResponse.json(
      { message: 'Failed to fetch fitness plans' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      category,
      difficulty,
      duration,
      price,
      image,
      workouts
    } = await request.json()

    // Validation
    if (!title || !description || !category || !difficulty || !duration || price === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create fitness plan with workouts
    const fitnessPlan = await prisma.fitnessPlan.create({
      data: {
        title,
        description,
        category,
        difficulty,
        duration,
        price,
        image,
        workouts: {
          create: workouts?.map((workout: any, index: number) => ({
            title: workout.title,
            description: workout.description,
            duration: workout.duration,
            calories: workout.calories,
            order: index + 1,
            exercises: {
              create: workout.exercises?.map((exercise: any, exerciseIndex: number) => ({
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps,
                duration: exercise.duration,
                rest: exercise.rest,
                notes: exercise.notes,
                order: exerciseIndex + 1
              })) || []
            }
          })) || []
        }
      },
      include: {
        workouts: {
          include: {
            exercises: true
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    return NextResponse.json(fitnessPlan, { status: 201 })
  } catch (error) {
    console.error('Error creating fitness plan:', error)
    return NextResponse.json(
      { message: 'Failed to create fitness plan' },
      { status: 500 }
    )
  }
}