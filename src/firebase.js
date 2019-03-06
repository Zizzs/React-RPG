import firebaseConfig from '../firebaseKeys';
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();

export const userDataRef = databaseRef.child('users');
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();