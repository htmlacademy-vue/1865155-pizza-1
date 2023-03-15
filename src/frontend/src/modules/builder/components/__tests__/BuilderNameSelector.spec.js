import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import index from "@/store/index";
import BuilderNameSelector from "@/modules/builder/components/BuilderNameSelector";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderNameSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderNameSelector, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("вызов функции при вводе названия пиццы срабатывает", () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
    });
    wrapper.find("input").setValue("Tomato");
    expect(store.commit).toHaveBeenCalledWith("Builder/updateName", "Tomato");
  });
});
