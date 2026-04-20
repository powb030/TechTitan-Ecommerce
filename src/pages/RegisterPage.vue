
<script setup>
import { watch, ref } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";

import api from "../api" //<<

const router = useRouter();
const store = useGlobalStore();

const firstName = ref("");
const lastName = ref("");
const mobileNo = ref("");
const email = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

const notyf = new Notyf();

watch([firstName, lastName, mobileNo, email, password, confirmPass], (currentValue) => {
  isEnabled.value =
    currentValue.every(input => input !== "") &&
    currentValue[4] === currentValue[5];
});

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await api.post("/users/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      mobileNo: mobileNo.value,
      email: email.value,
      password: password.value,
    });

    notyf.success("Registration Successful");

    // clear fields
    firstName.value = "";
    lastName.value = "";
    mobileNo.value = "";
    email.value = "";
    password.value = "";
    confirmPass.value = "";

    router.push("/login");

  } catch (error) {
    console.error(error);

    notyf.error(
      error.response?.data?.message || "Registration failed"
    );
  }
}

</script>

<template>
  <div class="container-fluid text-center">
    <h1 class="my-5 text-primary">Register</h1>
    <div class="row justify-content-center">
      <div class="col-md-5 border rounded-3 mx-auto p-5">

        <form @submit="handleSubmit">

          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" v-model="firstName">
          </div>

          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" v-model="lastName">
          </div>

          <div class="mb-3">
            <label class="form-label">Mobile Number</label>
            <input type="tel" class="form-control" v-model="mobileNo">
          </div>

          <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" v-model="email">
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password">
          </div>

          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-control" v-model="confirmPass">
          </div>

          <div>
            <button type="submit" class="btn btn-primary btn-block" v-if="isEnabled">
              Register
            </button>

            <button type="submit" class="btn btn-danger btn-block" v-else disabled>
              Register
            </button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>