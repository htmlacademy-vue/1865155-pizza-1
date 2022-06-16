<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="minusDisabled"
      @click="minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="plusDisabled"
      @click="plus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  data() {
    return {
      value: 0,
      minusDisabled: true,
      plusDisabled: false,
      ingredientClassName: "",
    };
  },
  props: {
    ingredientId: {},
    ingredientClass: {},
    ingredientPrice: {},
    clear: {},
  },
  methods: {
    minus() {
      switch (this.value) {
        case 1:
          this.value--;
          this.minusDisabled = true;
          break;
        case 2:
          this.value--;
          this.ingredientClassName =
            "pizza__filling pizza__" + this.ingredientClass;
          break;
        case 3:
          this.value--;
          this.ingredientClassName =
            "pizza__filling pizza__" +
            this.ingredientClass +
            " pizza__filling--second";
          this.plusDisabled = false;
          this.$emit("getNotDraggableBoolean", this.ingredientId, false);
          break;
      }
      this.$emit(
        "getItemCount",
        this.value,
        this.ingredientId,
        this.ingredientClassName,
        this.ingredientPrice
      );
    },
    plus() {
      switch (this.value) {
        case 0:
          this.value++;
          this.minusDisabled = false;
          this.ingredientClassName =
            "pizza__filling pizza__" + this.ingredientClass;
          break;
        case 1:
          this.value++;
          this.ingredientClassName =
            "pizza__filling pizza__" +
            this.ingredientClass +
            " pizza__filling--second";
          break;
        case 2:
          this.value++;
          this.ingredientClassName =
            "pizza__filling pizza__" +
            this.ingredientClass +
            " pizza__filling--third";
          this.plusDisabled = true;
          this.$emit("getNotDraggableBoolean", this.ingredientId, true);
          break;
      }
      this.$emit(
        "getItemCount",
        this.value,
        this.ingredientId,
        this.ingredientClassName,
        this.ingredientPrice
      );
    },
    setDraggable() {
      if (this.value < 3) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    clear: function (clear) {
      if (clear === true) {
        console.log(clear);
        this.value = 0;
        this.minusDisabled = true;
        this.plusDisabled = false;
        if (this.ingredientId === 15) {
          this.$emit("clearExecuted");
        }
      }
    },
  },
};
</script>
