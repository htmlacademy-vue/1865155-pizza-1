<template>
  <span class="filling" :class="ingredientClass">{{ ingredientName }} </span>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    ingredientName: {},
    ingredientClass: {},
  },
};
</script>
