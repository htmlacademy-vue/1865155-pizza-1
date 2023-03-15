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
            :myPizzaItemId="myPizzaDoughId"
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
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
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
      this.$store.commit("Builder/setDough", {
        value: data,
        id: id,
        price: price,
      });
    },
  },
  computed: {
    myPizzaDoughId() {
      return this.$store.state.Builder.myPizza.dough.id;
    },
    pizzas() {
      return this.$store.state.Builder.pizzas;
    },
  },
};
</script>
