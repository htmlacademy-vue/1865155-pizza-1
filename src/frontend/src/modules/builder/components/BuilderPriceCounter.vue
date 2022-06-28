<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isDisabled()"
      @click="$emit('getBake')"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      required: true,
    },
    myPizza: {
      type: Object,
      required: true,
    },
  },

  methods: {
    isDisabled() {
      if (this.myPizza.name != "" && this.myPizza.ingredients.length != 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
