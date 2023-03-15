import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Product from "@/common/components/Product";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Product", () => {
  let store;
  const propsData = {
    product: {
      doughId: 2,
      name: "ветчина",
      quantity: 1,
      sauceId: 2,
      sizeId: 2,
      ingredients: [
        { ingredientId: 3, quantity: 1 },
        { ingredientId: 4, quantity: 1 },
      ],
    },
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Product, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Builder: {
          state: {
            pizzas: pizzas,
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("проверка метода sizeDescriber", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("32 см, на толстом тесте");
  });

  it("проверка метода sauceDescriber", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Соус: сливочный");
  });

  it("проверка метода ingredientsDescriber", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.html()).toContain("Начинка: салями, ветчина");
  });
});
