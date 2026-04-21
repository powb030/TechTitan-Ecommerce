<script setup>
import { onBeforeMount, reactive, nextTick } from "vue";
import api from "../api";
import { Notyf } from "notyf";

import { useCartStore } from "../stores/cart"; // <-- import the cart store

import { useRouter } from "vue-router";

const router = useRouter();

const notyf = new Notyf();
const cart = useCartStore(); // <-- initialize store

const state = reactive({
  products: [],
  selectedProduct: null,
  loading: true,
  loadingSingle: false
});

//  Load all active products
onBeforeMount(async () => {
  await cart.fetchCart();   // load current cart for logged-in user
  await fetchProducts();    // then fetch product list
});

async function addToCart(product) {
  if (!product) return;

  try {
    await cart.addToCart(
      {
        _id: product._id,
        price: product.price,
        name: product.name
      },
      1
    );

    notyf.success("Added to cart");

    // Redirect to cart page
    router.push("/cart");

  } catch (err) {
    notyf.error("Failed to add to cart");
  }
}

async function fetchProducts() {
  try {
    state.loading = true;
    const { data } = await api.get("/products/active");
    state.products = data.products || data;
  } catch (error) {
    notyf.error("Failed to load products");
  } finally {
    state.loading = false;
  }
}

async function viewProduct(productId) {
  try {
    state.loadingSingle = true;
    const { data } = await api.get(`/products/${productId}`);
    state.selectedProduct = data.product || data;
    await nextTick();
  } catch (error) {
    notyf.error("Failed to load product");
  } finally {
    state.loadingSingle = false;
  }
}

function backToCatalog() {
  state.selectedProduct = null;
}
</script>

<template>
  <div class="container my-4">
    <h2 class="mb-4">Product Catalog</h2>

    <!-- PRODUCT LIST VIEW -->
    <div v-show="!state.selectedProduct">
      <div v-show="state.loading" class="text-center my-5">
        <div class="spinner-border"></div>
      </div>

      <div v-show="!state.loading" class="row">
        <div class="col-md-4 mb-4" v-for="product in state.products" :key="product._id">
          <div class="card h-100 shadow-sm">
            <img
              class="card-img-top"
              :src="`https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`"
            />
            <div class="card-body">
              <h5>{{ product.name }}</h5>
              <p class="product-desc">{{ product.description }}</p>
              <p class="fw-bold">₱ {{ product.price }}</p>
              <button
                class="btn btn-primary w-100"
                @click="viewProduct(product._id)"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SINGLE PRODUCT VIEW -->
    <div v-show="state.selectedProduct" :key="state.selectedProduct?._id">
      <button class="btn btn-outline-secondary mb-3" @click="backToCatalog">
        ← Back to Catalog
      </button>

      <div v-show="state.loadingSingle" class="text-center my-5">
        <div class="spinner-border"></div>
      </div>

      <div v-show="!state.loadingSingle" class="row">
        <div class="col-md-6">
          <img
            class="img-fluid rounded"
            :src="`https://placehold.co/600x400?text=${encodeURIComponent(state.selectedProduct?.name)}`"
          />
        </div>

        <div class="col-md-6">
          <h2>{{ state.selectedProduct?.name }}</h2>
          <p class="product-description">
            {{ state.selectedProduct?.description }}
          </p>
          <h3 class="text-primary">₱ {{ state.selectedProduct?.price }}</h3>
          <button
            v-if="state.selectedProduct"
            class="btn btn-success mt-3"
            @click="addToCart(state.selectedProduct)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /*  Page Background */
  .container {
    background: transparent;
  }

  body {
    background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  }

  /*  Title */
  h2 {
    color: #00f7ff;
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
  }

  /*  Product Cards (Glass Effect) */
  .card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 247, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    transition: all 0.3s ease;
    color: #e0e0e0;
  }

  /*  Hover Effect */
  .card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 0 25px rgba(0, 247, 255, 0.4);
  }

  /*  Image */
  .card-img-top {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  /*  Text */
  .card-body h5 {
    color: #ffffff;
  }

  .card-body p {
    font-size: 0.95rem;
  }

  /*  Price */
  .fw-bold {
    color: #00f7ff;
    font-size: 1.1rem;
  }

  /*  Buttons (View Details) */
  .btn-primary {
    background: linear-gradient(135deg, #00f7ff, #007cf0);
    border: none;
    border-radius: 25px;
    font-weight: 600;
    transition: 0.3s ease;
  }

  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #00f7ff;
  }

  /*  Add to Cart Button */
  .btn-success {
    background: linear-gradient(135deg, #00f7ff, #007cf0);
    border: none;
    border-radius: 25px;
    color: #000;
    font-weight: 600;
    transition: 0.3s ease;
  }

  .btn-success:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #00f7ff;
  }

  /*  Back Button */
  .btn-outline-secondary {
    border-color: #00f7ff;
    color: #00f7ff;
    border-radius: 20px;
  }

  .btn-outline-secondary:hover {
    background: #00f7ff;
    color: #000;
  }

  /*  Spinner */
  .spinner-border {
    color: #00f7ff;
  }

  .product-description {
    color: #b2ebf2; /* soft cyan (not plain white) */
    font-size: 1.05rem;
    line-height: 1.7;
    padding: 12px 16px;

    /*  Glass effect */
    background: rgba(0, 247, 255, 0.05);
    border-left: 3px solid #00f7ff;
    border-radius: 8px;

    /*  subtle glow */
    text-shadow: 0 0 6px rgba(0, 247, 255, 0.3);

    /* smooth hover */
    transition: 0.3s ease;
  }

  /*  Hover effect */
  .product-description:hover {
    background: rgba(0, 247, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 247, 255, 0.2);
  }

  .product-desc {
    color: #b2ebf2; /* light cyan */
    font-size: 0.95rem;
    line-height: 1.6;

    /* subtle glow */
    text-shadow: 0 0 6px rgba(0, 247, 255, 0.25);

    /* smooth transition */
    transition: 0.3s ease;
  }

  /* Hover effect (optional but nice) */
  .product-desc:hover {
    color: #e0ffff;
    text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
  }
</style>
