import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./firebase"

// Upload file to Firebase Storage
export async function uploadFile(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error("Upload file error:", error)
    throw error
  }
}

// Upload user profile photo
export async function uploadProfilePhoto(userId: string, file: File): Promise<string> {
  const path = `users/${userId}/profile-photo/${file.name}`
  return uploadFile(file, path)
}

// Upload workout video
export async function uploadWorkoutVideo(userId: string, file: File): Promise<string> {
  const timestamp = Date.now()
  const path = `users/${userId}/workouts/${timestamp}-${file.name}`
  return uploadFile(file, path)
}

// Delete file from Firebase Storage
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error("Delete file error:", error)
    throw error
  }
}
