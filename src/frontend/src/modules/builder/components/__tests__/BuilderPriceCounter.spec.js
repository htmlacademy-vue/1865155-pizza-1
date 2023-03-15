import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import index from "@/store/index";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("BuilderPriceCounter", () => {
  let store;
  let wrapper;

  const myPizzaMock = {
    name: "Tomato",
    dough: { value: "large", id: 2, price: 300 },
    size: { value: "normal", id: 2, multiplier: 2 },
    sauce: { value: "tomato", id: 1, price: 50 },
    ingredients: [
      { id: 7, count: 1, price: 21 },
      { id: 12, count: 1, price: 42 },
    ],
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
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

  it("цена рассчитывается верно (price())", () => {
    store.state.Builder.myPizza = myPizzaMock;
    createComponent({
      localVue,
      store,
    });
    expect(wrapper.html()).toContain("Итого: 826 ₽");
  });

  it("нажатие кнопки Готовьте! (метод addToCart)", async () => {
    const router = new VueRouter();
    store.state.Builder.myPizza = myPizzaMock;
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
      router,
    });
    await wrapper.find(".button").trigger("click");
    expect(store.commit).toHaveBeenNthCalledWith(1, "addToCart", {
      myPizza: myPizzaMock,
      price: 826,
    });
    expect(store.commit).toHaveBeenNthCalledWith(
      2,
      "Builder/setMyPizzaDefaultState"
    );
    expect(wrapper.vm.$route.path).toBe("/cart");
  });

  it("при отсутствии ключевых данных (названия) нажатие кнопки Готовьте! не возможно", async () => {
    const router = new VueRouter();
    store.state.Builder.myPizza = myPizzaMock;
    store.state.Builder.myPizza.name = "";
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
      router,
    });
    await wrapper.find(".button").trigger("click");
    expect(store.commit).not.toHaveBeenCalledWith();
  });
});
