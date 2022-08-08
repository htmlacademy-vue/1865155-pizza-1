<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in pizzas.dough"
          :key="dough.id"
          class="dough__input"
          :class="{
            'dough__input--light': dough.id === 1,
            'dough__input--large': dough.id === 2,
          }"
        >
          <RadioButton
            name="dought"
            :value="getDoughValue(dough.id)"
            :id="dough.id"
            :price="dough.price"
            :myPizzaItemId="myPizzaDough.id"
            class="visually-hidden"
            @getValueFromRadio="sendValue"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "/src/common/components/RadioButton.vue";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    myPizzaDough: {
      type: Object,
      required: true,
    },
    pizzas: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDoughValue(doughId) {
      if (doughId === 1) {
        return "light";
      } else {
        return "large";
      }
    },
    sendValue(data, id, price) {
      this.$emit("getValueFromBuilder", data, "dough", id, price);
    },
  },
};
</script>
