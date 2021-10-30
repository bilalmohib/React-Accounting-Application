import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v9.0 and later, measurementId is optional

try {
    const firebaseConfig = {
        apiKey: "AIzaSyCjVhAO2Rdwpvsv90pGvC-PgSwtlP--mpc",
        authDomain: "react-accounting-270fe.firebaseapp.com",
        databaseURL: "https://react-accounting-270fe-default-rtdb.firebaseio.com",
        projectId: "react-accounting-270fe",
        storageBucket: "react-accounting-270fe.appspot.com",
        messagingSenderId: "261795833393",
        appId: "1:261795833393:web:d25bd14c3a47c6f0991710",
        measurementId: "G-X3M8CNERZE"
    };
    // Initialize Firebase    
    firebase.initializeApp(firebaseConfig);
    // firebase.firestore().settings({timesstampsInSnapshots:true}) 
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.log(`Firebase didnt initialize correctly: ${error.message}`)
    }
}

const storage = firebase.storage();

export {
    storage,
    firebase as default
}