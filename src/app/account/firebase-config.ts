// src/app/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGFE86d3hkh8F-8Z7zwczxJQBdYiT7HFw",
  authDomain: "ivegtech.firebaseapp.com",
  projectId: "ivegtech",
  storageBucket: "ivegtech.appspot.com",
  messagingSenderId: "207575769080",
  appId: "1:207575769080:web:29ab6d1983e338c4d3c00d",
  measurementId: "G-LEW8LDW2BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize analytics only if supported
let analytics;
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { storage, analytics };
