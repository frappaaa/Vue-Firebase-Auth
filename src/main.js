import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyATI7RzkFl7GSB224rfKcCW9ceW1Wj6sUw",
    authDomain: "budget-app-da9b5.firebaseapp.com",
    projectId: "budget-app-da9b5",
    storageBucket: "budget-app-da9b5.appspot.com",
    messagingSenderId: "512478554191",
    appId: "1:512478554191:web:0097b12b63f4908315223a",
    measurementId: "G-WDRB9NQZ6K"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


createApp(App).use(store).use(router).mount('#app')
