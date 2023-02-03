<template>
  <div class="product" :class="additionalClass">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    />
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>{{ sizeDescriber(product) }}</li>
        <li>{{ sauceDescriber(product) }}</li>
        <li>{{ ingredientsDescriber(product) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    additionalClass: {
      type: String,
    },
    product: {
      type: Object,
      required: true,
    },
  },

  methods: {
    sizeDescriber(product) {
      let sizeName = this.pizzas.sizes.find(
        (item) => item.id === product.sizeId
      ).name;
      let doughName = this.pizzas.dough
        .find((item) => item.id === product.doughId)
        .name.toLowerCase()
        .slice(0, -1);
      return sizeName + ", на " + doughName + "м тесте";
    },
    sauceDescriber(product) {
      let sauceName = this.pizzas.sauces
        .find((item) => item.id === product.sauceId)
        .name.toLowerCase();
      return "Соус: " + sauceName;
    },
    ingredientsDescriber(product) {
      let ingredientsName = "";
      product.ingredients.forEach((element) => {
        ingredientsName +=
          this.pizzas.ingredients
            .find((item) => item.id === element.ingredientId)
            .name.toLowerCase() + ", ";
      });
      return "Начинка: " + ingredientsName.slice(0, -2);
    },
  },
  computed: {
    pizzas() {
      return this.$store.state.Builder.pizzas;
    },
  },
};
</script>
