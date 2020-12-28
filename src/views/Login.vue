<template>
  <div id="page-login">
    <form
      class="login"
      @submit.prevent="loginUser"
    >
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="email"
        placeholder="Email"
      >
      <label for="email">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="Password"
      >
      <input
        type="submit"
        value="Log in"
      >
    </form>
    <hr>

    <h3
      @click="loginGitHub"
      class="button-github"
    >Want to login with GitHub? Click here</h3>

    <h3
      @click="loginGoogle"
      class="button-google"
    >Want to login with Google? Click here</h3>

    <hr>
    <div class="signup-banner">
      <h3>Need an account?</h3>
      <router-link to="/signup">Sign Up</router-link>
    </div>

  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

var github = new firebase.auth.GithubAuthProvider();
var google = new firebase.auth.GoogleAuthProvider();

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginUser: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            alert(user);
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
#page-login {
  width: 500px;
  margin: auto;
  form {
    display: grid;
    place-content: center;
    grid-gap: 20px;
    input {
      border: 0;
      border-radius: 20px;
      padding: 10px 30px;
      &[type="submit"] {
        border-radius: 10px;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
  }
  .button-github,
  .button-google {
    border: 1px solid #000;
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
  }
}
</style>