import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const FirebaseConfig = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyBfk88kVuhGGryeN7WrOnhaffKyWvxu89w",
    authDomain: "technoholic-a14a8.firebaseapp.com",
    databaseURL: "https://technoholic-a14a8-default-rtdb.firebaseio.com",
    projectId: "technoholic-a14a8",
    storageBucket: "technoholic-a14a8.appspot.com",
    messagingSenderId: "1007211602155",
    appId: "1:1007211602155:web:7c6c8c52cb9204dc89deae",
    measurementId: "G-SQ3QN2FXKV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return initializeApp(firebaseConfig);
}

export default FirebaseConfig;