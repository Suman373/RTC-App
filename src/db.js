//importing app from the firebase
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
    //API keys
    apiKey: "AIzaSyD7LtqrzwtyulQrU1z7o7JC4q207IXKvXI",
    authDomain: "firechat-app-6fa92.firebaseapp.com",
    projectId: "firechat-app-6fa92",
    databaseURL:"https://firechat-app-6fa92-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "firechat-app-6fa92.appspot.com",
    messagingSenderId: "555802385871",
    appId: "1:555802385871:web:c4ab2db75635b6432046ba"
}

const db = firebase.initializeApp(config);
export default db;
