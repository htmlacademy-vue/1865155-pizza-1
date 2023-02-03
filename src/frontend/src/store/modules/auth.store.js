const newAddressDefaultState = () => {
  return {
    id: null,
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
  };
};

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null,
    addresses: [],
    newAddress: {
      id: null,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  },

  getters: {
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },
  mutations: {
    setAuthStatus(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setAddresses(state, payload) {
      state.addresses = payload;
    },
    updateAddressId(state, payload) {
      state.newAddress.id = payload;
    },
    updateAddressName(state, payload) {
      state.newAddress.name = payload;
    },
    updateAddressStreet(state, payload) {
      state.newAddress.street = payload;
    },
    updateAddressHouse(state, payload) {
      state.newAddress.building = payload;
    },
    updateAddressApartment(state, payload) {
      state.newAddress.flat = payload;
    },
    updateAddressComment(state, payload) {
      state.newAddress.comment = payload;
    },
    setNewAddressDefaultState(state) {
      Object.assign(state.newAddress, newAddressDefaultState());
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit("setAuthStatus", true);
        commit("setUser", data);
        dispatch("queryAddresses");
        dispatch("Orders/queryOrders", "", { root: true });
      } catch {
        dispatch("logout", false);
      }
    },
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit("setAuthStatus", false);
      commit("setUser", null);
    },
    async queryAddresses({ commit }) {
      const data = await this.$api.addresses.query();
      commit("setAddresses", data);
    },
    async postAddresses({ state, commit, dispatch }) {
      let payload = { ...state.newAddress };
      delete payload.id;
      payload.userId = state.user.id;
      await this.$api.addresses.post(payload);
      dispatch("queryAddresses");
      commit("setNewAddressDefaultState");
    },
    async putAddresses({ state, commit, dispatch }) {
      let payload = { ...state.newAddress };
      payload.userId = state.user.id;
      await this.$api.addresses.put(payload);
      dispatch("queryAddresses");
      commit("setNewAddressDefaultState");
    },
    async deleteAddresses({ state, commit, dispatch }) {
      let payload = state.newAddress.id;
      await this.$api.addresses.delete(payload);
      dispatch("queryAddresses");
      commit("setNewAddressDefaultState");
    },
  },
};
