
<script>
  // To be able to add a component into another component, in the script block, import the component 
  // The name of the component is the name of the file by default.
  // Add export default {} to be able to add the imported component in the root component.
  // import BannerComponent from './components/BannerComponent.vue';
  import NavbarComponent from './components/NavbarComponent.vue';

  import { useGlobalStore } from "./stores/global"; 
  import { onBeforeMount } from "vue"; 

  export default {
    components: {
      // BannerComponent,
      NavbarComponent,
      
    },

    // s63 karl ---------------------
    setup(){
      
      const { setUser } = useGlobalStore();
      
      onBeforeMount(() =>{
        setUser(localStorage.getItem("email"))
      });

    }

  }
</script>

<!-- Template: A block of HTML-like code that defines the structure of the component. -->
<template>
  <NavbarComponent />
  <!-- Banner component can be rendered in the page after import as its own html-like tag. -->
  <!-- <BannerComponent /> -->

  <router-view />
    

</template>

<!-- Style: A block of CSS code that defines the styling of the component. -->
<style scoped>
</style>