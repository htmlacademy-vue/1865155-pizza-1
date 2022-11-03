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
            <RadioButton
              name="sauce"
              :value="getSauceValue(sauce.id)"
              :id="sauce.id"
              :price="sauce.price"
              :myPizzaItemId="myPizzaSauceId"
              @getValueFromRadio="sendValue"
            />
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
              :draggable="isDraggable(ingredient.id)"
              @dragstart="onDrag($event, ingredient)"
            >
              <SelectorItem
                :ingredientName="ingredient.name"
                :class="getIngredientClassName(ingredient.image)"
              />
              <ItemCounter
                :count="getCount(ingredient.id)"
                @update:itemCount="
                  updateItemCount($event, ingredient.id, ingredient.price)
                "
              />
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
import RadioButton from "/src/common/components/RadioButton.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    SelectorItem,
  },

  methods: {
    getCount(id) {
      return this.myPizzaIngredients.find((item) => item.id === id)?.count || 0;
    },
    updateItemCount(count, id, price) {
      this.$store.commit("Builder/addIngredient", {
        id: id,
        count: count,
        price: price,
      });
    },
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
    sendValue(data, id, price) {
      this.$store.commit("Builder/setSauce", {
        value: data,
        id: id,
        price: price,
      });
    },
    isDraggable(id) {
      let index = this.myPizzaIngredients.findIndex((item) => item.id === id);
      if (
        index === -1 ||
        this.myPizzaIngredients[
          this.myPizzaIngredients.findIndex((item) => item.id === id)
        ].count < 3
      ) {
        return true;
      } else {
        return false;
      }
    },
    onDrag(e, ingredient) {
      let index = this.myPizzaIngredients.findIndex(
        (item) => item.id === ingredient.id
      );
      let count = 0;
      if (index === -1) {
        count = 1;
      } else {
        count =
          this.myPizzaIngredients[
            this.myPizzaIngredients.findIndex(
              (item) => item.id === ingredient.id
            )
          ].count + 1;
      }
      e.dataTransfer.setData("ingredientCount", count);
      e.dataTransfer.setData("ingredientId", ingredient.id);
      e.dataTransfer.setData("ingredientPrice", ingredient.price);
    },
  },
  computed: {
    myPizzaSauceId() {
      return this.$store.state.Builder.myPizza.sauce.id;
    },
    myPizzaIngredients() {
      return this.$store.state.Builder.myPizza.ingredients;
    },
    pizzas() {
      return this.$store.state.Builder.pizzas;
    },
  },
};
</script>
