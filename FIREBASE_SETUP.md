# Firebase Setup Guide for Wellnity AI

This guide will help you set up Firebase for the Wellnity AI application.

## Prerequisites

- A Google account
- Node.js installed on your machine

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "Wellnity AI")
4. Enable or disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "Wellnity Web App")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 3: Enable Authentication

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in providers:
   - **Email/Password**: Click, toggle "Enable", and save
   - **Google** (optional): Click, toggle "Enable", configure OAuth consent, and save

## Step 4: Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll add security rules later)
4. Select your preferred Cloud Firestore location
5. Click "Enable"

### Add Security Rules

After creating the database, add these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Workouts collection
    match /workouts/{workoutId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

## Step 5: Set Up Storage

1. In the Firebase Console, go to "Storage"
2. Click "Get started"
3. Choose "Start in production mode"
4. Select your storage location
5. Click "Done"

### Add Storage Rules

Add these security rules for Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 6: Configure Environment Variables

1. Copy your Firebase configuration from the Firebase Console
2. Update your `.env.local` file with the following values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 7: Install Dependencies

Run the following command to install Firebase:

```bash
npm install
```

## Step 8: Test Your Setup

1. Start your development server: `npm run dev`
2. Try to register a new user
3. Check the Firebase Console to see if:
   - The user appears in Authentication
   - The user profile is created in Firestore
   - You can upload files to Storage

## Firebase Services Integrated

### Authentication
- Email/Password authentication
- Google Sign-In (optional)
- Password reset functionality
- User session management

### Firestore Database
- User profiles
- Workout tracking
- Exercise logging
- Statistics and analytics

### Storage
- Profile photo uploads
- Workout video uploads
- File management

## Security Best Practices

1. **Never commit your `.env.local` file** - It contains sensitive credentials
2. **Enable Firebase App Check** for production to prevent abuse
3. **Review and test security rules** before deploying to production
4. **Use environment variables** for all sensitive configuration
5. **Enable multi-factor authentication** for admin accounts

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that all environment variables are set correctly
   - Restart your development server after updating `.env.local`

2. **"Missing or insufficient permissions"**
   - Review your Firestore security rules
   - Ensure the user is authenticated before accessing protected data

3. **"Storage upload failed"**
   - Check Storage security rules
   - Verify file size limits (default: 5MB)

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage Guide](https://firebase.google.com/docs/storage)

## Support

For issues related to Firebase setup, please refer to the [Firebase Support](https://firebase.google.com/support) page.
