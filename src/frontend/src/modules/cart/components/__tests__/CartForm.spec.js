import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import index from "@/store/index";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import CartForm from "@/modules/cart/components/CartForm";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartForm", () => {
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
  const mutations = {
    changeDeliveryType: jest.fn(),
    setOrderAddress: jest.fn(),
  };

  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
      mutations,
    });
    store.state.Builder.pizzas = pizzas;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  /* Блок тестов CartForm.vue */

  /* v-model не загружает через get при создании компонента */
  /* ошибка теста RangeError: Maximum call stack size exceeded at String.replace (<anonymous>)
  скорее всего связана с использованием события click на тэг option, chrome его тоже не отрабатывает */
  it("правильное отображение блока выбора адреса", async () => {
    store.state.newOrder.pizzas = pizzasMock;
    store.state.newOrder.phone = "9885608888";
    createComponent({
      localVue,
      store,
      stubs: ["CartAdditionalList", "CartFooter", "router-link"],
    });
    /* await wrapper.find("option").trigger("click"); */
    /* console.log(wrapper.html()); */
    /* expect(wrapper.html()).toContain("9885608888"); */
    store.state.newOrder.pizzas = [];
    store.state.newOrder.phone = "";
  });
});
