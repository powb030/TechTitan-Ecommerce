<script setup>

    import { onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    //import useRouter from vue-router to import our router and be able to access it's redirecting methods.
    import { useRouter } from 'vue-router';

    const {setUser} = useGlobalStore();

    //useRouter() returns our configurated router as an object with different methods for page navigation.
    const router = useRouter()
    
    //This will run before the component is displayed
    onBeforeMount(()=>{

        //clears the localStorage
        localStorage.clear();

        //update the global user state's email property to it's initial value.
        setUser(null);

        //redirect the user to the login page without refreshing the page.
        router.push({path: "/login"});

        //Allows us to redirect the user.
        // window.location.href = "/login"

    })
</script>

<!-- Add empty template to avoid a vue warning. -->
<template>
</template>