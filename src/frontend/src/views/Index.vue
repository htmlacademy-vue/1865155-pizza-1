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
            имя: {{ myPizza.name }}<br />
            тесто: {{ myPizza.dough }}<br />
            размер: {{ myPizza.size }}<br />
            соус: {{ myPizza.sauce }}<br />
            ингридиенты: {{ myPizza.ingredients }}<br />
            цена: {{ price }}<br />
            корзина: {{ cart }}<br />
            признак очистки: {{ clear }}
            <h1 class="title title--big">Конструктор пиццы</h1>

            <BuilderDoughSelector
              :pizzas="pizzas"
              @getValueFromBuilder="getValue"
            />
            <BuilderSizeSelector
              :pizzas="pizzas"
              @getValueFromBuilder="getValue"
            />
            <BuilderIngredientsSelector
              :pizzas="pizzas"
              :clear="clear.ingredients"
              @clearExecuted="clearIngredientsExecuted"
              @getValueFromBuilder="getValue"
              @getCountFromBuilder="getCount"
              ref="childBuilderIngredientsSelector"
            />

            <div class="content__pizza">
              <BuilderNameSelector
                :clear="clear.name"
                @clearExecuted="clearNameExecuted"
                @getNameFromBuilder="getValue"
              />
              <BuilderPizzaView
                :pizzaFoundationClass="pizzaFoundationClass()"
                :pizzaIngredientsClass="myPizza.ingredients"
                @getCountFromDrop="getCountDrop"
              />
              <BuilderPriceCounter
                :price="price"
                :isDisabled="checkName()"
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
          value: "",
          id: "",
          price: "",
        },
        size: {
          value: "",
          id: "",
        },
        sauce: {
          value: "",
          id: "",
          price: "",
        },
        ingredients: [],
      },
      cart: [],
      clear: {
        name: false,
        ingredients: false,
      },
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
          break;
        case "sauce":
          this.myPizza.sauce.value = data;
          this.myPizza.sauce.id = id;
          this.myPizza.sauce.price = price;
          break;
      }
    },
    getCount(count, id, className, price) {
      let index = this.myPizza.ingredients.findIndex((item) => item.id === id);
      if (index === -1) {
        this.myPizza.ingredients.push({
          id: id,
          count: count,
          className: className,
          price: price,
        });
        this.myPizza.ingredients.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        if (count === 0) {
          this.myPizza.ingredients.splice(index, 1);
        } else {
          this.myPizza.ingredients[index].count = count;
          this.myPizza.ingredients[index].className = className;
          this.myPizza.ingredients[index].price = price;
        }
      }
    },
    getCountDrop(id) {
      this.$refs.childBuilderIngredientsSelector.childMethod(id);
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
    checkName() {
      if (
        this.myPizza.name != "" &&
        this.myPizza.ingredients.length != 0 &&
        this.myPizza.dough.value != "" &&
        this.myPizza.size.value != "" &&
        this.myPizza.sauce.value != ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    addToCart() {
      this.cart.push({
        id: this.cart.length,
        name: this.myPizza.name,
        price: this.price,
      });
      this.myPizza.name = "";
      this.myPizza.dough.value = "";
      this.myPizza.dough.id = "";
      this.myPizza.dough.price = "";
      this.myPizza.size.value = "";
      this.myPizza.size.id = "";
      this.myPizza.sauce.value = "";
      this.myPizza.sauce.id = "";
      this.myPizza.sauce.price = "";
      this.myPizza.ingredients.length = 0;
      this.clear.name = true;
      this.clear.ingredients = true;
    },
    clearNameExecuted() {
      this.clear.name = false;
    },
    clearIngredientsExecuted() {
      this.clear.ingredients = false;
    },
  },
  computed: {
    price: function () {
      if (
        this.myPizza.ingredients.length != 0 &&
        this.myPizza.dough.price != "" &&
        this.myPizza.size.id != "" &&
        this.myPizza.sauce.price != ""
      ) {
        return (
          this.myPizza.size.id *
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
