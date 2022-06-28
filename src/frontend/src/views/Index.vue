<template>
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="css/style.min.css" />
      <title>V!U!E! Pizza - главная</title>
    </head>
    <body>
      <AppLayout :cartPrice="cartPrice" />

      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <BuilderDoughSelector
              :pizzas="pizzas"
              :myPizzaDough="myPizza.dough"
              @getValueFromBuilder="getValue"
            />
            <BuilderSizeSelector
              :pizzas="pizzas"
              :myPizzaSize="myPizza.size"
              @getValueFromBuilder="getValue"
            />
            <BuilderIngredientsSelector
              :pizzas="pizzas"
              :myPizzaSauce="myPizza.sauce"
              :myPizzaIngredients="myPizza.ingredients"
              @getValueFromBuilder="getValue"
              @updateItemCount="updateItemCount"
            />

            <div class="content__pizza">
              <BuilderNameSelector
                v-model="myPizza.name"
                @getNameFromBuilder="getValue"
              />
              <BuilderPizzaView
                :pizzaFoundationClass="pizzaFoundationClass()"
                :pizzas="pizzas"
                :myPizzaIngredients="myPizza.ingredients"
                @getCountFromDrop="getCountDrop"
              />
              <BuilderPriceCounter
                :price="price"
                :myPizza="myPizza"
                @getBake="addToCart"
              />
            </div>
          </div>
        </form>
      </main>
    </body>
  </html>
</template>

<script>
import miscs from "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import users from "@/static/user.json";
import AppLayout from "../layouts/AppLayout.vue";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter.vue";
import BuilderNameSelector from "../modules/builder/components/BuilderNameSelector.vue";

export default {
  name: "Index",
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderNameSelector,
  },
  data() {
    return {
      miscs,
      pizzas,
      users,
      myPizza: {
        name: "",
        dough: {
          value: "light",
          id: 1,
          price: 300,
        },
        size: {
          value: "normal",
          id: 2,
          multiplier: 2,
        },
        sauce: {
          value: "creamy",
          id: 2,
          price: 50,
        },
        ingredients: [],
      },
      cart: [],
    };
  },
  methods: {
    getValue(data, prop, id, price) {
      switch (prop) {
        case "name":
          this.myPizza.name = data;
          break;
        case "dough":
          this.myPizza.dough.value = data;
          this.myPizza.dough.id = id;
          this.myPizza.dough.price = price;
          break;
        case "size":
          this.myPizza.size.value = data;
          this.myPizza.size.id = id;
          this.myPizza.size.multiplier = price;
          break;
        case "sauce":
          this.myPizza.sauce.value = data;
          this.myPizza.sauce.id = id;
          this.myPizza.sauce.price = price;
          break;
      }
    },
    updateItemCount(newValue, id, newPrice) {
      let index = this.myPizza.ingredients.findIndex((item) => item.id === id);
      if (index === -1) {
        this.myPizza.ingredients.push({
          id: id,
          count: newValue,
          price: newPrice,
        });
        this.myPizza.ingredients.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        if (newValue === 0) {
          this.myPizza.ingredients.splice(index, 1);
        } else {
          this.myPizza.ingredients[index].count = newValue;
          this.myPizza.ingredients[index].price = newPrice;
        }
      }
    },
    getCountDrop(count, id, className, price) {
      this.updateItemCount(Number(count), Number(id), className, Number(price));
    },
    pizzaFoundationClass() {
      if (this.myPizza.dough.value && this.myPizza.sauce.value) {
        switch (this.myPizza.dough.value) {
          case "light":
            switch (this.myPizza.sauce.value) {
              case "tomato":
                return "pizza--foundation--small-tomato";
              case "creamy":
                return "pizza--foundation--small-creamy";
            }
            break;
          case "large":
            switch (this.myPizza.sauce.value) {
              case "tomato":
                return "pizza--foundation--big-tomato";
              case "creamy":
                return "pizza--foundation--big-creamy";
            }
            break;
        }
      } else {
        return "pizza--foundation--big-tomato";
      }
    },
    addToCart() {
      this.cart.push({
        id: this.cart.length,
        name: this.myPizza.name,
        price: this.price,
      });
      this.myPizza.name = "";
      this.myPizza.dough.value = "light";
      /* this.$set() и  Object.assign() не помогают вызвать перерендер
      RadioButton в выборе по дефолту соуса, размера, теста
      вызов this.$forceUpdate() в дочернем компоненте тоже не помог
      биндинг checked у RadioButton через метод тоже не помог */
      this.myPizza.dough.id = 1;
      this.myPizza.dough.price = 300;
      this.myPizza.size.value = "normal";
      this.myPizza.size.id = 2;
      this.myPizza.size.multiplier = 2;
      this.myPizza.sauce.value = "creamy";
      this.myPizza.sauce.id = 2;
      this.myPizza.sauce.price = 50;
      this.myPizza.ingredients.length = 0;
      this.myPizza.ingredients = [...this.myPizza.ingredients];
    },
  },
  computed: {
    price: function () {
      if (this.myPizza.ingredients.length != 0) {
        return (
          this.myPizza.size.multiplier *
          (this.myPizza.dough.price +
            this.myPizza.sauce.price +
            this.myPizza.ingredients.reduce(
              (a, b) => a + b["price"] * b["count"],
              0
            ))
        );
      } else {
        return 0;
      }
    },
    cartPrice: function () {
      if (this.cart.lenght != 0) {
        return this.cart.reduce((a, b) => a + b["price"], 0);
      } else {
        return 0;
      }
    },
  },
};
</script>

<style></style>
