<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

export default {
  setup() {
    const router = useRouter();

    const products = ref([]);
    const isLoading = ref(false);
    const errorMsg = ref('');
    const successMsg = ref('');

    const getAuth = () => ({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    async function getProducts() {
      isLoading.value = true;
      errorMsg.value = '';

      try {
        const res = await api.get('/products/all', getAuth());
        products.value = res.data;
      } catch (err) {
        errorMsg.value =
          err.response?.data?.message || 'Failed to load products.';
      } finally {
        isLoading.value = false;
      }
    }

    const goToCreate = () => router.push("/products/create");
    const editProduct = (productId) =>
      router.push(`/products/edit/${productId}`);

    async function archiveProduct(product) {
      successMsg.value = '';
      errorMsg.value = '';

      try {
        const res = await api.patch(
          `/products/${product._id}/archive`,
          {},
          getAuth()
        );

        successMsg.value = res.data.message || 'Product archived.';
        product.isActive = false;
      } catch (err) {
        errorMsg.value =
          err.response?.data?.message || 'Archive failed.';
      }
    }

    async function activateProduct(product) {
      successMsg.value = '';
      errorMsg.value = '';

      try {
        const res = await api.patch(
          `/products/${product._id}/activate`,
          {},
          getAuth()
        );

        successMsg.value = res.data.message || 'Product activated.';
        product.isActive = true;
      } catch (err) {
        errorMsg.value =
          err.response?.data?.message || 'Activation failed.';
      }
    }

    onMounted(getProducts);

    return {
      products,
      isLoading,
      errorMsg,
      successMsg,
      goToCreate,
      editProduct,
      archiveProduct,
      activateProduct,
    };
  },
};
</script>

<template>
  <div class="admin-dashboard-wrapper">
    <div class="container my-5">
      <h1 class="text-center dashboard-title mb-4">Admin Dashboard</h1>

      <!-- CREATE BUTTON -->
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-create" @click="goToCreate">
          + Create Product
        </button>
      </div>

      <!-- SUCCESS ALERT -->
      <div v-if="successMsg" class="alert alert-success-theme alert-dismissible">
        {{ successMsg }}
        <button class="btn-close" @click="successMsg = ''"></button>
      </div>

      <!-- ERROR ALERT -->
      <div v-if="errorMsg" class="alert alert-danger-theme alert-dismissible">
        {{ errorMsg }}
        <button class="btn-close" @click="errorMsg = ''"></button>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-info"></div>
      </div>

      <!-- PRODUCTS TABLE -->
      <div v-else class="table-responsive glass-table p-3 rounded">
        <table class="table table-borderless text-light mb-0 align-middle">
          <thead class="table-header">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th width="240">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, i) in products" :key="product._id" class="table-row">
              <td>{{ i + 1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>₱{{ product.price }}</td>
              <td>
                <span
                  class="badge"
                  :class="product.isActive ? 'badge-active' : 'badge-deactivated'"
                >
                  {{ product.isActive ? 'Active' : 'Deactivated' }}
                </span>
              </td>
              <td>
                <button class="btn btn-edit" @click="editProduct(product._id)">Edit</button>
                <button
                  v-if="product.isActive"
                  class="btn btn-deactivate ms-2"
                  @click="archiveProduct(product)"
                >
                  Deactivate
                </button>
                <button
                  v-else
                  class="btn btn-activate ms-2"
                  @click="activateProduct(product)"
                >
                  Activate
                </button>
              </td>
            </tr>

            <tr v-if="products.length === 0">
              <td colspan="6" class="text-center text-muted">
                No products found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*  Page background */
.admin-dashboard-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
  padding: 40px 0;
  color: #e0e0e0;
}

/* Title */
.dashboard-title {
  color: #00f7ff;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.6);
}

/* Create Product Button */
.btn-create {
  background: linear-gradient(135deg, #00f7ff, #007cf0);
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: 600;
  transition: 0.3s ease;
}
.btn-create:hover {
  box-shadow: 0 0 12px #00f7ff;
  transform: scale(1.03);
}

/* Alerts */
.alert-success-theme {
  background: rgba(0, 255, 128, 0.1);
  color: #00ff80;
  border: 1px solid rgba(0, 255, 128, 0.3);
  border-radius: 10px;
}
.alert-danger-theme {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  border: 1px solid rgba(255, 77, 79, 0.3);
  border-radius: 10px;
}

/* Glass Table */
.glass-table {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 247, 255, 0.2);
  border-radius: 15px;
  transition: all 0.3s ease;
}

/* Table header */
.table-header th {
  background: rgba(0, 247, 255, 0.1);
  color: #00f7ff;
  border-bottom: 1px solid rgba(0, 247, 255, 0.4);
}

/* Table rows */
.table-row {
  background: transparent;
  border-bottom: 1px solid rgba(0, 247, 255, 0.2);
  transition: all 0.3s ease;
}
.table-row:hover {
  background: rgba(0, 247, 255, 0.05);
  transform: translateY(-2px);
}

/* Badges */
.badge-active {
  background-color: #00ff80;
  color: #000;
}
.badge-deactivated {
  background-color: #888;
  color: #fff;
}

/* Buttons */
.btn-edit {
  background: #ffaa00;
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.3s ease;
}
.btn-edit:hover {
  box-shadow: 0 0 10px #ffaa00;
  transform: scale(1.05);
}

.btn-deactivate {
  background: #ff4d4f;
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.3s ease;
}
.btn-deactivate:hover {
  box-shadow: 0 0 10px #ff4d4f;
  transform: scale(1.05);
}

.btn-activate {
  background: #00f7ff;
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.3s ease;
}
.btn-activate:hover {
  box-shadow: 0 0 10px #00f7ff;
  transform: scale(1.05);
}

/* Spinner */
.spinner-border {
  color: #00f7ff;
}
</style>