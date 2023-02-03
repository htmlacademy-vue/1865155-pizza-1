import Index from "@/views/Index.vue";
import Cart from "@/views/Cart.vue";
import Orders from "@/views/Orders.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      middlewares: [auth],
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {
      middlewares: [auth],
    },
  },
];
