<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="minusDisabled"
      @click="
        $emit('update:itemCount', setValue() - 1, ingredientId, ingredientPrice)
      "
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="setValue()"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="plusDisabled"
      @click="
        $emit('update:itemCount', setValue() + 1, ingredientId, ingredientPrice)
      "
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    ingredientId: {
      type: Number,
      required: true,
    },
    ingredientPrice: {
      type: Number,
      required: true,
    },
    myPizzaIngredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setValue() {
      let index = this.myPizzaIngredients.findIndex(
        (item) => item.id === this.ingredientId
      );
      if (index === -1) {
        return 0;
      } else {
        let value =
          this.myPizzaIngredients[
            this.myPizzaIngredients.findIndex(
              (item) => item.id === this.ingredientId
            )
          ].count;
        return value;
      }
    },
  },
  computed: {
    minusDisabled: function () {
      let index = this.myPizzaIngredients.findIndex(
        (item) => item.id === this.ingredientId
      );
      if (index === -1) {
        return true;
      } else {
        return false;
      }
    },
    plusDisabled: function () {
      let index = this.myPizzaIngredients.findIndex(
        (item) => item.id === this.ingredientId
      );
      if (index === -1) {
        return false;
      } else {
        let value =
          this.myPizzaIngredients[
            this.myPizzaIngredients.findIndex(
              (item) => item.id === this.ingredientId
            )
          ].count;
        switch (value) {
          case 1:
          case 2:
            return false;
          case 3:
            return true;
        }
        return true;
      }
    },
  },
};
</script>
