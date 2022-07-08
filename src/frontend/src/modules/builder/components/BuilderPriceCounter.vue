<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isDisabled"
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
    pizzaName: {
      type: String,
      default: "",
    },
    ingredientsCount: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    isDisabled: function () {
      if (this.pizzaName != "" && this.ingredientsCount != 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
