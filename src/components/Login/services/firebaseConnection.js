import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {

    apiKey: "AIzaSyDL7ExN8oz3eiqLIdpQ3ewpPhsGFCssZSI",
  
    authDomain: "tarefas-8beef.firebaseapp.com",
  
    projectId: "tarefas-8beef",
  
    storageBucket: "tarefas-8beef.appspot.com",
  
    messagingSenderId: "1054216357637",
  
    appId: "1:1054216357637:web:9c0d09c02d7599362f596c"
  
  };
  

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;