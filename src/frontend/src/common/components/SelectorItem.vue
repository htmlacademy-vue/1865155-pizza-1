<template>
  <span class="filling">{{ ingredientName }} </span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    ingredientName: {
      type: String,
      required: true,
    },
  },
};
</script>
