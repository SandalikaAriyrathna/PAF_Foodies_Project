import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyBQa5JeYREzGweoKIr9jzdHYQZVsbIb-Hc',
  authDomain: 'instagram-9b003.firebaseapp.com',
  databaseURL: 'https://instagram-9b003-default-rtdb.firebaseio.com',
  projectId: 'instagram-9b003',
  storageBucket: 'instagram-9b003.appspot.com',
  messagingSenderId: '551798371157',
  appId: '1:551798371157:web:c64482ccaf5559b38f75dc',
  measurementId: 'G-K9JJFBDHX5',
});

const auth = firebase.auth();
const storage = firebase.storage();

export { storage, auth };
