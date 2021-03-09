import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import Filter from 'bad-words'

import {ref, onUnmounted, computed} from 'vue'

var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

export function useAuth(){
    const user = ref(null)
    const unsubscribe = auth.onAuthStateChanged(_user=>(user.value = _user))
    onUnmounted(unsubscribe)
    const isLogin = computed(() => user.value != null)

    const signIn = async () =>{ 
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(googleProvider)
    }

    const signOut = () => auth.signOut()

    return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
const filter = new Filter()

export function useChat(){
    const messages = ref([])
    messagesQuery.onSnapshot(snapshot =>{
        messages.value = snapshot.docs
        .map(doc => ({id: doc.id, ...doc.data()}))
        .reverse()
    })
    onUnmounted(unsubscribe)

    const {user, isLogin} = useAuth()
    const sendMessage = text => {
        if(!isLogin.value) return
        const {photoURL, uid, displayName} = user.value
        messagesCollection.add({
            userName: displayName,
            userId: uid,
            userPhotoURL: photoURL,
            text: filter.clean(text),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return{messages, sendMessage}
}