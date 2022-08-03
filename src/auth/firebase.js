// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
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
    //? firebase method to create a new user
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? firebase method to update an user profile
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    console.log(userCredential);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signUpProvider = async (navigate) => {
  try {
    //? firebase method to enable entering via google
    const provider = new GoogleAuthProvider();
    let userCredential = await signInWithPopup(auth, provider);
    console.log(userCredential);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const userObserver = (setCurrUser) => {
  //? Firebase method that tracks if the user is logged in or not and returns a response
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setCurrUser(user);
    } else {
      // User is signed out
      // ...
    }
  });
};
