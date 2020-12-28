<template>
  <div id="form-login">
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
    <div class="signup-banner">
      <h3>Need an account?</h3>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
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
            console.log(user.data);
          },
          (err) => {
            alert(err);
          }
        );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>