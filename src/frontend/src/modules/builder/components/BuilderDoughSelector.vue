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
            class="visually-hidden"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton: () => import("/src/common/components/RadioButton.vue"),
  },
  props: {
    pizzas: {},
  },

  methods: {
    getDoughValue(doughId) {
      if (doughId === 1) {
        return "light";
      } else {
        return "large";
      }
    },
  },
};
</script>
