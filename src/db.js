//importing app from the firebase
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
    //API keys and DB url goes here
   
}

const db = firebase.initializeApp(config);
export default db;
