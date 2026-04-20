<script>
import BannerComponent from '../components/BannerComponent.vue';

export default {
  components: {
    BannerComponent,
  },
  data(){
    return {
      bannerProps: {
        title: "Welcome to TechTitan",
        tagline: "We provide high-quality computer parts, gadgets, and cutting-edge tech designed to power your digital lifestyle. From powerful processors and custom PC components to laptops, gaming gear, and smart devices — we’ve got everything you need to build, upgrade, and perform at your best.",
        destination: "Products",
        buttonLabel: "Explore Our Products"
      }
    }
  }
}
</script>

<template>
  <div class="home-wrapper">

    <div class="container text-center hero-section">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <BannerComponent :bannerProps="bannerProps" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/*  Full Background */
.home-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  display: flex;
  align-items: center;
}

/*  Hero Section */
.hero-section {
  padding: 60px 20px;
  animation: fadeIn 1s ease-in-out;
}

/*  Smooth Fade */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/*  Optional glow effect for text inside banner */
:deep(h1) {
  color: #00f7ff;
  text-shadow: 0 0 15px rgba(0, 247, 255, 0.6);
}

:deep(p) {
  color: #e0e0e0;
  font-size: 1.1rem;
}

/*  Button Enhancement (if Banner uses button) */
:deep(.btn) {
  border-radius: 30px;
  padding: 12px 26px;
  background: linear-gradient(135deg, #00f7ff, #007cf0);
  border: none;
  color: #000;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/*  Hover Effect */
:deep(.btn:hover) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.8);
  background: linear-gradient(135deg, #00d4ff, #005bea);
  color: #000;
}

/*  Click effect */
:deep(.btn:active) {
  transform: scale(0.95);
  box-shadow: 0 0 10px #00f7ff;
}
</style>