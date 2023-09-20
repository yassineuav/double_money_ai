import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBQHEA2PhVh8Mzqev5pDQ0EvKkbDYaATUI",
  authDomain: "mygoal-1628a.firebaseapp.com",
  databaseURL: "https://mygoal-1628a-default-rtdb.firebaseio.com",
  projectId: "mygoal-1628a",
  storageBucket: "mygoal-1628a.appspot.com",
  messagingSenderId: "938466374718",
  appId: "1:938466374718:web:21916fb661f4739b080d6f",
  measurementId: "G-WMZPZF8XK8"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app);
export default firebase_app;
