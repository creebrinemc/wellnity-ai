# Firebase Setup Guide for Wellnity AI

This guide will help you configure Firebase for your Wellnity AI application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Authentication

1. In Firebase Console, go to **Build** > **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** authentication
4. (Optional) Enable other sign-in methods like Google, Apple, etc.

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** or **Test mode**
   - Production mode: Requires security rules (recommended)
   - Test mode: Open access (only for development)
4. Select your database location (choose closest to your users)

## Step 4: Set Up Security Rules

Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Allow users to read and write their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow admins to read all user data (optional)
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Workouts collection (example)
    match /workouts/{workoutId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 5: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (</>)
4. Register your app with a nickname (e.g., "Wellnity AI Web")
5. Copy the Firebase configuration object

## Step 6: Update Environment Variables

Update your `.env.local` file with the Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Step 7: (Optional) Set Up Firebase Admin SDK

For server-side operations:

1. In Firebase Console, go to **Project Settings** > **Service Accounts**
2. Click **Generate new private key**
3. Save the JSON file securely
4. Add to `.env.local` as a single-line JSON string:

```bash
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project-id",...}'
```

## Step 8: Install Dependencies

The Firebase packages are already added to package.json. Run:

```bash
npm install
```

## Step 9: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Try registering a new user at `/signup`
3. Check Firebase Console > Authentication to see the new user
4. Check Firebase Console > Firestore to see the user profile document

## Features Enabled

- User registration with email/password
- User authentication
- User profile storage in Firestore
- Password reset via email
- Secure user data access with Firestore rules

## Database Collections

### users
Stores user profile information:
- `id`: User ID (matches Firebase Auth UID)
- `username`: Unique username
- `email`: User email
- `firstName`: First name
- `lastName`: Last name
- `fitnessLevel`: Fitness level (beginner/intermediate/advanced/athlete)
- `goals`: Fitness goals
- `createdAt`: Account creation timestamp
- `lastLogin`: Last login timestamp
- `isEmailVerified`: Email verification status

## Security Best Practices

1. Never commit `.env.local` to version control
2. Keep your service account key secure
3. Use Firebase Security Rules to protect data
4. Enable App Check for additional security (optional)
5. Set up Firebase Analytics for monitoring (optional)

## Troubleshooting

### Error: "Firebase: Error (auth/api-key-not-valid)"
- Check that your API key is correct in `.env.local`
- Ensure you've enabled the Authentication service

### Error: "Missing or insufficient permissions"
- Check your Firestore security rules
- Ensure the user is authenticated

### Error: "Firebase app not initialized"
- Restart your development server after updating environment variables
- Check that all required environment variables are set

## Next Steps

- Set up Firebase Storage for profile pictures and workout videos
- Add Firebase Cloud Functions for server-side logic
- Enable Firebase Analytics for user insights
- Set up Firebase Hosting for deployment
- Add Firebase Performance Monitoring

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs).
