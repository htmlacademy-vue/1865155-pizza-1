<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          class="sheet cart__empty"
          v-if="this.$store.state.newOrder.pizzas.length === 0"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <CartMainList />
        <CartAdditionalList
          v-if="this.$store.state.newOrder.pizzas.length != 0"
        />
        <CartForm v-if="this.$store.state.newOrder.pizzas.length != 0" />
      </div>
    </main>
    <CartFooter />
  </form>
</template>

<script>
import CartMainList from "../modules/cart/components/CartMainList.vue";
import CartAdditionalList from "../modules/cart/components/CartAdditionalList.vue";
import CartForm from "../modules/cart/components/CartForm.vue";
import CartFooter from "../modules/cart/components/CartFooter.vue";

export default {
  name: "Cart",
  components: {
    CartMainList,
    CartAdditionalList,
    CartForm,
    CartFooter,
  },
};
</script>

<style></style>
