import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT8QuZRwdA9Zss-TfRp2qMFgGPPnQKjDk",
  authDomain: "ecommerce-image-store-1d566.firebaseapp.com",
  projectId: "ecommerce-image-store-1d566",
  storageBucket: "ecommerce-image-store-1d566.appspot.com",
  messagingSenderId: "738263283556",
  appId: "1:738263283556:web:adb5164e6d07ba2791ec71"
};


const app = initializeApp(firebaseConfig);
export const imagedb = getStorage(app);
