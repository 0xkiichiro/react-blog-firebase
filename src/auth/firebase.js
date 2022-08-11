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
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
  get,
  child,
} from "firebase/database";
import { useEffect, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastConfig";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
    toastSuccessNotify("Success! New user created!");
    navigate("/");
  } catch (err) {
    toastErrorNotify(err);
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
    toastSuccessNotify("Welcome back!");
    navigate("/");
  } catch (err) {
    toastErrorNotify(err);
    console.log(err);
  }
};

export const signUpProvider = async (navigate) => {
  try {
    //? firebase method to enable entering via google
    const provider = new GoogleAuthProvider();
    let userCredential = await signInWithPopup(auth, provider);
    console.log(userCredential);
    toastSuccessNotify("Hello dear guest from google!");
    navigate("/");
  } catch (err) {
    toastErrorNotify("There is a error");
    console.log(err);
  }
};

export const userObserver = (setCurrUser) => {
  //? firebase method that tracks if the user is logged in or not and returns a response
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user);
    } else {
      setCurrUser(false);
    }
  });
};

export const logOut = (navigate) => {
  //? firebase method to logout
  signOut(auth);
  toastSuccessNotify("Sad to see you go 🙁");
  navigate("/");
};

//* firebase realtime database functions

const database = getDatabase();

export const addBlogPost = (post) => {
  const db = getDatabase();
  set(ref(db, "blog/" + post.blogId), {
    title: post.title,
    imgUrl: post.imgUrl,
    content: post.content,
    postTime: post.postTime,
    owner: post.owner,
    likes: post.likes,
    comments: post.comments,
  });
  toastSuccessNotify("New post!");
};

export const useFetchBlogPosts = () => {
  const [loading, setLoading] = useState(true);
  const [fetchedBlogs, setFetchedBlogs] = useState();

  useEffect(() => {
    const db = getDatabase();
    const blogPostRef = ref(db, "blog");
    onValue(blogPostRef, (snapshot) => {
      const data = snapshot.val();
      const blogPostArr = [];

      for (let id in data) {
        blogPostArr.push({ id, ...data[id] });
      }
      setFetchedBlogs(blogPostArr);
      setLoading(false);
    });
  }, []);
  return { loading, fetchedBlogs };
};

export const handleDelete = (id) => {
  const db = getDatabase();
  // const userRef = ref(db, "users/");
  remove(ref(db, "blog/" + id));
  toastSuccessNotify("We've deleted your post as you asked!");
};

export const handleLike = (post, like) => {
  const db = getDatabase();
  const updates = {};
  updates[`/blog/${post.id}/likes/`] = post.likes + like;
  return update(ref(db), updates);
};

export const handleComment = (post, comment, user) => {
  const db = getDatabase();
  const updates = {};
  updates[`/blog/${post.id}/comments/`] = [
    ...post.comments,
    `${user}: ${comment}`,
  ];
  toastSuccessNotify("New comment! Go to the mainpage to fetch!");
  return update(ref(db), updates);
};

export const readPost = (postId) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `blog/${postId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
