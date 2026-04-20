<script >
    // export default allows us to define components registration and its properties using either Options API or Composition API.
    // Options API was first used in VueJS development and is mostly used for small scaled applications. Composition API was introduced with VueJS3
    //Defining the props property using the Option API will allow our components to be completely reusable.
    // it will allow us to pass data from a parent component going to a child component
    export default {
      // props property is from the Options API that allow us to define the props that can be passed to a component.
      props: {
          // when defining the props of a component, add the name of the props and its data type
          // VueJS will check the data type of the value passsed a as prop to this component
          bannerProps: Object
      },
      // mounted() method that can be added wich is a function./method that will run when component is mounted.
      mounted(){
        console.log(this.bannerProps.tagline);
        console.log(this.bannerProps.title);
        // console.log(this.tagline)
      }
    }
</script>

<template>

  <div class="container-fluid">
    <div class="row mb-5 py-5 align-items-center justify-content-center text-center"  id="banner">
      <div class="col-md-10 p-5">
          <h1 class="mb-3">{{ bannerProps.title }}</h1>
          <p class="mb-5">
            {{ bannerProps.tagline }}
          </p>
          
          
          <router-link 
            class="btn btn-lg rounded-pill px-3"  
            :to="{ name: bannerProps.destination }"
            :style="{ backgroundColor: 'green', borderColor: 'green', color: 'white' }"
          >
            {{ bannerProps.buttonLabel }}
            <i class="bi bi-arrow-right"></i>
          </router-link>
          
        
      </div>
    </div>
  </div>
  
</template>

<style scoped>
  h1{
    font-family: sans-serif;
    font-style: bold;
    font-weight: 700;
    font-size: 48px;
  }
</style>
