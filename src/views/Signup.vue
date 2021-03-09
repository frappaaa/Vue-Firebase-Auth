<template>
  <div class="form-signup">
    <div class=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea un nuovo account
          </h2>
        </div>
        <form
          class="mt-8 space-y-6"
          action="#"
          method="POST"
          @submit.prevent="signupUser"
        >
          <input
            type="hidden"
            name="remember"
            value="true"
          >
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label
                for="name"
                class="sr-only"
              >Nome completo</label>
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome completo"
                v-model="name"
              >
            </div>
            <div>
              <label
                for="email-address"
                class="sr-only"
              >Indirizzo Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                v-model="email"
              >
            </div>
            <div>
              <label
                for="password"
                class="sr-only"
              >Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                v-model="password"
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label
                for="remember_me"
                class="ml-2 block text-sm text-gray-900"
              >
                Ricardami
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Hai dimenticato la password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: lock-closed -->
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Registrati
            </button>
          </div>
        </form>
        <div class="grid grid-flow-col grid-cols-2 gap-4">
          <button
            @click="loginGitHub"
            class="group relative w-full flex justify-center p-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img
              src="https://s.svgbox.net/social.svg?ic=github&fill=ffffff"
              width="35"
              height="35"
              class="m-auto"
            >
          </button>
          <button
            @click="loginGoogle"
            class="group relative w-full flex justify-center p-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img
              src="https://s.svgbox.net/social.svg?ic=google&fill=ffffff"
              width="35"
              height="35"
              class="m-auto"
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

var github = new firebase.auth.GithubAuthProvider();
var google = new firebase.auth.GoogleAuthProvider();

export default {
  name: "Signup",
  data() {
    return {
      name:"",
      email: "",
      password: "",
    };
  },
  methods: {
    signupUser: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user.data);
          },
          (err) => {
            alert(err);
          }
        );
    },
    loginGitHub: function () {
      firebase
        .auth()
        .signInWithPopup(github)
        .then(function (result) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    loginGoogle: function () {
      firebase
        .auth()
        .signInWithPopup(google)
        .then(function (result) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>