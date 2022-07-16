// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
// 
}

let app;
if(firebase.apps.length=== 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app= firebase.app();
}
const auth= firebase.auth();

var db = firebase.firestore();
export default db;
export {auth};
// Initialize Firebase

// const analytics = getAnalytics(app);