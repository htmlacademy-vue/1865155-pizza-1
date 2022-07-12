<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :pizzas="pizzas"
            :myPizzaDough="myPizza.dough"
            @getValueFromBuilder="editValue"
          />
          <BuilderSizeSelector
            :pizzas="pizzas"
            :myPizzaSize="myPizza.size"
            @getValueFromBuilder="editValue"
          />
          <BuilderIngredientsSelector
            :pizzas="pizzas"
            :myPizzaSauce="myPizza.sauce"
            :myPizzaIngredients="myPizza.ingredients"
            @getValueFromBuilder="editValue"
            @updateItemCount="updateItemCount"
          />

          <div class="content__pizza">
            <BuilderNameSelector
              v-model="myPizza.name"
              @getNameFromBuilder="editValue"
            />
            <BuilderPizzaView
              :pizzaFoundationClass="pizzaFoundationClass()"
              :pizzas="pizzas"
              :myPizzaIngredients="myPizza.ingredients"
              @getCountFromDrop="getCountDrop"
            />
            <BuilderPriceCounter
              :price="price"
              :pizzaName="myPizza.name"
              :ingredientsCount="myPizza.ingredients.length"
              @getBake="addToCart"
            />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import miscs from "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import users from "@/static/user.json";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter.vue";
import BuilderNameSelector from "../modules/builder/components/BuilderNameSelector.vue";

export default {
  name: "Index",
  components: {
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
    editValue(data, prop, id, price) {
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
    updateItemCount(newValue, id, price) {
      let index = this.myPizza.ingredients.findIndex((item) => item.id === id);
      if (index === -1) {
        this.myPizza.ingredients.push({
          id: id,
          count: newValue,
          price: price,
        });
        this.myPizza.ingredients.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        if (newValue === 0) {
          this.myPizza.ingredients.splice(index, 1);
        } else {
          this.myPizza.ingredients[index].count = newValue;
          this.myPizza.ingredients[index].price = price;
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
        let price = this.cart.reduce((a, b) => a + b["price"], 0);
        this.$emit("updateCartPrice", price);
        return price;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style></style>
