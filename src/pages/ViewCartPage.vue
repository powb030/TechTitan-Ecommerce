<script setup>
import { onMounted } from "vue";
import { useCartStore } from "../stores/cart";

const cart = useCartStore();

onMounted(() => {
  cart.fetchCart(); // load cart items
});

function formatCurrency(amount) {
  if (!amount || isNaN(amount)) return "₱ 0.00";
  return `₱ ${Number(amount).toFixed(2)}`;
}
</script>

<template>
  <div class="cart-page-wrapper">
    <div class="container my-5">
      <h1 class="cart-title mb-4 text-center">Your Cart</h1>

      <!-- Loading Spinner -->
      <div v-if="cart.loading" class="text-center py-5">
        <div class="spinner-border text-info"></div>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="cart.cartItems.length === 0" class="text-center py-5 empty-cart-message">
        <i class="bi bi-cart-x" style="font-size: 3rem;"></i>
        <h3 class="mt-3">Your Cart is Empty</h3>
        <router-link to="/products" class="btn btn-outline-info mt-2">Start Shopping</router-link>
      </div>

      <!-- Cart Items -->
      <div v-else>
        <div class="table-responsive glass-table p-3 rounded">
          <table class="table table-borderless text-light mb-0">
            <thead class="table-header">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.cartItems" :key="item._id" class="cart-row">
                <td>{{ item.productId?.name || "Unknown Product" }}</td>
                <td>{{ formatCurrency(item.productId?.price) }}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    v-model.number="item.quantity"
                    @change="cart.updateQuantity(item.productId?._id, item.quantity)"
                    class="form-control quantity-input"
                  />
                </td>
                <td>{{ formatCurrency((item.productId?.price || 0) * item.quantity) }}</td>
                <td>
                  <button
                    class="btn btn-danger btn-sm remove-btn"
                    @click="cart.removeFromCart(item.productId?._id)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Cart Summary -->
        <div class="text-end mt-4">
          <h4 class="total-price">Total: ₱ {{ cart.totalPrice.toFixed(2) }}</h4>
          <button class="btn btn-warning mt-3 me-2 action-btn" @click="cart.clearCart()">Clear Cart</button>
          <router-link to="/checkout" class="btn btn-success mt-3 action-btn">Checkout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*  Full Page Background */
.cart-page-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  padding: 40px 0;
  color: #e0e0e0;
}

/*  Page Title */
.cart-title {
  color: #00f7ff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
}

/*  Glass Table Container */
.glass-table {
  background: rgba(255, 255, 255, 0.05); /* transparent glass */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 247, 255, 0.2);
  border-radius: 15px;
  transition: all 0.3s ease;
}

/* Remove default white table background */
.table,
.table th,
.table td {
  background: transparent !important;
  color: #e0e0e0;
  border-color: rgba(0, 247, 255, 0.2);
}

/* Table Header */
.table thead th {
  background: rgba(0, 247, 255, 0.1) !important;
  color: #00f7ff;
  border-bottom: 1px solid rgba(0, 247, 255, 0.4);
}

/* Table Row Hover */
.cart-row:hover {
  background: rgba(0, 247, 255, 0.05);
  transform: translateY(-2px);
  transition: 0.3s ease;
}

/* Quantity Input */
.quantity-input {
  width: 80px;
  border-radius: 8px;
  border: 1px solid #00f7ff;
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0e0;
}

/* Remove Button */
.remove-btn {
  border-radius: 8px;
  background: #ff4d4f;
  border: none;
  transition: 0.3s ease;
}
.remove-btn:hover {
  box-shadow: 0 0 15px rgba(255, 77, 79, 0.5);
  transform: scale(1.05);
}

/* Action Buttons */
.action-btn {
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 600;
  transition: 0.3s ease;
}

.btn-warning.action-btn {
  background: linear-gradient(135deg, #ffaa00, #ffcc33);
  border: none;
  color: #000;
}
.btn-warning.action-btn:hover {
  box-shadow: 0 0 15px #ffaa00;
  transform: scale(1.05);
}

.btn-success.action-btn {
  background: linear-gradient(135deg, #00f7ff, #007cf0);
  border: none;
  color: #000;
}
.btn-success.action-btn:hover {
  box-shadow: 0 0 15px #00f7ff;
  transform: scale(1.05);
}

/* Total Price Highlight */
.total-price {
  color: #00f7ff;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
}

/* Spinner */
.spinner-border {
  color: #00f7ff;
}

/* Empty Cart Message Styling */
.empty-cart-message {
  color: #00f7ff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
}
.empty-cart-message h3 {
  margin-top: 1rem;
  font-weight: 600;
}
.empty-cart-message .btn-outline-info {
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 600;
  transition: 0.3s ease;
}
.empty-cart-message .btn-outline-info:hover {
  background: #00f7ff;
  color: #000;
  box-shadow: 0 0 12px #00f7ff;
}
</style>