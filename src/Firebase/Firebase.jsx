import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAoFq2qJcTCRJsxPtqS_ziZNQyAGlYl2Qk",
    authDomain: "app-c46f2.firebaseapp.com",
    databaseURL: "https://app-c46f2-default-rtdb.firebaseio.com",
    projectId: "app-c46f2",
    storageBucket: "app-c46f2.appspot.com",
    messagingSenderId: "1081289055509",
    appId: "1:1081289055509:web:6eb56d182b3501ca1b9d1c",
    databaseURL:"https://app-c46f2-default-rtdb.firebaseio.com/"
  };

  export const app = initializeApp(firebaseConfig)