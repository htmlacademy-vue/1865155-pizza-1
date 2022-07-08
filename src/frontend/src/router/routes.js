import Index from "@/views/Index.vue";
import Cart from "@/views/Cart.vue";
import Orders from "@/views/Orders.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";

export default [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login.html",
    name: "Login",
    component: Login,
  },
  {
    path: "/cart.html",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutUser",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayoutUser",
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutUser",
    },
  },
];
