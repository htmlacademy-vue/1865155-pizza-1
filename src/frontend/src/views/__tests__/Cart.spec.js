import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import index from "@/store/index";
import Cart from "@/views/Cart";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("Cart", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
      /* modules: {
        Builder: {
          mutations,
        },
      }, */
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  /* it("рендер с заглушками", () => {
    createComponent({
      localVue,
      store,
      stubs: ["CartMainList", "CartAdditionalList", "CartForm", "CartFooter"],
    });
  }); */

  /* it("рендер с компонентами и заглушкой router link", () => {
    createComponent({
      localVue,
      store,
      stubs: ["router-link"],
    });
  }); */

  /* it("рендер с компонентами, router и мок данными в state", () => {
    const router = new VueRouter();
    store.state.newOrder.pizzas = pizzasMock;
    createComponent({
      localVue,
      store,
      router,
    });
    store.state.newOrder.pizzas = [];
  }); */

  it("при отсутствии позиций в заказе отображает сответствующее сообщение", () => {
    createComponent({
      localVue,
      store,
      stubs: [
        "CartMainList",
        "CartAdditionalList",
        "CartForm",
        "CartFooter",
        "router-link",
      ],
    });
    expect(wrapper.html()).toContain("В корзине нет ни одного товара");
  });
});
