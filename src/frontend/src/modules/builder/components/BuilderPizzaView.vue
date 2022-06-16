<template>
  <div class="content__constructor" @drop="onDrop($event)" @dragover.prevent>
    <div class="pizza" :class="pizzaFoundationClass">
      <div class="pizza__wrapper">
        <div
          v-for="filling in pizzaIngredientsClass"
          :key="filling.id"
          :class="filling.className"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    pizzaFoundationClass: {},
    pizzaIngredientsClass: [],
  },
  methods: {
    onDrop(e) {
      const id = e.dataTransfer.getData("ingredientId");
      this.$emit("getCountFromDrop", id);
    },
  },
};
</script>
