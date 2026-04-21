<script setup>
import { watch, ref } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useGlobalStore } from "../stores/global";
import { useRouter } from 'vue-router';
import api from "../api";
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const email = ref("");
const password = ref("");
const isEnabled = ref(false);
const emailTouched = ref(false);
const passwordTouched = ref(false);
const { setUser } = useGlobalStore();

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'bottom'
  },
  types: [
    {
      type: 'success',
      background: '#198754'
    },
    {
      type: 'error',
      background: '#dc3545'
    }
  ]
});

watch([email, password], (currentValue) => {
  isEnabled.value = currentValue.every(input => input !== "");
});

async function handleSubmit(e) {
  e.preventDefault();
  emailTouched.value = true;
  passwordTouched.value = true;
  try {
    let res = await api.post('/users/login', {
      email: email.value,
      password: password.value
    });
    if (res.data.access) {
      const decodedToken = jwtDecode(res.data.access);

      // ✅ Save all values to localStorage
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("isAdmin", decodedToken.isAdmin);
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("id", decodedToken.id);

      // ✅ Pass all 3 values to setUser
      setUser(decodedToken.email, decodedToken.isAdmin, decodedToken.id);

      notyf.success("Login Successful");
      email.value = "";
      password.value = "";
      router.push({ path: "/products" });
    }
  } catch (err) {
    console.log(err);
    const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.response?.data?.msg ||
      "Login Failed. Please contact administrator.";
    notyf.error(`${msg}`);
  }
}
</script>

<template>
  <div class="container-fluid text-center">
    <h1 class="my-5 text-primary">Login</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-md-5 border rounded-3 mx-auto p-5">
        <form @submit="handleSubmit">
          <div class="mb-3 text-start">
            <label class="form-label">Email Address</label>
            <input
              type="email"
              :class="['form-control', emailTouched && !email ? 'is-invalid' : '']"
              v-model="email"
              @blur="emailTouched = true"
            />
            <div class="invalid-feedback">Email is required.</div>
          </div>
          <div class="mb-3 text-start">
            <label class="form-label">Password</label>
            <input
              type="password"
              :class="['form-control', passwordTouched && !password ? 'is-invalid' : '']"
              v-model="password"
              @blur="passwordTouched = true"
            />
            <div class="invalid-feedback">Password is required.</div>
          </div>
          <div>
            <button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">Login</button>
            <button type="submit" class="btn btn-danger btn-block" v-else disabled>Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
