import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import index from "@/store/index";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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

  it("данные теста отображаются корректно", () => {
    createComponent({
      localVue,
      store,
    });
    let light = wrapper.find(".dough__input--light");
    expect(light.html()).toContain("Тонкое");
    expect(light.html()).toContain("Из твердых сортов пшеницы");
    let large = wrapper.find(".dough__input--large");
    expect(large.html()).toContain("Толстое");
    expect(large.html()).toContain("Из твердых сортов пшеницы");
  });

  it("выбор теста передаёт данные (метод sendValue работает)", () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
    });
    wrapper.find(".dough__input--light").find("input").trigger("click");
    expect(store.commit).toHaveBeenCalledWith("Builder/setDough", {
      id: 1,
      price: 300,
      value: "light",
    });
  });
});
