import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class Firebase {
  private static _instance: Firebase;
  private _app: firebase.app.App;
  private _db: firebase.firestore.Firestore;
  private _auth: firebase.auth.Auth;

  private constructor() {
    // https://github.com/zeit/next.js/issues/1999#issuecomment-302244429
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBsnBzm88C0AF0udB5JFgeZQWwJwZ_QwOk",
        authDomain: "transaction-hooks.firebaseapp.com",
        databaseURL: "https://transaction-hooks.firebaseio.com",
        projectId: "transaction-hooks",
        storageBucket: "transaction-hooks.appspot.com",
        messagingSenderId: "695871652141",
        appId: "1:695871652141:web:1bfe110a7f2459b4c213a4",
      });
    }
    this._app = firebase.app();
    this._db = firebase.firestore();
    this._auth = firebase.auth();
  }

  init() {
    this.app;
    this.db;
    this.auth;
  }

  public static get instance(): Firebase {
    if (!this._instance) {
      this._instance = new Firebase();
    }
    return this._instance;
  }

  public get app() {
    if (this._app) {
      return this._app;
    } else {
      this._app = firebase.app();
    }
  }

  public get db() {
    if (this._db) {
      return this._db;
    } else {
      this._db = firebase.firestore();
      return this._db;
    }
  }

  public serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public get auth() {
    if (this._auth) {
      return this._auth;
    } else {
      this._auth = firebase.auth();
      return this._auth;
    }
  }
}
