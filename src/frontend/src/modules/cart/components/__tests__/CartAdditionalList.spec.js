import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import index from "@/store/index";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import miscsSource from "/home/it/pizza-project/src/frontend/src/static/misc.json";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartAdditionalList", () => {
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
  const getters = {
    getCartPrice: () => 1090,
  };
  const mutations = {
    changeCount: jest.fn(),
    changeMiscCount: jest.fn(),
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalList, options);
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

  it("правильное отображение информации о дополнительном товаре, проверка методов changeUrl, getName, getPrice", () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.misc = miscMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartForm", "CartFooter", "router-link"],
    });
    expect(wrapper.html()).toContain("Cola-Cola 0,5 литр");
    expect(wrapper.html()).toContain("/assets/img/cola.svg");
    expect(wrapper.html()).toContain("56 ₽");
    expect(wrapper.html()).toContain("Острый соус");
    expect(wrapper.html()).toContain("/assets/img/sauce.svg");
    expect(wrapper.html()).toContain("10 ₽");
    expect(wrapper.html()).toContain("Картошка из печи");
    expect(wrapper.html()).toContain("/assets/img/potato.svg");
    expect(wrapper.html()).toContain("170 ₽");
    store.state.newOrder.pizzas = [];
    store.state.newOrder.misc = [];
  });

  it("нажатие на кнопку минус вызывает мутацию changeMiscCount с параметром 0", async () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.misc = miscMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartForm", "CartFooter", "router-link"],
    });
    await wrapper.find(".counter__button--minus").trigger("click");
    expect(mutations.changeMiscCount).toHaveBeenCalledWith(expect.anything(), {
      index: 0,
      newCount: 0,
    });
    store.state.newOrder.pizzas = [];
    store.state.newOrder.misc = [];
  });

  it("нажатие на кнопку плюс вызывает мутацию changeMiscCount с параметром 2", async () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.misc = miscMock;
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartForm", "CartFooter", "router-link"],
    });
    await wrapper.find(".counter__button--plus").trigger("click");
    expect(mutations.changeMiscCount).toHaveBeenCalledWith(expect.anything(), {
      index: 0,
      newCount: 2,
    });
    store.state.newOrder.pizzas = [];
    store.state.newOrder.misc = [];
  });
});
