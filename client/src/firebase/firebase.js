// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAw-3VnPvnHlI93wMn4KxsnIyHyMajBleU',
  authDomain: 'cine-city-73b00.firebaseapp.com',
  projectId: 'cine-city-73b00',
  storageBucket: 'cine-city-73b00.appspot.com',
  messagingSenderId: '222028614883',
  appId: '1:222028614883:web:e9f6457d05d6c00daa09d6',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
