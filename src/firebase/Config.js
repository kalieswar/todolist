import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD_xVCK_s6GMBW9gEEa8YBY2Jo7qPcjAMc",
    authDomain: "my-project-288ce.firebaseapp.com",
    projectId: "my-project-288ce",
    storageBucket: "my-project-288ce.appspot.com",
    messagingSenderId: "1042751467356",
    appId: "1:1042751467356:web:6b348f466072121606db99"
  };

const firebase = initializeApp(firebaseConfig)

 const myStore = getFirestore(firebase)

 export {myStore}