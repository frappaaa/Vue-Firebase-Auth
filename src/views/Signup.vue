<template>
  <div class="form-signup">
    <form
      class="signup"
      @submit.prevent="signupUser"
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
      <h3>Already have an account?</h3>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
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
  },
};
</script>

<style lang="scss" scoped>
</style>