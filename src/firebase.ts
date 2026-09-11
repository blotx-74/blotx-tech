import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDJYtFDQ_NqeJ2rBQuOKe2gdDofYk8B6Jk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'taht-el-balata.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'taht-el-balata',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'taht-el-balata.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '750800732344',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:750800732344:web:609c6cfdac43ba5aed744d'
};

import defaultConfig from './config/website_config.json';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const subscribeToConfig = (callback: (data: any) => void) => {
  // Immediately dispatch default config for instant render
  callback(defaultConfig);

  // Subscribe to public Firestore path permitted by firestore.rules
  try {
    return onSnapshot(
      doc(db, 'app_config', 'website_config'),
      (snapshot) => {
        if (snapshot.exists()) {
          const firestoreData = snapshot.data();
          const merged = {
            ...defaultConfig,
            ...firestoreData,
            colors: { ...defaultConfig.colors, ...(firestoreData.colors || {}) },
            typography: { ...defaultConfig.typography, ...(firestoreData.typography || {}) },
            images: { ...defaultConfig.images, ...(firestoreData.images || {}) },
            mockupScreens: { ...defaultConfig.mockupScreens, ...(firestoreData.mockupScreens || {}) },
            content: { ...defaultConfig.content, ...(firestoreData.content || {}) }
          };
          callback(merged);
        }
      },
      () => {
        // Completely silent fallback to local configuration
      }
    );
  } catch {
    // Completely silent fallback on any initialization/network error
    return () => {};
  }
};

