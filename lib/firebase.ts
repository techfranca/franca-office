// lib/firebase.ts

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase apenas no cliente
let app: FirebaseApp | null = null;
let database: Database | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (typeof window !== 'undefined') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  database = getDatabase(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Forçar seleção de conta sempre
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
}

export { database, auth, googleProvider };

// Tipos
export interface UserPresence {
  userId: string;
  userName: string;
  userPhoto?: string;
  roomId: string;
  status: string;
  timestamp: number;
}
