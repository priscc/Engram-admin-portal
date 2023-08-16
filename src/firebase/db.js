// import firebase from "firebase";
// import "firebase/firestore";

// // Your web app's Firebase configuration
// var firebaseConfig = {
// apiKey: "AIzaSyBYzz_YlFwSpC_gaFhz-CvQ_2YFATE49NQ",
// authDomain: "study-bites-1.firebaseapp.com",
// databaseURL: "https://study-bites-1.firebaseio.com",
// projectId: "study-bites-1",
// storageBucket: "study-bites-1.appspot.com",
// messagingSenderId: "1082808406479",
// appId: "1:1082808406479:web:532d872fa941eb7aba42ba"
// };
// // Initialize Firebase
// // export const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const db = firebase.initializeApp(firebaseConfig).firestore();

// Vuexfire setup

import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyDB3uRU_Ck5skQjN77N5jT-g4SM8XsuvCY",
        authDomain: "engram-site-dev.firebaseapp.com",
        projectId: "engram-site-dev",
        storageBucket: "engram-site-dev.appspot.com",
        messagingSenderId: "858331999177",
        appId: "1:858331999177:web:3d3856b68091c788ae5618"
    })
    .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });

// AuthState Persistence settings
export const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);