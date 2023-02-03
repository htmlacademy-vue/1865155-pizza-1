export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    getOrderPrice: (state, _, rootState) => (id) => {
      let myOrder = state.orders.find((order) => order.id === id);
      if (myOrder.orderPizzas.length != 0) {
        let price = 0;
        myOrder.orderPizzas.forEach(function (pizza) {
          let sizes = rootState.Builder.pizzas.sizes;
          let multiplier = sizes.find(
            (item) => item.id === pizza.sizeId
          ).multiplier;
          let doughPrice = rootState.Builder.pizzas.dough.find(
            (item) => item.id === pizza.doughId
          ).price;
          let saucePrice = rootState.Builder.pizzas.sauces.find(
            (item) => item.id === pizza.sauceId
          ).price;
          let ingredientsPrice = 0;
          pizza.ingredients.forEach(
            (element) =>
              (ingredientsPrice +=
                rootState.Builder.pizzas.ingredients.find(
                  (item) => item.id === element.ingredientId
                ).price * element.quantity)
          );
          let pizzaPrice =
            multiplier * (doughPrice + saucePrice + ingredientsPrice);
          let itemPrice = pizzaPrice * pizza.quantity;
          price += itemPrice;
        });
        if (myOrder.orderMisc.length != 0) {
          myOrder.orderMisc.forEach(function (misc) {
            price +=
              rootState.miscsSource.find((item) => item.id === misc.miscId)
                .price * misc.quantity;
          });
        }
        return price;
      } else {
        return 0;
      }
    },
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },
    resetOrders(state) {
      state.orders = [];
    },
  },
  actions: {
    async queryOrders({ commit }) {
      const data = await this.$api.orders.query();
      commit("setOrders", data);
    },
    async postOrders({ commit, dispatch, rootState }, payload) {
      let order = new Object();
      order = { ...payload };
      await this.$api.orders.post(order);
      if (rootState.Auth.user != null) {
        dispatch("queryOrders");
      }
      commit("setNewOrderDefaultState", "", { root: true });
      if (rootState.Auth.user != null) {
        dispatch("Auth/queryAddresses", "", { root: true });
      }
      commit("Auth/setNewAddressDefaultState", "", { root: true });
    },
    async deleteOrder({ dispatch }, id) {
      await this.$api.orders.delete(id);
      dispatch("queryOrders");
    },
    repeatOrder({ state, commit, rootState }, payload) {
      let myOrder = state.orders.find((order) => order.id === payload);
      let address =
        rootState.Auth.addresses.find(
          (item) => item.id === myOrder.addressId
        ) ?? null;
      commit("setOrderAddress", address, { root: true });
      if (address === null) {
        commit("changeDeliveryType", 1, { root: true });
      } else {
        commit("changeDeliveryType", 3, { root: true });
        commit("Auth/updateAddressId", address.id, { root: true });
        commit("Auth/updateAddressName", address.name, { root: true });
        commit("Auth/updateAddressStreet", address.street, { root: true });
        commit("Auth/updateAddressHouse", address.building, { root: true });
        commit("Auth/updateAddressApartment", address.flat, { root: true });
        commit("Auth/updateAddressComment", address.comment, { root: true });
      }
      commit("setOrderPhone", myOrder.phone, { root: true });
      rootState.newOrder.misc = [];
      myOrder.orderMisc.forEach((misc) => {
        let myMisc = new Object();
        myMisc.miscId = misc.miscId;
        myMisc.quantity = misc.quantity;
        rootState.newOrder.misc.push(myMisc);
      });
      rootState.newOrder.pizzas = [];
      myOrder.orderPizzas.forEach((pizza) => {
        let myPizza = new Object();
        myPizza.doughId = pizza.doughId;
        myPizza.name = pizza.name;
        myPizza.quantity = pizza.quantity;
        myPizza.sauceId = pizza.sauceId;
        myPizza.sizeId = pizza.sizeId;
        myPizza.ingredients = [];
        pizza.ingredients.forEach((ingredient) => {
          let myIngredient = new Object();
          myIngredient.ingredientId = ingredient.ingredientId;
          myIngredient.quantity = ingredient.quantity;
          myPizza.ingredients.push(myIngredient);
        });
        rootState.newOrder.pizzas.push(myPizza);
      });
    },
  },
};
