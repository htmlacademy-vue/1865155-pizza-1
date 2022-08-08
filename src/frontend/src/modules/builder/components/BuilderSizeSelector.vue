<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzas.sizes"
          :key="size.id"
          class="diameter__input"
          :class="{
            'diameter__input--small': size.id === 1,
            'diameter__input--normal': size.id === 2,
            'diameter__input--big': size.id === 3,
          }"
        >
          <RadioButton
            name="diameter"
            :value="getSizeValue(size.id)"
            :id="size.id"
            :price="size.multiplier"
            class="visually-hidden"
            :myPizzaItemId="myPizzaSize.id"
            @getValueFromRadio="sendValue"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "/src/common/components/RadioButton.vue";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  props: {
    myPizzaSize: {
      type: Object,
      required: true,
    },
    pizzas: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getSizeValue(sizeId) {
      if (sizeId === 1) {
        return "small";
      } else if (sizeId === 2) {
        return "normal";
      } else {
        return "big";
      }
    },
    sendValue(data, id, price) {
      this.$emit("getValueFromBuilder", data, "size", id, price);
    },
  },
};
</script>
