<template>
  <div class="content__constructor" @drop="onDrop($event)" @dragover.prevent>
    <div class="pizza" :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <div
          v-for="filling in myPizzaIngredients"
          :key="filling.id"
          :class="setClass(filling.count, filling.id)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    pizzaFoundationClass: {
      type: String,
      required: true,
    },
    pizzas: {
      type: Object,
      required: true,
    },
    myPizzaIngredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onDrop(e) {
      const count = e.dataTransfer.getData("ingredientCount");
      const id = e.dataTransfer.getData("ingredientId");
      const price = e.dataTransfer.getData("ingredientPrice");
      this.$emit("getCountFromDrop", count, id, price);
    },
    getIngredientClassName(imgUrl) {
      return "filling--" + imgUrl.match(/.*\/(.*)(\..*)$/)[1];
    },
    setClass(count, id) {
      let imgUrl =
        this.pizzas.ingredients[
          this.pizzas.ingredients.findIndex((item) => item.id === id)
        ].image;
      switch (count) {
        case 0:
          return "";
        case 1:
          return "pizza__filling pizza__" + this.getIngredientClassName(imgUrl);
        case 2:
          return (
            "pizza__filling pizza__" +
            this.getIngredientClassName(imgUrl) +
            " pizza__filling--second"
          );
        case 3:
          return (
            "pizza__filling pizza__" +
            this.getIngredientClassName(imgUrl) +
            " pizza__filling--third"
          );
      }
    },
  },
};
</script>
