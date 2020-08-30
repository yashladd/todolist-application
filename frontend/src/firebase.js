import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyASX1DmiC5pYbRns0rCvqwiihZFXUexln0',
  authDomain: 'todolist-30f66.firebaseapp.com',
  databaseURL: 'https://todolist-30f66.firebaseio.com',
  projectId: 'todolist-30f66',
  storageBucket: 'todolist-30f66.appspot.com',
  messagingSenderId: '129665504611',
  appId: '1:129665504611:web:c3e42652891dc8ef28af56',
});

export { firebaseConfig as firebase };
