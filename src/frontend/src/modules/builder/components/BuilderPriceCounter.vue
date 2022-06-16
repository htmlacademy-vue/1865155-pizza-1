<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button type="button" class="button" :disabled="isDisabled" @click="bake">
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {},
    isDisabled: {},
  },
  methods: {
    bake() {
      this.$emit("getBake");
    },
  },
};
</script>
