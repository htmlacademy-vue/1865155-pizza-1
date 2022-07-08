<template>
  <div id="app">
    <AppLayout :cartPrice="cartPrice">
      <router-view @updateCartPrice="updateCartPrice" />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  methods: {
    updateCartPrice(price) {
      this.cartPrice = price;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
