const myPizzaDefaultState = () => {
  return {
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
  };
};

export default {
  namespaced: true,
  state: {
    pizzas: {
      dough: [],
      ingredients: [],
      misc: [],
      sauces: [],
      sizes: [],
    },
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
  getters: {
    getPriceByProduct: (state) => (product) => {
      let multiplier = state.pizzas.sizes.find(
        (item) => item.id === product.sizeId
      ).multiplier;
      let doughPrice = state.pizzas.dough.find(
        (item) => item.id === product.doughId
      ).price;
      let saucePrice = state.pizzas.sauces.find(
        (item) => item.id === product.sauceId
      ).price;
      let ingredientsPrice = 0;
      product.ingredients.forEach(
        (element) =>
          (ingredientsPrice +=
            state.pizzas.ingredients.find(
              (item) => item.id === element.ingredientId
            ).price * element.quantity)
      );
      return multiplier * (doughPrice + saucePrice + ingredientsPrice);
    },
  },
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
    setMyPizzaDefaultState(state) {
      Object.assign(state.myPizza, myPizzaDefaultState());
    },
    updateName(state, payload) {
      state.myPizza.name = payload;
    },
    restorePizza(state, payload) {
      state.myPizza.name = payload.product.name;
      state.myPizza.dough = state.pizzas.dough.find(
        (item) => item.id === payload.product.doughId
      );
      state.myPizza.size = state.pizzas.sizes.find(
        (item) => item.id === payload.product.sizeId
      );
      state.myPizza.sauce = state.pizzas.sauces.find(
        (item) => item.id === payload.product.sauceId
      );
      payload.product.ingredients.forEach((element) => {
        let index = state.pizzas.ingredients.findIndex(
          (item) => item.id === element.ingredientId
        );
        state.myPizza.ingredients.push({
          id: state.pizzas.ingredients[index].id,
          count: element.quantity,
          price: state.pizzas.ingredients[index].price,
        });
      });
      state.myPizza.id = payload.index;
    },
    initDough(state, payload) {
      state.pizzas.dough = payload;
    },
    initIngredients(state, payload) {
      state.pizzas.ingredients = payload;
    },
    initSauces(state, payload) {
      state.pizzas.sauces = payload;
    },
    initSizes(state, payload) {
      state.pizzas.sizes = payload;
    },
  },
  actions: {
    async queryDough({ commit }) {
      const data = await this.$api.dough.query();
      commit("initDough", data);
    },
    async queryIngredients({ commit }) {
      const data = await this.$api.ingredients.query();
      commit("initIngredients", data);
    },
    async querySauces({ commit }) {
      const data = await this.$api.sauces.query();
      commit("initSauces", data);
    },
    async querySizes({ commit }) {
      const data = await this.$api.sizes.query();
      commit("initSizes", data);
    },
  },
};
