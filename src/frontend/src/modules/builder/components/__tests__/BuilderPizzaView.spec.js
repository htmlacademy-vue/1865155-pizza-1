import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import index from "@/store/index";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;

  const myPizzaMock = {
    name: "",
    dough: { value: "large", id: 2, price: 300 },
    size: { value: "normal", id: 2, multiplier: 2 },
    sauce: { value: "tomato", id: 1, price: 50 },
    ingredients: [
      { id: 7, count: 1, price: 21 },
      { id: 12, count: 1, price: 42 },
    ],
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
    });
    store.state.Builder.pizzas = pizzas;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("стиль по умолчанию применяется корректно (методы setClass, pizzaFoundationClass)", () => {
    createComponent({
      localVue,
      store,
    });
    expect(wrapper.html()).toContain("pizza--foundation--small-creamy");
  });

  it("при наличии данных классы применяются правильно", () => {
    store.state.Builder.myPizza = myPizzaMock;
    createComponent({
      localVue,
      store,
    });
    expect(wrapper.html()).toContain("pizza--foundation--big-tomato");
    expect(wrapper.html()).toContain("pizza__filling--onion");
    expect(wrapper.html()).toContain("pizza__filling--salmon");
  });
});
