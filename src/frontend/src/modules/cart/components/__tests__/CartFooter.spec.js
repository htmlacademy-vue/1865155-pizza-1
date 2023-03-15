import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import index from "@/store/index";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import miscsSource from "/home/it/pizza-project/src/frontend/src/static/misc.json";
import CartFooter from "@/modules/cart/components/CartFooter";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartFooter", () => {
  let store;
  let wrapper;
  const pizzasMock = [
    {
      doughId: 2,
      name: "ветчина",
      quantity: 1,
      sauceId: 2 /* в json в отличии от API id 2 соответствует сливочному, а не томатному */,
      sizeId: 2,
      ingredients: [
        {
          ingredientId: 3,
          quantity: 1,
        } /* а id 3 соответствует салями, а не томатам */,
        { ingredientId: 4, quantity: 1 },
      ],
    },
  ];
  const miscMock = [
    { miscId: 1, quantity: 1 },
    { miscId: 2, quantity: 1 },
    { miscId: 3, quantity: 1 },
  ];
  const addressMock = {
    id: 2,
    name: "Работа",
    street: "Труженников",
    building: "175",
    flat: "",
    comment: "",
    userId: "61ae90bd-d767-4810-b456-82937d5fdf0b",
  };
  const userMock = {
    id: "16cec6b9-b241-46e9-a6b2-ae05ec09ee93",
    name: "Вася Пупкин",
    email: "user@example.com",
    avatar: "/public/img/users/user.jpg",
    phone: "+777 777 777",
  };
  const getters = {
    getCartPrice: () => 1090,
  };
  const mutations = {
    changeCount: jest.fn(),
    changeMiscCount: jest.fn(),
    /* restorePizza: jest.fn(), */
  };

  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
      getters,
      mutations,
      /* modules: {
        Builder: {
          mutations,
        },
      }, */
    });
    store.state.Builder.pizzas = pizzas;
    store.state.miscsSource = miscsSource;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("правильное отображение информации о цене, проверка cartPrice", () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.misc = miscMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartAdditionalList", "CartForm", "router-link"],
    });
    expect(wrapper.html()).toContain("1090 ₽");
    store.state.newOrder.pizzas = [];
    store.state.newOrder.misc = [];
  });

  it("метод onClick работает корректно (пользователь НЕ авторизован)", () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.address = addressMock;
    store.state.newOrder.misc = miscMock;
    store.dispatch = jest.fn();
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartAdditionalList", "CartForm", "router-link"],
    });
    let button = wrapper.find(".footer__submit").find("button");
    button.trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith("Orders/postOrders", {
      address: addressMock,
      misc: miscMock,
      pizzas: pizzasMock,
      phone: "",
      userId: null,
    });
    store.state.newOrder.pizzas = [];
    store.state.newOrder.address = {};
    store.state.newOrder.misc = [];
  });

  it("метод onClick работает корректно (пользователь авторизован)", () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.address = addressMock;
    store.state.newOrder.misc = miscMock;
    store.state.Auth.user = userMock;
    store.dispatch = jest.fn();
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartAdditionalList", "CartForm", "router-link"],
    });
    let button = wrapper.find(".footer__submit").find("button");
    button.trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith("Orders/postOrders", {
      address: addressMock,
      misc: miscMock,
      pizzas: pizzasMock,
      phone: "",
      userId: "16cec6b9-b241-46e9-a6b2-ae05ec09ee93",
    });
    store.state.newOrder.pizzas = [];
    store.state.newOrder.address = {};
    store.state.newOrder.misc = [];
    store.state.Auth.user = null;
  });

  it("метод onClickPopup работает корректно (пользователь НЕ авторизован)", async () => {
    const router = new VueRouter();
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.address = addressMock;
    store.state.newOrder.misc = miscMock;
    store.dispatch = jest.fn();
    createComponent({
      localVue,
      store,
      router,
      stubs: ["router-link"],
    });
    let button = wrapper.find(".footer__submit").find("button");
    await button.trigger("click");
    expect(wrapper.vm.popupVisible).toBe(true);
    let popupButton = wrapper.find(".popup__button").find(".button");
    await popupButton.trigger("click");
    expect(wrapper.vm.popupVisible).toBe(false);
    expect(wrapper.vm.$route.path).toBe("/");
    store.state.newOrder.pizzas = [];
    store.state.newOrder.address = {};
    store.state.newOrder.misc = [];
  });

  it("метод onClickPopup работает корректно (пользователь авторизован)", async () => {
    const router = new VueRouter();
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.address = addressMock;
    store.state.newOrder.misc = miscMock;
    store.state.Auth.user = userMock;
    store.dispatch = jest.fn();
    createComponent({
      localVue,
      store,
      router,
      stubs: ["router-link"],
    });
    let button = wrapper.find(".footer__submit").find("button");
    await button.trigger("click");
    expect(wrapper.vm.popupVisible).toBe(true);
    let popupButton = wrapper.find(".popup__button").find(".button");
    await popupButton.trigger("click");
    expect(wrapper.vm.popupVisible).toBe(false);
    expect(wrapper.vm.$route.path).toBe("/orders");
    store.state.newOrder.pizzas = [];
    store.state.newOrder.address = {};
    store.state.newOrder.misc = [];
    store.state.Auth.user = null;
  });
});
