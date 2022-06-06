<template>
  <input type="radio" :name="names" :value="value" :class="classes" />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    names: {},
    value: {},
    classes: {},
  },

  methods: {},
};
</script>
