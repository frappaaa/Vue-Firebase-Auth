<template>
  <header>
      <nav>
          <h1>Chat App w/ Vue</h1>
              <div class="login" v-if="isLogin">
                  <Avatar :src="user.photoURL"/>
                  <button class="text-gray-400 hover:text-white">Esci</button>
            </div>
        <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">Entra</button>

      </nav>
  </header>
</template>

<script>
import Avatar from './Avatar.vue'
import {useAuth} from '@/firebase'
export default {
    components:{Avatar},
    setup(){
        const {user, isLogin, signOut, signIn} = useAuth()
        return{user, isLogin, signOut, signIn}
    }
    
}
</script>

<style>

</style>