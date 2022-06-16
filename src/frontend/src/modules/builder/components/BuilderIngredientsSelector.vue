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
              :draggable="!notdraggable[ingredient.id]"
              @dragstart="onDrag($event, ingredient)"
            >
              <SelectorItem
                :ingredientName="ingredient.name"
                :ingredientClass="getIngredientClassName(ingredient.image)"
              />
              <ItemCounter
                :ingredientId="ingredient.id"
                :ingredientClass="getIngredientClassName(ingredient.image)"
                :ingredientPrice="ingredient.price"
                :clear="clear"
                @clearExecuted="clearExecuted"
                @getItemCount="sendCount"
                @getNotDraggableBoolean="setNotDraggable"
                ref="childItemCounter"
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

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton: () => import("/src/common/components/RadioButton.vue"),
    ItemCounter,
    SelectorItem,
  },
  data() {
    return {
      notdraggable: [],
    };
  },
  props: {
    pizzas: {},
    clear: {},
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
    sendValue(data, id, price) {
      this.$emit("getValueFromBuilder", data, "sauce", id, price);
    },
    sendCount(count, id, className, price) {
      this.$emit("getCountFromBuilder", count, id, className, price);
    },
    setNotDraggable(id, boolean) {
      this.notdraggable[id] = boolean;
      this.notdraggable = [...this.notdraggable]; //без этого не перерендерит draggable у списка ингредиентов
    },
    onDrag(e, ingredient) {
      e.dataTransfer.setData("ingredientId", ingredient.id);
    },
    childMethod(id) {
      this.$refs.childItemCounter[id - 1].plus();
    },
    clearExecuted() {
      this.$emit("clearExecuted");
    },
  },
};
</script>
