import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import index from "@/store/index";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import miscsSource from "/home/it/pizza-project/src/frontend/src/static/misc.json";
import CartMainList from "@/modules/cart/components/CartMainList";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartMainList", () => {
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
  const getters = {
    getCartPrice: () => 1090,
  };
  const mutations = {
    changeCount: jest.fn(),
    changeMiscCount: jest.fn(),
  };

  const createComponent = (options) => {
    wrapper = mount(CartMainList, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
      getters,
      mutations,
    });
    store.state.Builder.pizzas = pizzas;
    store.state.miscsSource = miscsSource;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("правильное отображение информации об основном товаре", () => {
    store.state.newOrder.pizzas = pizzasMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartAdditionalList", "CartForm", "CartFooter", "router-link"],
    });
    expect(wrapper.html()).not.toContain("В корзине нет ни одного товара");
    expect(wrapper.html()).toContain("ветчина");
    expect(wrapper.html()).toContain("32 см, на толстом тесте");
    expect(wrapper.html()).toContain("Соус: сливочный");
    expect(wrapper.html()).toContain("Начинка: салями, ветчина");
    store.state.newOrder.pizzas = [];
  });

  it("цена товара рассчитывается верно, метод price работает правильно", () => {
    store.state.newOrder.pizzas = pizzasMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartAdditionalList", "CartForm", "CartFooter", "router-link"],
    });
    expect(wrapper.find(".cart-list__price").html()).toContain("868");
    store.state.newOrder.pizzas = [];
  });

  it("нажатие на кнопку минус вызывает мутацию changeCount с параметром 0", async () => {
    store.state.newOrder.pizzas = pizzasMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartAdditionalList", "CartForm", "CartFooter", "router-link"],
    });
    const button = wrapper.find(".counter__button--minus");
    await button.trigger("click");
    /* console.log(wrapper.vm); */
    expect(mutations.changeCount).toHaveBeenCalledWith(expect.anything(), {
      index: 0,
      newCount: 0,
    });
    store.state.newOrder.pizzas = [];
  });

  it("нажатие на кнопку плюс вызывает мутацию changeCount с параметром 2", async () => {
    store.state.newOrder.pizzas = pizzasMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartAdditionalList", "CartForm", "CartFooter", "router-link"],
    });
    const button = wrapper.find(".counter__button--plus");
    await button.trigger("click");
    expect(mutations.changeCount).toHaveBeenCalledWith(expect.anything(), {
      index: 0,
      newCount: 2,
    });
    store.state.newOrder.pizzas = [];
  });

  it("проверка функции изменить", async () => {
    store.state.newOrder.pizzas = pizzasMock;
    const router = new VueRouter();
    store.commit = jest.fn();
    /* const $router = {
      push: jest.fn(),
    }; */
    createComponent({
      localVue,
      store,
      router,
      /* mocks: {
        $route,
        $router,
      }, */
      stubs: ["CartAdditionalList", "CartForm", "CartFooter", "router-link"],
    });
    await wrapper.find(".cart-list__edit").trigger("click");
    expect(store.commit).toHaveBeenCalledWith("Builder/restorePizza", {
      index: 0,
      product: pizzasMock[0],
    });
    store.state.newOrder.pizzas = [];
  });
});
