import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { format, startOfDay, endOfDay } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let where: any = {
      userId: session.user.id
    }

    if (dateParam) {
      // Get nutrition logs for a specific date
      const targetDate = new Date(dateParam)
      where.loggedAt = {
        gte: startOfDay(targetDate),
        lte: endOfDay(targetDate)
      }
    } else if (startDate && endDate) {
      // Get nutrition logs for a date range
      where.loggedAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    } else {
      // Default to today
      const today = new Date()
      where.loggedAt = {
        gte: startOfDay(today),
        lte: endOfDay(today)
      }
    }

    const nutritionLogs = await prisma.nutritionLog.findMany({
      where,
      orderBy: { loggedAt: 'asc' }
    })

    // Calculate daily totals
    const totals = nutritionLogs.reduce((acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fats: acc.fats + log.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

    // Group by meal type
    const mealGroups = {
      BREAKFAST: nutritionLogs.filter(log => log.mealType === 'BREAKFAST'),
      LUNCH: nutritionLogs.filter(log => log.mealType === 'LUNCH'),
      DINNER: nutritionLogs.filter(log => log.mealType === 'DINNER'),
      SNACK: nutritionLogs.filter(log => log.mealType === 'SNACK')
    }

    return NextResponse.json({
      logs: nutritionLogs,
      totals,
      mealGroups
    })
  } catch (error) {
    console.error('Error fetching nutrition logs:', error)
    return NextResponse.json(
      { message: 'Failed to fetch nutrition logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const {
      foodName,
      calories,
      protein,
      carbs,
      fats,
      quantity,
      unit,
      mealType,
      loggedAt
    } = await request.json()

    // Validation
    if (!foodName || calories === undefined || protein === undefined || 
        carbs === undefined || fats === undefined || !quantity || !unit || !mealType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].includes(mealType)) {
      return NextResponse.json(
        { message: 'Invalid meal type' },
        { status: 400 }
      )
    }

    const nutritionLog = await prisma.nutritionLog.create({
      data: {
        userId: session.user.id,
        foodName,
        calories,
        protein,
        carbs,
        fats,
        quantity,
        unit,
        mealType,
        loggedAt: loggedAt ? new Date(loggedAt) : new Date()
      }
    })

    return NextResponse.json(nutritionLog, { status: 201 })
  } catch (error) {
    console.error('Error creating nutrition log:', error)
    return NextResponse.json(
      { message: 'Failed to create nutrition log' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Nutrition log ID is required' },
        { status: 400 }
      )
    }

    const {
      foodName,
      calories,
      protein,
      carbs,
      fats,
      quantity,
      unit,
      mealType
    } = await request.json()

    // Check if the nutrition log belongs to the user
    const existingLog = await prisma.nutritionLog.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingLog) {
      return NextResponse.json(
        { message: 'Nutrition log not found' },
        { status: 404 }
      )
    }

    const updatedLog = await prisma.nutritionLog.update({
      where: { id },
      data: {
        foodName: foodName ?? existingLog.foodName,
        calories: calories ?? existingLog.calories,
        protein: protein ?? existingLog.protein,
        carbs: carbs ?? existingLog.carbs,
        fats: fats ?? existingLog.fats,
        quantity: quantity ?? existingLog.quantity,
        unit: unit ?? existingLog.unit,
        mealType: mealType ?? existingLog.mealType
      }
    })

    return NextResponse.json(updatedLog)
  } catch (error) {
    console.error('Error updating nutrition log:', error)
    return NextResponse.json(
      { message: 'Failed to update nutrition log' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Nutrition log ID is required' },
        { status: 400 }
      )
    }

    // Check if the nutrition log belongs to the user
    const existingLog = await prisma.nutritionLog.findFirst({
      where: {
        id,
        userId: session.user.id
      }
    })

    if (!existingLog) {
      return NextResponse.json(
        { message: 'Nutrition log not found' },
        { status: 404 }
      )
    }

    await prisma.nutritionLog.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Nutrition log deleted successfully' })
  } catch (error) {
    console.error('Error deleting nutrition log:', error)
    return NextResponse.json(
      { message: 'Failed to delete nutrition log' },
      { status: 500 }
    )
  }
}