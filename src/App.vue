<script>
  import NavbarComponent from './components/NavbarComponent.vue';
  import { useGlobalStore } from "./stores/global"; 
  import { onBeforeMount } from "vue"; 
  export default {
    components: {
      NavbarComponent,
    },
    setup(){
      const { setUser } = useGlobalStore();
      
      onBeforeMount(() => {
        setUser(
          localStorage.getItem("email"),
          localStorage.getItem("isAdmin") === "true",  // ✅ restores isAdmin as boolean
          localStorage.getItem("id")                    // ✅ restores id
        );
      });
    }
  }
</script>

<template>
  <NavbarComponent />
  <!-- <BannerComponent /> -->
  <router-view />
</template>

<style scoped>
</style>
