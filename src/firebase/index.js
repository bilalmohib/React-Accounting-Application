import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v9.0 and later, measurementId is optional

try {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_authDomain,
        //databaseURL: process.env.REACT_APP_databaseURL,
        projectId:  process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId
        //measurementId:  process.env.REACT_APP_measurementId
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