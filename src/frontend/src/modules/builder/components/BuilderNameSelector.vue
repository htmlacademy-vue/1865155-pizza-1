<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="value"
      @input="$emit('getNameFromBuilder', $event.target.value, 'name')"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderNameSelector",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
