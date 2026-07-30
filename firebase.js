import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBlnMbdWW6RMAciL298LAlNeINAVI1UX7w",
  authDomain: "mehendiganj.firebaseapp.com",
  projectId: "mehendiganj",
  storageBucket: "mehendiganj.firebasestorage.app",
  messagingSenderId: "152128721453",
  appId: "1:152128721453:web:903eeb629ed2ea6ec89ea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML Elements
const form = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

// Submit Review
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review").value;

  try {
    await addDoc(collection(db, "reviews"), {
      name,
      rating,
      review,
      date: new Date()
    });

    alert("Review submitted successfully!");
    form.reset();
    loadReviews();

  } catch (error) {
    alert(error.message);
    console.log(error);
  }
});

// Load Reviews
async function loadReviews() {
  reviewList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "reviews"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    reviewList.innerHTML += `
      <div class="review">
        <h4>${data.name}</h4>
        <p>⭐ ${data.rating}/5</p>
        <p>${data.review}</p>
      </div>
    `;
  });
}

loadReviews();
