<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isDisabled"
      @click="addToCart()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  methods: {
    addToCart() {
      this.$store.commit("addToCart", {
        myPizza: this.$store.state.Builder.myPizza,
        price: this.price,
      });
      this.$store.commit("Builder/setMyPizzaDefaultState");
      this.$router.push("/cart");
    },
  },
  computed: {
    myPizza() {
      return this.$store.state.Builder.myPizza;
    },
    isDisabled() {
      return this.myPizza.name === "" || this.myPizza.ingredients.length === 0;
    },
    price: function () {
      if (this.myPizza.ingredients.length != 0) {
        return (
          this.myPizza.size.multiplier *
          (this.myPizza.dough.price +
            this.myPizza.sauce.price +
            this.myPizza.ingredients.reduce(
              (a, b) => a + b["price"] * b["count"],
              0
            ))
        );
      } else {
        return 0;
      }
    },
  },
};
</script>
