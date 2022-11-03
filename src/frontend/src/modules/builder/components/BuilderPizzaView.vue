<template>
  <div class="content__constructor" @drop="onDrop($event)" @dragover.prevent>
    <div class="pizza" :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <div
          v-for="filling in myPizza.ingredients"
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

  methods: {
    onDrop(e) {
      const id = e.dataTransfer.getData("ingredientId");
      const count = e.dataTransfer.getData("ingredientCount");
      const price = e.dataTransfer.getData("ingredientPrice");
      this.$store.commit("Builder/addIngredient", {
        id: Number(id),
        count: Number(count),
        price: Number(price),
      });
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
  computed: {
    myPizza() {
      return this.$store.state.Builder.myPizza;
    },
    pizzas() {
      return this.$store.state.Builder.pizzas;
    },
    pizzaFoundationClass() {
      if (this.myPizza.dough.value === "light") {
        if (this.myPizza.sauce.value === "tomato") {
          return "pizza--foundation--small-tomato";
        } else {
          return "pizza--foundation--small-creamy";
        }
      } else {
        if (this.myPizza.sauce.value === "tomato") {
          return "pizza--foundation--big-tomato";
        } else {
          return "pizza--foundation--big-creamy";
        }
      }
    },
  },
};
</script>
