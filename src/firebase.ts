import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJYtFDQ_NqeJ2rBQuOKe2gdDofYk8B6Jk',
  authDomain: 'taht-el-balata.firebaseapp.com',
  projectId: 'taht-el-balata',
  storageBucket: 'taht-el-balata.firebasestorage.app',
  messagingSenderId: '750800732344',
  appId: '1:750800732344:web:609c6cfdac43ba5aed744d'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const subscribeToConfig = (callback: (data: any) => void) => {
  return onSnapshot(
    doc(db, 'global_config', 'settings'),
    (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    },
    (_error) => {
      // Silent graceful fallback to local defaults when unauthenticated or offline
    }
  );
};
