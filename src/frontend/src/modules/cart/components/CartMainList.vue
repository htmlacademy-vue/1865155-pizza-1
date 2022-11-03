<template>
  <ul class="cart-list sheet">
    <li
      class="cart-list__item"
      v-for="(product, index) in cartMain"
      :key="index"
    >
      <div class="product cart-list__product">
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

      <div class="counter cart-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="changeCount(product.count - 1, index)"
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="product.count"
        />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="changeCount(product.count + 1, index)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ product.price * product.count }} ₽</b>
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
export default {
  name: "CartMainList",

  methods: {
    sizeDescriber(product) {
      let sizeName = this.$store.state.Builder.pizzas.sizes.find(
        (item) => item.id === product.size.id
      ).name;
      let doughName = this.$store.state.Builder.pizzas.dough
        .find((item) => item.id === product.dough.id)
        .name.toLowerCase()
        .slice(0, -1);
      return sizeName + ", на " + doughName + "м тесте";
    },
    sauceDescriber(product) {
      let sauceName = this.$store.state.Builder.pizzas.sauces
        .find((item) => item.id === product.sauce.id)
        .name.toLowerCase();
      return "Соус: " + sauceName;
    },
    ingredientsDescriber(product) {
      let ingredientsName = "";
      product.ingredients.forEach((element) => {
        ingredientsName +=
          this.$store.state.Builder.pizzas.ingredients
            .find((item) => item.id === element.id)
            .name.toLowerCase() + ", ";
      });
      return "Начинка: " + ingredientsName.slice(0, -2);
    },
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
  },
  computed: {
    cartMain() {
      return this.$store.state.cart.main;
    },
  },
};
</script>

<style></style>
