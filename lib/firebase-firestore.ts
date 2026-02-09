import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

// Workout interface
export interface Workout {
  id: string
  userId: string
  title: string
  type: string
  duration: number // minutes
  calories: number
  date: Timestamp
  exercises: Exercise[]
  notes?: string
  videoUrl?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number // seconds
}

// Create a new workout
export async function createWorkout(userId: string, workoutData: Omit<Workout, "id" | "userId" | "createdAt" | "updatedAt">) {
  try {
    const workoutRef = doc(collection(db, "workouts"))
    const workout: Workout = {
      id: workoutRef.id,
      userId,
      ...workoutData,
      date: workoutData.date || Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }

    await setDoc(workoutRef, workout)
    return workout
  } catch (error) {
    console.error("Create workout error:", error)
    throw error
  }
}

// Get user workouts
export async function getUserWorkouts(userId: string, limitCount: number = 50): Promise<Workout[]> {
  try {
    const q = query(collection(db, "workouts"), where("userId", "==", userId), orderBy("date", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    const workouts: Workout[] = []

    querySnapshot.forEach((doc) => {
      workouts.push(doc.data() as Workout)
    })

    return workouts
  } catch (error) {
    console.error("Get user workouts error:", error)
    throw error
  }
}

// Get workout by ID
export async function getWorkout(workoutId: string): Promise<Workout | null> {
  try {
    const docSnap = await getDoc(doc(db, "workouts", workoutId))
    if (docSnap.exists()) {
      return docSnap.data() as Workout
    }
    return null
  } catch (error) {
    console.error("Get workout error:", error)
    throw error
  }
}

// Update workout
export async function updateWorkout(workoutId: string, data: Partial<Workout>) {
  try {
    await updateDoc(doc(db, "workouts", workoutId), {
      ...data,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error("Update workout error:", error)
    throw error
  }
}

// Delete workout
export async function deleteWorkout(workoutId: string) {
  try {
    await deleteDoc(doc(db, "workouts", workoutId))
  } catch (error) {
    console.error("Delete workout error:", error)
    throw error
  }
}

// Get workout statistics
export async function getWorkoutStats(userId: string) {
  try {
    const workouts = await getUserWorkouts(userId, 1000)

    const totalWorkouts = workouts.length
    const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0)
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)

    return {
      totalWorkouts,
      totalCalories,
      totalDuration,
      averageCaloriesPerWorkout: totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0,
      averageDurationPerWorkout: totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0,
    }
  } catch (error) {
    console.error("Get workout stats error:", error)
    throw error
  }
}
