import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import "./assets/main.css";
import "notyf/notyf.min.css";

import { createRouter, createWebHistory } from "vue-router";
import { useGlobalStore } from "./stores/global";



import HomePage from './pages/HomePage.vue';
import ProductCatalogPage from './pages/ProductCatalogPage.vue'; // <<
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue'; 
import RegisterPage from './pages/RegisterPage.vue';
import AdminDashboardPage from './pages/AdminDashboardPage.vue'
import ViewCartPage from './pages/ViewCartPage.vue';
import CheckoutPage from './pages/CheckoutPage.vue';
import CreateProductPage from './pages/CreateProductPage.vue';
import EditProductPage from './pages/EditProductPage.vue';
import OrdersPage from './pages/OrdersPage.vue';


import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from "pinia"; 

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomePage
		},
		/*{
			path: "/courses",
			name: "Courses",
			component: CoursesPage
		},*/
		{
			path: "/products",
			name: "Products",
			component: ProductCatalogPage
		},
		{
		  path: "/login",
		  name: "Login",
		  component: LoginPage
		},
		{
			path: "/logout",
			name: "Logout",
			component: LogoutPage
		},
		{
		  path: "/register",
		  name: "Register",
		  component: RegisterPage
		},

		{
		  path: "/admin",
		  name: "AdminDashboard",
		  component: AdminDashboardPage
		},
		{
		  path: "/cart",
		  name: "ViewCart",
		  component: ViewCartPage
		},

		{
		  path: "/checkout",
		  name: "Checkout",
		  component: CheckoutPage
		},

		{
		  path: "/orders",
		  name: "Orders",  
		  component: OrdersPage
		},

		{
		  path: "/products/create",
		  name: "CreateProduct",
		  component: CreateProductPage
		},

		{
		  path: "/products/edit/:productId",
		  name: "EditProduct",
		  component: EditProductPage
		}

	]
})

const app = createApp(App);
app.use(router);
app.use(createPinia()); 
app.mount("#app");


