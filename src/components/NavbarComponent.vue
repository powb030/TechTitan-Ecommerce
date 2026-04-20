<script setup>
import { useGlobalStore } from "../stores/global";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const globalStore = useGlobalStore();
const user = globalStore.user;

onMounted(() => {
  console.log("full user object:", JSON.stringify(globalStore.user));
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top custom-navbar shadow">
    <div class="container">
      
      <!-- Brand -->
      <router-link class="navbar-brand fw-bold brand-text" :to="{ name: 'Home' }">
        ⚡ TechTitan
      </router-link>

      <!-- Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">

          <router-link class="nav-link custom-link" :to="{ name: 'Products' }">
            Products
          </router-link>

          <router-link
            class="nav-link custom-link"
            :to="{ name: 'AdminDashboard' }"
            v-if="user.isAdmin"
          >
            Admin
          </router-link>

          <router-link
            class="nav-link custom-link"
            :to="{ name: 'ViewCart' }"
            v-if="user.email"
          >
            🛒 Cart
          </router-link>

          <!-- Orders link styled consistently -->
          <router-link 
            class="nav-link nav-link-tech" 
            :to="{ name: 'Orders' }" 
            v-if="user.email"
          >
            Orders
          </router-link>

          <router-link
            class="nav-link custom-link"
            :to="{ name: 'Logout' }"
            v-if="user.email"
          >
            Logout
          </router-link>

          <router-link
            class="nav-link custom-link"
            :to="{ name: 'Login' }"
            v-if="!user.email"
          >
            Login
          </router-link>

          <router-link
            class="nav-link custom-link btn-register"
            :to="{ name: 'Register' }"
            v-if="!user.email"
          >
            Register
          </router-link>

        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/*  Navbar Background */
.custom-navbar {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  backdrop-filter: blur(10px);
}

/*  Brand Style */
.brand-text {
  font-size: 1.5rem;
  letter-spacing: 1px;
  color: #00f7ff !important;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
  transition: 0.3s ease;
}

.brand-text:hover {
  color: #ffffff !important;
  text-shadow: 0 0 15px #00f7ff;
}

/* 🔗 Nav Links */
.custom-link {
  color: #e0e0e0 !important;
  margin-left: 15px;
  position: relative;
  transition: 0.3s ease;
}

/* Hover animation underline */
.custom-link::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background: #00f7ff;
  left: 0;
  bottom: 0;
  transition: 0.3s ease;
}

.custom-link:hover {
  color: #00f7ff !important;
}

.custom-link:hover::after {
  width: 100%;
}

/*  Register Button */
.btn-register {
  border: 1px solid #00f7ff;
  border-radius: 20px;
  padding: 5px 12px;
}

.btn-register:hover {
  background: #00f7ff;
  color: #000 !important;
  box-shadow: 0 0 10px #00f7ff;
}

/*  Cart Icon Animation */
.custom-link:hover {
  transform: translateY(-2px);
}

/* Nav links theme for TechTitan */
.nav-link-tech {
  color: #e0e0e0; /* light gray text */
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  font-weight: 500;
}

.nav-link-tech:hover {
  color: #00f7ff; /* cyan neon on hover */
  text-shadow: 0 0 6px #00f7ff;
}

/* Optional underline animation on hover */
.nav-link-tech::after {
  content: '';
  display: block;
  width: 0%;
  height: 2px;
  background: #00f7ff;
  transition: width 0.3s ease;
  position: absolute;
  bottom: 0;
  left: 0;
}

.nav-link-tech:hover::after {
  width: 100%;
}
</style>