import { z } from "zod"
import bcrypt from "bcryptjs"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebase"

// User validation schemas
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced", "athlete"]),
  goals: z.enum(["weight-loss", "muscle-gain", "endurance", "strength", "general"]),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const passwordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
})

// Firebase user interface
export interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  fitnessLevel: string
  goals: string
  createdAt: any
  lastLogin?: any
  isEmailVerified: boolean
  photoURL?: string
  resetToken?: string
  resetTokenExpiry?: any
}

// Helper functions using Firebase
export async function createUser(data: z.infer<typeof registerSchema>) {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    const user = userCredential.user

    // Update display name
    await updateProfile(user, {
      displayName: `${data.firstName} ${data.lastName}`,
    })

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      id: user.uid,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fitnessLevel: data.fitnessLevel,
      goals: data.goals,
      createdAt: serverTimestamp(),
      isEmailVerified: user.emailVerified,
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    return userProfile
  } catch (error: any) {
    console.error("Create user error:", error)
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Bu e-posta adresi zaten kullanılıyor")
    }
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    // Firebase Auth doesn't provide a direct way to get user by email
    // We need to use Firebase Admin SDK or search Firestore
    // For now, return null as this is primarily used for existence checks
    return null
  } catch (error) {
    console.error("Get user error:", error)
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UserProfile
    }
    return null
  } catch (error) {
    console.error("Get user error:", error)
    return null
  }
}

export async function updateUser(id: string, data: Partial<UserProfile>) {
  try {
    const docRef = doc(db, "users", id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })

    return await getUserById(id)
  } catch (error) {
    console.error("Update user error:", error)
    throw new Error("User not found")
  }
}

export async function generateResetToken(email: string) {
  try {
    // Use Firebase's built-in password reset
    await sendPasswordResetEmail(auth, email)
    return "reset-email-sent"
  } catch (error: any) {
    console.error("Password reset error:", error)
    // Don't reveal if email exists or not for security
    return "reset-email-sent"
  }
}

export async function verifyResetToken(token: string) {
  // Firebase handles reset tokens internally
  // This function is kept for compatibility but not used with Firebase
  return null
}

// Sign in with Firebase
export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update last login
    await updateUser(user.uid, {
      lastLogin: serverTimestamp(),
    } as any)

    return user
  } catch (error: any) {
    console.error("Sign in error:", error)
    if (error.code === "auth/invalid-credential") {
      throw new Error("E-posta veya şifre hatalı")
    }
    throw error
  }
}
