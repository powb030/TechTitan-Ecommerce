<script setup>
import { ref, onMounted } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/api";

const notyf = new Notyf();
const orders = ref([]);
const loading = ref(true);

function formatCurrency(amount) {
  return `₱ ${Number(amount).toFixed(2)}`;
}

// Fetch all orders for logged-in user
const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await api.get("/orders/my-orders");
    orders.value = res.data.orders || [];
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.message || "Failed to load orders.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOrders);
</script>

<template>
  <div class="order-page-wrapper">
    <div class="container my-5">
      <h1 class="page-title mb-4 text-center">Your Orders</h1>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-info"></div>
      </div>

      <div v-else-if="orders.length === 0" class="text-center empty-orders-message py-5">
        <i class="bi bi-bag-x" style="font-size: 3rem;"></i>
        <h3 class="mt-3">Your Orders are Empty</h3>
        <router-link to="/products" class="btn btn-outline-info mt-2">
          Start Shopping
        </router-link>
      </div>

      <div v-else>
        <div
          v-for="(order, index) in orders"
          :key="order._id"
          class="glass-card mb-3 p-3"
        >
          <h5>Order #{{ index + 1 }}</h5>
          <div v-for="item in order.productsOrdered" :key="item._id || item.productId._id" class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>{{ item.productId?.name || "Product" }}</strong>
              <p class="mb-0">Quantity: {{ item.quantity }}</p>
            </div>
            <span class="fw-bold">{{ formatCurrency(item.subtotal || (item.productId?.price * item.quantity)) }}</span>
          </div>
          <div class="text-end fw-bold mt-2">
            Total: {{ formatCurrency(order.totalPrice) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-page-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  padding: 40px 0;
  color: #e0e0e0;
}
.page-title { color:#00f7ff; text-shadow:0 0 10px rgba(0,247,255,0.6); }
.glass-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border:1px solid rgba(0,247,255,0.2); border-radius:20px; transition:0.3s ease; padding:15px; }
.spinner-border { color:#00f7ff; }

.empty-orders-message {
  color: #00f7ff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
}

.empty-orders-message .btn-outline-info {
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 600;
  transition: 0.3s ease;
}

.empty-orders-message .btn-outline-info:hover {
  background: #00f7ff;
  color: #000;
  box-shadow: 0 0 12px #00f7ff;
}
</style>