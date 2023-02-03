import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import vuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const newOrderDefaultState = () => {
  return {
    phone: "",
    address: null,
    pizzas: [],
    misc: [],
  };
};

export default new Vuex.Store({
  plugins: [vuexPlugins],
  state: {
    miscsSource: [],
    newOrder: {
      phone: "",
      address: null,
      pizzas: [],
      misc: [],
    },
    deliveryType: 1,
  },
  getters: {
    getCartPrice(state) {
      if (state.newOrder.pizzas.length != 0) {
        let price = 0;
        state.newOrder.pizzas.forEach(function (pizza) {
          let multiplier = state.Builder.pizzas.sizes.find(
            (item) => item.id === pizza.sizeId
          ).multiplier;
          let doughPrice = state.Builder.pizzas.dough.find(
            (item) => item.id === pizza.doughId
          ).price;
          let saucePrice = state.Builder.pizzas.sauces.find(
            (item) => item.id === pizza.sauceId
          ).price;
          let ingredientsPrice = 0;
          pizza.ingredients.forEach(
            (element) =>
              (ingredientsPrice +=
                state.Builder.pizzas.ingredients.find(
                  (item) => item.id === element.ingredientId
                ).price * element.quantity)
          );
          let pizzaPrice =
            multiplier * (doughPrice + saucePrice + ingredientsPrice);
          let itemPrice = pizzaPrice * pizza.quantity;
          price += itemPrice;
        });
        if (state.newOrder.misc.length != 0) {
          state.newOrder.misc.forEach(function (miscitem) {
            price +=
              state.miscsSource.find((item) => item.id === miscitem.miscId)
                .price * miscitem.quantity;
          });
        }
        return price;
      } else {
        if (state.Builder.myPizza.ingredients.length != 0) {
          let pizzaPrice =
            state.Builder.myPizza.size.multiplier *
            (state.Builder.myPizza.dough.price +
              state.Builder.myPizza.sauce.price +
              state.Builder.myPizza.ingredients.reduce(
                (a, b) => a + b["price"] * b["count"],
                0
              ));
          return pizzaPrice;
        } else {
          return 0;
        }
      }
    },
  },
  mutations: {
    addToCart(state, payload) {
      if (state.newOrder.pizzas.length === 0) {
        state.miscsSource.forEach((element) => {
          state.newOrder.misc.push({
            miscId: element.id,
            quantity: 1,
          });
        });
      }
      let myingredients = [];
      payload.myPizza.ingredients.forEach((element) =>
        myingredients.push({
          ingredientId: element.id,
          quantity: element.count,
        })
      );
      if (typeof payload.myPizza.id != "undefined") {
        state.newOrder.pizzas[payload.myPizza.id].name = payload.myPizza.name;
        state.newOrder.pizzas[payload.myPizza.id].sauceId =
          payload.myPizza.sauce.id;
        state.newOrder.pizzas[payload.myPizza.id].doughId =
          payload.myPizza.dough.id;
        state.newOrder.pizzas[payload.myPizza.id].sizeId =
          payload.myPizza.size.id;
        state.newOrder.pizzas[payload.myPizza.id].ingredients = [
          ...myingredients,
        ];
      } else {
        state.newOrder.pizzas.push({
          name: payload.myPizza.name,
          sauceId: payload.myPizza.sauce.id,
          doughId: payload.myPizza.dough.id,
          sizeId: payload.myPizza.size.id,
          ingredients: [...myingredients],
          quantity: 1,
        });
      }
    },
    changeCount(state, payload) {
      if (payload.newCount <= 0) {
        state.newOrder.pizzas.splice(payload.index, 1);
      } else {
        state.newOrder.pizzas[payload.index].quantity = payload.newCount;
      }
    },
    changeMiscCount(state, payload) {
      if (payload.newCount <= 0) {
        state.newOrder.misc.splice(payload.index, 1);
      } else {
        state.newOrder.misc[payload.index].quantity = payload.newCount;
      }
    },
    initMisc(state, payload) {
      state.miscsSource = payload;
    },
    setNewOrderDefaultState(state) {
      Object.assign(state.newOrder, newOrderDefaultState());
    },
    changeDeliveryType(state, payload) {
      state.deliveryType = payload;
    },
    setOrderPhone(state, payload) {
      state.newOrder.phone = payload;
    },
    setOrderAddress(state, payload) {
      state.newOrder.address = payload;
    },
    setOrderAddressName(state, payload) {
      console.log(payload);
      state.newOrder.address.name = payload;
    },
    setOrderAddressStreet(state, payload) {
      state.newOrder.address.street = payload;
    },
    setOrderAddressHouse(state, payload) {
      state.newOrder.address.building = payload;
    },
    setOrderAddressApartment(state, payload) {
      state.newOrder.address.flat = payload;
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch("Builder/queryDough");
      dispatch("Builder/queryIngredients");
      dispatch("Builder/querySauces");
      dispatch("Builder/querySizes");
      dispatch("queryMisc");
    },
    async queryMisc({ commit }) {
      const data = await this.$api.misc.query();
      commit("initMisc", data);
    },
  },
  modules,
});
