<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useCartStore } from "@/stores/cart";
import api from "@/api";

const router = useRouter();
const notyf = new Notyf();
const cart = useCartStore();

const loading = ref(false);

// Load cart items
onMounted(() => {
  if (!cart.cartItems.length) {
    cart.fetchCart();
  }
});

// Checkout
const handleCheckout = async () => {
  if (!cart.cartItems.length) return;

  loading.value = true;
  try {
    // Call backend checkout
    const res = await api.post("/orders/checkout");
    notyf.success(res.data.message || "Checkout successful!");

    // Clear local cart
    await cart.clearCart();

    // Redirect to Orders page
    router.push("/orders");
  } catch (err) {
    console.error(err);
    notyf.error(err.response?.data?.message || "Checkout failed.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="checkout-page-wrapper">
    <div class="container mt-4">
      <h1 class="checkout-title mb-4">Checkout</h1>

      <div v-if="cart.loading" class="text-center py-5">
        <div class="spinner-border text-info"></div>
      </div>

      <div v-else-if="cart.cartItems.length === 0" class="text-muted">
        Your cart is empty.
        <router-link to="/products" class="ms-2 continue-link">Continue Shopping</router-link>
      </div>

      <div v-else>
        <div class="glass-panel p-3 mb-3">
          <ul class="list-group list-group-flush">
            <li
              v-for="item in cart.cartItems"
              :key="item.productId?._id || item._id"
              class="list-group-item cart-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{{ item.productId?.name || "Product" }}</strong>
                <br />
                Quantity: {{ item.quantity }}
              </div>
              <span class="item-price">
                ₱{{ (item.productId?.price * item.quantity).toFixed(2) }}
              </span>
            </li>
          </ul>
        </div>

        <div class="text-end fw-bold total-price mb-3">
          Total: ₱{{ cart.totalPrice.toFixed(2) }}
        </div>

        <div class="text-end">
          <button
            class="btn checkout-btn"
            @click="handleCheckout"
            :disabled="loading"
          >
            {{ loading ? "Processing..." : "Confirm Checkout" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  padding: 40px 0;
  color: #e0e0e0;
}
.checkout-title { color: #00f7ff; text-shadow: 0 0 10px rgba(0,247,255,0.6); }
.glass-panel { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border:1px solid rgba(0,247,255,0.2); border-radius:15px; }
.cart-item { background: transparent !important; color:#e0e0e0; border-bottom:1px solid rgba(0,247,255,0.2); }
.cart-item:hover { background: rgba(0,247,255,0.05); transform: translateY(-2px); }
.item-price { font-weight:600; color:#00f7ff; }
.total-price { color:#00f7ff; font-size:1.3rem; text-shadow:0 0 10px rgba(0,247,255,0.6); }
.continue-link { color:#00f7ff; text-decoration:underline; }
.continue-link:hover { color:#00ffff; text-shadow:0 0 6px rgba(0,247,255,0.5); }
.checkout-btn { width:auto; min-width:180px; padding:8px 20px; font-weight:600; font-size:1rem; color:#000; background:linear-gradient(135deg,#00f7ff,#007cf0); border:none; border-radius:20px; transition:0.3s ease; }
.checkout-btn:hover { box-shadow:0 0 12px #00f7ff; transform:scale(1.03); }
.checkout-btn:disabled { opacity:0.6; cursor:not-allowed; }
</style>