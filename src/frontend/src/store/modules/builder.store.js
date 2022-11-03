import pizzas from "@/static/pizza.json";
import users from "@/static/user.json";

export default {
  namespaced: true,
  state: {
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
  },
  getters: {},
  mutations: {
    setDough(state, payload) {
      state.myPizza.dough = { ...payload };
    },
    setSize(state, payload) {
      state.myPizza.size = { ...payload };
    },
    setSauce(state, payload) {
      state.myPizza.sauce = { ...payload };
    },
    addIngredient(state, payload) {
      let index = state.myPizza.ingredients.findIndex(
        (item) => item.id === payload.id
      );
      if (index === -1) {
        state.myPizza.ingredients.push({
          id: payload.id,
          count: payload.count,
          price: payload.price,
        });
        state.myPizza.ingredients.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        if (payload.count === 0) {
          state.myPizza.ingredients.splice(index, 1);
        } else {
          state.myPizza.ingredients[index].count = payload.count;
          state.myPizza.ingredients[index].price = payload.price;
        }
      }
    },
    clearIngredients(state) {
      state.myPizza.ingredients.length = 0;
    },
    clearId(state) {
      delete state.myPizza.id;
    },
    updateName(state, payload) {
      state.myPizza.name = payload;
    },
    restorePizza(state, payload) {
      state.myPizza = { ...payload.product };
      state.myPizza.id = payload.index;
    },
  },
  actions: {},
};
