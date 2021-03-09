<template >
  <div class="h-screen">
    <Nav />
    <Chat />
  <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Chat from '@/components/Chat.vue'
export default {
  name: 'App',
  components: { Nav, Chat }
}
</script>

<style lang="scss">

</style>
