<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import store from "@/store";
const defaultLayout = "AppLayoutDefault";
const userLayout = "AppLayoutUser";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = store.state.Auth.isAuthenticated
        ? userLayout
        : defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
