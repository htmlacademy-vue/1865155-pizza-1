import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import index from "@/store/index";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;

  const ingredientsMock = [{ id: 2, count: 3, price: 42 }];

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
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

  it("данные соусов (getSauceValue) и ингредиентов (getIngredientClassName) отображаются корректно", () => {
    createComponent({
      localVue,
      store,
    });
    expect(wrapper.html()).toContain('value="tomato"');
    expect(wrapper.html()).toContain("Томатный");
    expect(wrapper.html()).toContain('value="creamy"');
    expect(wrapper.html()).toContain("Сливочный");
    let ingredients = wrapper.findAll(".ingredients__item");
    expect(ingredients.length).toBe(15);
    expect(ingredients.at(1).html()).toContain("filling--cheddar");
    expect(ingredients.at(1).html()).toContain("Чеддер");
  });

  it("выбор соуса (метод sendValue)", () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
    });
    wrapper.find('[value="tomato"]').trigger("click");
    expect(store.commit).toHaveBeenCalledWith("Builder/setSauce", {
      id: 1,
      price: 50,
      value: "tomato",
    });
  });

  it("проверка добавления ингредиента", () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
    });
    let ingredients = wrapper.findAll(".ingredients__item");
    ingredients.at(1).find(".counter__button--plus").trigger("click");
    expect(store.commit).toHaveBeenCalledWith("Builder/addIngredient", {
      id: 2,
      price: 42,
      count: 1,
    });
  });

  it("добавление блокируется при количестве ингредиента 3", () => {
    store.commit = jest.fn();
    store.state.Builder.myPizza.ingredients = ingredientsMock;
    createComponent({
      localVue,
      store,
    });
    let ingredients = wrapper.findAll(".ingredients__item");
    ingredients.at(1).find(".counter__button--plus").trigger("click");
    expect(store.commit).not.toHaveBeenCalled();
    store.state.Builder.myPizza.ingredients = [];
  });

  it("уменьшение количества ингредиентов не доступно при количестве 0", () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
    });
    let ingredients = wrapper.findAll(".ingredients__item");
    ingredients.at(1).find(".counter__button--minus").trigger("click");
    expect(store.commit).not.toHaveBeenCalled();
  });
});
