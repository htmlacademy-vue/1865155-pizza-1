import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import index from "@/store/index";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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

  it("размеры отображаются правильно (getSizeValue)", () => {
    createComponent({
      localVue,
      store,
    });
    expect(wrapper.find(".diameter__input--small").html()).toContain(
      'value="small"'
    );
    expect(wrapper.find(".diameter__input--normal").html()).toContain(
      'value="normal"'
    );
    expect(wrapper.find(".diameter__input--big").html()).toContain(
      'value="big"'
    );
  });

  it("выбор размера генерирует соответствующее событие", () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
    });
    wrapper.find(".diameter__input--normal").trigger("click");
    expect(store.commit).toHaveBeenCalledWith("Builder/setSize", {
      id: 2,
      multiplier: 2,
      value: "normal",
    });
  });
});
