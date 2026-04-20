// src/stores/cart.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../api";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const loading = ref(false);

  // Fetch the current user's cart
  async function fetchCart() {
    loading.value = true;
    try {
      const res = await api.get("/cart/get-cart");
      const items = res.data.cart?.cartItems || [];

      cartItems.value = items
        .filter(item => item.productId)
        .map(item => ({
          _id: item._id,
          productId: item.productId,
          quantity: item.quantity,
          subtotal: item.subtotal || item.productId.price * item.quantity,
        }));
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      loading.value = false;
    }
  }

  // Add product to cart
  async function addToCart(product, quantity = 1) {
    try {
      await api.post("/cart/add-to-cart", {
        productId: product._id,
        price: product.price,
        quantity,
      });
      await fetchCart();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  }

  // Update quantity
  async function updateQuantity(cartItemId, quantity) {
    try {
      await api.patch("/cart/update-cart-quantity", {
        productId: cartItemId,
        quantity,
      });
      await fetchCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  }

  // Remove item
  async function removeFromCart(cartItemId) {
    try {
      await api.patch(`/cart/${cartItemId}/remove-from-cart`);
      await fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  }

  // Clear the entire cart
  async function clearCart() {
    try {
      await api.put("/cart/clear-cart");
      cartItems.value = [];
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  }

  let lastOrder = ref([]);

  async function checkout() {
    if (!cartItems.value.length) throw new Error("Cart is empty");

    try {
      // Store copy locally for instant Orders page display
      lastOrder.value = cartItems.value.map(i => ({ ...i }));

      const res = await api.post("/orders/checkout");

      // Clear cart after successful checkout
      await fetchCart();

      return { message: res.data.message || "Checkout successful!" };
    } catch (err) {
      console.error("Checkout failed", err);
      throw new Error(err.response?.data?.error || "Checkout failed");
    }
  }

  // Compute total dynamically
  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + price * item.quantity;
    }, 0)
  );

  return {
    cartItems,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,    // now calls backend
    totalPrice,
  };
});