// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNtZDx12ivhJZKPbLsyxDnnmfsTU0NV3M",
  authDomain: "fir-blog-app-127d9.firebaseapp.com",
  projectId: "fir-blog-app-127d9",
  storageBucket: "fir-blog-app-127d9.appspot.com",
  messagingSenderId: "323095258221",
  appId: "1:323095258221:web:9fb0a63391595d103b0b64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    console.log(err);
  }
};
