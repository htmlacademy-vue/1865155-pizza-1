<template>
  <input
    type="radio"
    :value="value"
    :checked="id === myPizzaItemId"
    @click="$emit('getValueFromRadio', value, id, price)"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    myPizzaItemId: {
      type: Number,
      required: true,
    },
  },
};
</script>
