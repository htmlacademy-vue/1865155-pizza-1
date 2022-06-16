<template>
  <input
    type="radio"
    :name="names"
    :value="value"
    :class="classes"
    @click="sendValue"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    names: {},
    value: {},
    classes: {},
    id: {},
    price: {},
  },

  methods: {
    sendValue() {
      this.$emit("getValueFromRadio", this.value, this.id, this.price);
    },
  },
};
</script>
