<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="sauce in pizzas.sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <RadioButton name="sauce" :value="getSauceValue(sauce.id)" />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizzas.ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <SelectorItem
                :ingredientName="ingredient.name"
                :ingredientClass="getIngredientClassName(ingredient.image)"
              />
              <ItemCounter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "/src/common/components/ItemCounter.vue";
import SelectorItem from "/src/common/components/SelectorItem.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton: () => import("/src/common/components/RadioButton.vue"),
    ItemCounter,
    SelectorItem,
  },
  props: {
    pizzas: {},
  },

  methods: {
    getSauceValue(sauceId) {
      if (sauceId === 1) {
        return "tomato";
      } else {
        return "creamy";
      }
    },
    getIngredientClassName(imgUrl) {
      return "filling--" + imgUrl.match(/.*\/(.*)(\..*)$/)[1];
    },
  },
};
</script>
