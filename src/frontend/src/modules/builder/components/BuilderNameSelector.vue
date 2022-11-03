<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      v-model="myPizzaName"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderNameSelector",

  computed: {
    myPizzaName: {
      get() {
        return this.$store.state.Builder.myPizza.name;
      },
      set(newName) {
        this.$store.commit("Builder/updateName", newName);
      },
    },
  },
};
</script>
