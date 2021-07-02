import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyDWjb_ozyUIa_FDX7h81acSZ8HqbKXjsAw",
	authDomain: "speakify-01.firebaseapp.com",
	projectId: "speakify-01",
	storageBucket: "speakify-01.appspot.com",
	messagingSenderId: "646393886333",
	appId: "1:646393886333:web:2f181f2fa24d916775e314",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();


  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db , auth, provider};
