<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "../api";

const router = useRouter();
const route = useRoute();
const notyf = new Notyf();

const productId = route.params.productId;

const name = ref("");
const description = ref("");
const price = ref("");
const loading = ref(false);
const fetching = ref(true);

// Load existing product data
const fetchProduct = async () => {
  try {
    const res = await api.get(`/products/${productId}`);
    const product = res.data.product || res.data;
    name.value = product.name;
    description.value = product.description;
    price.value = product.price;
  } catch (err) {
    notyf.error("Failed to load product.");
    router.push("/admin");
  } finally {
    fetching.value = false;
  }
};

const handleSubmit = async () => {
  if (!name.value || !description.value || !price.value) {
    notyf.error("All fields are required.");
    return;
  }

  loading.value = true;

  try {
    await api.patch(`/products/${productId}/update`, {
      name: name.value,
      description: description.value,
      price: parseFloat(price.value)
    });

    notyf.success("Product updated successfully!");

    setTimeout(() => {
      router.push("/admin");
    }, 1500);

  } catch (err) {
    notyf.error(
      err.response?.data?.message || "Failed to update product."
    );
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);
</script>

<template>
  <div class="edit-product-wrapper">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <!-- Back + Title -->
          <div class="d-flex align-items-center mb-4 gap-3">
            <button class="btn btn-back" @click="router.push('/admin')">
              ← Back
            </button>
            <h2 class="page-title mb-0">Edit Product</h2>
          </div>

          <!-- Loading spinner -->
          <div v-if="fetching" class="text-center py-5">
            <div class="spinner-border text-info"></div>
          </div>

          <!-- Form -->
          <div v-else class="glass-card p-4">
            <div class="mb-3">
              <label class="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                class="form-control form-input"
                v-model="name"
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Description</label>
              <textarea
                class="form-control form-input"
                rows="4"
                v-model="description"
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold">Price (₱)</label>
              <input
                type="number"
                class="form-control form-input"
                min="0"
                v-model="price"
              />
            </div>

            <button
              class="btn btn-save w-100"
              @click="handleSubmit"
              :disabled="loading"
            >
              {{ loading ? "Saving..." : "Save Changes" }}
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🌌 Page background */
.edit-product-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  padding: 40px 0;
  color: #e0e0e0;
}

/* Page title */
.page-title {
  color: #00f7ff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
}

/* Back button */
.btn-back {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 247, 255, 0.2);
  color: #00f7ff;
  border-radius: 15px;
  padding: 5px 12px;
  font-weight: 600;
  transition: 0.3s ease;
}
.btn-back:hover {
  box-shadow: 0 0 10px #00f7ff;
  transform: scale(1.05);
}

/* Glass card for form */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 247, 255, 0.2);
  border-radius: 20px;
  transition: all 0.3s ease;
}

/* Form inputs */
.form-input {
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0e0;
  border: 1px solid rgba(0, 247, 255, 0.3);
  border-radius: 10px;
  transition: all 0.3s ease;
}
.form-input::placeholder {
  color: rgba(224, 224, 224, 0.6);
}
.form-input:focus {
  border-color: #00f7ff;
  box-shadow: 0 0 8px #00f7ff;
  background: rgba(255, 255, 255, 0.08);
  outline: none;
}

/* Save button */
.btn-save {
  background: linear-gradient(135deg, #00f7ff, #007cf0);
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 0;
  font-weight: 600;
  font-size: 1rem;
  transition: 0.3s ease;
}
.btn-save:hover {
  box-shadow: 0 0 12px #00f7ff;
  transform: scale(1.03);
}
.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner */
.spinner-border {
  color: #00f7ff;
}
</style>