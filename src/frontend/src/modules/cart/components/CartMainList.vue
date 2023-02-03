<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="(product, index) in pizzas" :key="index">
      <Product additionalClass="cart-list__product" :product="product" />

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="changeCount(product.quantity - 1, index)"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="product.quantity"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="changeCount(product.quantity + 1, index)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ price(product) * product.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="edit(product, index)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import Product from "/src/common/components/Product.vue";

export default {
  name: "CartMainList",
  components: {
    Product,
  },

  methods: {
    edit(product, index) {
      this.$store.commit("Builder/restorePizza", {
        product: product,
        index: index,
      });
      this.$router.push("/");
    },
    changeCount(newCount, index) {
      this.$store.commit("changeCount", { newCount: newCount, index: index });
    },
    price(product) {
      let multiplier = this.$store.state.Builder.pizzas.sizes.find(
        (item) => item.id === product.sizeId
      ).multiplier;
      let doughPrice = this.$store.state.Builder.pizzas.dough.find(
        (item) => item.id === product.doughId
      ).price;
      let saucePrice = this.$store.state.Builder.pizzas.sauces.find(
        (item) => item.id === product.sauceId
      ).price;
      let ingredientsPrice = 0;
      product.ingredients.forEach(
        (element) =>
          (ingredientsPrice +=
            this.$store.state.Builder.pizzas.ingredients.find(
              (item) => item.id === element.ingredientId
            ).price * element.quantity)
      );
      return multiplier * (doughPrice + saucePrice + ingredientsPrice);
    },
  },
  computed: {
    pizzas() {
      return this.$store.state.newOrder.pizzas;
    },
  },
};
</script>

<style></style>
