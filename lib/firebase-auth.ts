import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebase"
import { z } from "zod"

// User profile interface
export interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  fitnessLevel: "beginner" | "intermediate" | "advanced" | "athlete"
  goals: "weight-loss" | "muscle-gain" | "endurance" | "strength" | "general"
  photoURL?: string
  createdAt: any
  updatedAt: any
  lastLogin?: any
}

// Validation schemas
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

// Register a new user
export async function registerUser(data: z.infer<typeof registerSchema>) {
  try {
    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    const user = userCredential.user

    // Update profile with display name
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
      photoURL: user.photoURL || undefined,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    return { user, profile: userProfile }
  } catch (error: any) {
    console.error("Registration error:", error)
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email address is already in use")
    }
    throw error
  }
}

// Sign in user
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update last login
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp(),
    })

    return user
  } catch (error: any) {
    console.error("Login error:", error)
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      throw new Error("Invalid email or password")
    }
    throw error
  }
}

// Sign out user
export async function logoutUser() {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Logout error:", error)
    throw error
  }
}

// Send password reset email
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    console.error("Password reset error:", error)
    if (error.code === "auth/user-not-found") {
      // Don't reveal if email exists for security
      return
    }
    throw error
  }
}

// Get user profile from Firestore
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, "users", userId))
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Get user profile error:", error)
    throw error
  }
}

// Update user profile
export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Update user profile error:", error)
    throw error
  }
}

// Google Sign In
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user profile exists
    const profileDoc = await getDoc(doc(db, "users", user.uid))

    if (!profileDoc.exists()) {
      // Create profile for new Google user
      const names = user.displayName?.split(" ") || ["", ""]
      const userProfile: UserProfile = {
        id: user.uid,
        username: user.email?.split("@")[0] || "",
        email: user.email || "",
        firstName: names[0] || "",
        lastName: names[1] || "",
        fitnessLevel: "beginner",
        goals: "general",
        photoURL: user.photoURL || undefined,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      }

      await setDoc(doc(db, "users", user.uid), userProfile)
    } else {
      // Update last login
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: serverTimestamp(),
      })
    }

    return user
  } catch (error) {
    console.error("Google sign in error:", error)
    throw error
  }
}
