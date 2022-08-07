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
} from "firebase/database";
import { useEffect, useState } from "react";

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
};

export const handleLike = (post, like) => {
  const db = getDatabase();
  const updates = {};
  updates[`/blog/${post.id}/likes/`] = post.likes + like;
  return update(ref(db), updates);
};
