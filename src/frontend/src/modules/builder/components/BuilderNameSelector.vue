<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      @input="sendName"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderNameSelector",
  props: {
    clear: {},
  },
  methods: {
    sendName() {
      this.$emit(
        "getNameFromBuilder",
        document.getElementsByName("pizza_name")[0].value,
        "name"
      );
    },
  },
  watch: {
    clear: function (clear) {
      if (clear === true) {
        document.getElementsByName("pizza_name")[0].value = "";
        this.$emit("clearExecuted");
      }
    },
  },
};
</script>
