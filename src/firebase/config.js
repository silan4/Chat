import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getAuth, GoogleAuthProvider} from "firebase/auth"

import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZNN_v991KjoRt2rnfdjs27UKPg-aE4dw",
  authDomain: "chat-13644.firebaseapp.com",
  projectId: "chat-13644",
  storageBucket: "chat-13644.appspot.com",
  messagingSenderId: "677263469116",
  appId: "1:677263469116:web:7af03583d835138ecfb139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// consoldaki authenitcaion bölümünün frekansını alır
export  const auth = getAuth(app);

// google sağlayıcısının referansını alma
export const provider = new GoogleAuthProvider();

// veri tabanının referansını alır
export const db  = getFirestore(app);