import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import miscsSource from "@/static/misc.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    miscsSource,
    miscs: [],
    cartPrice: 0,
    cart: {
      main: [],
      delivery: 1,
    },
    user: {
      id: null,
      name: "",
      email: "",
      avatar: "",
      phone: "",
    },
    popupVisible: false,
  },
  getters: {
    setCartPrice(state) {
      if (state.cart.main.length != 0) {
        let price = 0;
        state.cart.main.forEach(function (item) {
          price += item.price * item.count;
        });
        if (state.miscs.length != 0) {
          state.miscs.forEach(function (item) {
            price += item.price * item.count;
          });
        }
        state.cartPrice = price;
      } else {
        state.cartPrice = 0;
      }
    },
  },
  mutations: {
    addToCart(state, payload) {
      if (state.cart.main.length === 0) {
        state.miscs = [...miscsSource];
        state.miscs.forEach((element) => {
          Vue.set(element, "count", 1);
        });
      }
      if (typeof payload.myPizza.id != "undefined") {
        state.cart.main[payload.myPizza.id].name = payload.myPizza.name;
        state.cart.main[payload.myPizza.id].dough = payload.myPizza.dough;
        state.cart.main[payload.myPizza.id].size = payload.myPizza.size;
        state.cart.main[payload.myPizza.id].sauce = payload.myPizza.sauce;
        state.cart.main[payload.myPizza.id].ingredients = [
          ...payload.myPizza.ingredients,
        ];
        state.cart.main[payload.myPizza.id].price = payload.price;
      } else {
        state.cart.main.push({
          name: payload.myPizza.name,
          dough: payload.myPizza.dough,
          size: payload.myPizza.size,
          sauce: payload.myPizza.sauce,
          ingredients: [...payload.myPizza.ingredients],
          count: 1,
          price: payload.price,
        });
      }
    },
    changeCount(state, payload) {
      if (payload.newCount <= 0) {
        state.cart.main.splice(payload.index, 1);
      } else {
        state.cart.main[payload.index].count = payload.newCount;
      }
    },
    changeMiscCount(state, payload) {
      if (payload.newCount <= 0) {
        state.miscs.splice(payload.index, 1);
      } else {
        state.miscs[payload.index].count = payload.newCount;
      }
    },
    changeDeliveryType(state, payload) {
      state.cart.delivery = Number(payload.value);
    },
    popupVisible(state, payload) {
      state.popupVisible = payload;
    },
  },
  actions: {},
  modules,
});
