//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyB3JOVVPQik8hDVWaCGc0LqjiLEBAqE3Ls",
    authDomain: "practice-2c4d3.firebaseapp.com",
    projectId: "practice-2c4d3",
    storageBucket: "practice-2c4d3.appspot.com",
    messagingSenderId: "690586083480",
    appId: "1:690586083480:web:36f35ac527a5deeb01b0ed"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();