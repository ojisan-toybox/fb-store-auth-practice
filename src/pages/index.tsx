import * as React from "react";
import firebase from "firebase";
import "firebase/auth";

export default () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBsnBzm88C0AF0udB5JFgeZQWwJwZ_QwOk",
    authDomain: "transaction-hooks.firebaseapp.com",
    databaseURL: "https://transaction-hooks.firebaseio.com",
    projectId: "transaction-hooks",
    storageBucket: "transaction-hooks.appspot.com",
    messagingSenderId: "695871652141",
    appId: "1:695871652141:web:1bfe110a7f2459b4c213a4",
  };
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  React.useEffect(() => {}, []);
  return <div>aaaaa</div>;
};
