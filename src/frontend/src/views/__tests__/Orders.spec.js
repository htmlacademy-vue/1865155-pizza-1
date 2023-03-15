import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
/* import index from "@/store/index"; */
import Orders from "@/views/Orders";
/* import ordersStore from "@/store/modules/orders.store.js"; */
import builderStore from "@/store/modules/builder.store.js";
import pizzas from "/home/it/pizza-project/src/frontend/src/static/pizza.json";
import miscsSource from "/home/it/pizza-project/src/frontend/src/static/misc.json";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("Orders", () => {
  let store;
  let wrapper;

  const ordersMock = [
    {
      id: 1,
      phone: "9885608888",
      userId: "61ae90bd-d767-4810-b456-82937d5fdf0b",
      addressId: null,
      orderPizzas: [
        {
          id: 1,
          name: "ветчина",
          quantity: 1,
          sauceId: 2,
          doughId: 2,
          sizeId: 2,
          orderId: 1,
          ingredients: [
            { id: 1, quantity: 1, pizzaId: 1, ingredientId: 3 },
            { id: 2, quantity: 1, pizzaId: 1, ingredientId: 4 },
          ],
        },
      ],
      orderMisc: [
        { id: 1, quantity: 1, orderId: 1, miscId: 1 },
        { id: 2, quantity: 1, orderId: 1, miscId: 2 },
        { id: 3, quantity: 1, orderId: 1, miscId: 3 },
      ],
    },
  ];
  const userMock = {
    id: "16cec6b9-b241-46e9-a6b2-ae05ec09ee93",
    name: "Вася Пупкин",
    email: "user@example.com",
    avatar: "/public/img/users/user.jpg",
    phone: "+777 777 777",
  };
  /* const getters = {
    getOrderPrice: jest.fn(),
  }; */

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      /* state: index.state, */
      /* getters: {
        "Orders/getOrderPrice": () => 1090,
      }, */
      modules: {
        Orders: {
          namespaced: true,
          state: {
            orders: ordersMock,
          },
          /* это' вариант импорта реального store */
          /* getters: ordersStore.getters, */
          /* это вариант мока store. оба работают */
          getters: {
            getOrderPrice: () => () => 1090,
          },
        },
        Builder: {
          namespaced: true,
          state: {
            pizzas: pizzas,
          },
          getters: builderStore.getters,
        },
        Auth: {
          namespaced: true,
          state: {
            user: userMock,
          },
        },
      },
    });
    /* store.state.Orders.orders = ordersMock; */
    /* store.state.Auth.user = userMock; */
    /* store.state.Builder.pizzas = pizzas; */
    store.state.miscsSource = miscsSource;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("данные прошлого заказа отображаются верно (getPriceByProduct, checkMiscId, miscQuantity, totalPrice)", async () => {
    const router = new VueRouter();
    createComponent({
      localVue,
      store,
      router,
      stubs: ["router-link"],
    });
    expect(wrapper.html()).toContain("Заказ #1");
    expect(wrapper.html()).toContain("Сумма заказа: 1090 ₽");
    expect(wrapper.html()).toContain("ветчина");
    expect(wrapper.html()).toContain("32 см, на толстом тесте");
    expect(wrapper.html()).toContain("Соус: сливочный");
    expect(wrapper.html()).toContain("Начинка: салями, ветчина");
    expect(wrapper.html()).toContain("<b>1х56 ₽</b>");
    expect(wrapper.html()).toContain("<br>1х30 ₽");
    expect(wrapper.html()).toContain("<b>1х170 ₽</b>");
    expect(wrapper.html()).toContain("Заберу сам");
  });

  it("проверка удаления прошлого заказа (deleteOrder)", async () => {
    const router = new VueRouter();
    store.dispatch = jest.fn();
    createComponent({
      localVue,
      store,
      router,
      stubs: ["router-link"],
    });
    wrapper.findAll(".button").at(0).trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith("Orders/deleteOrder", 1);
  });

  it("проверка повторения прошлого заказа (repeatOrder)", async () => {
    const router = new VueRouter();
    store.dispatch = jest.fn();
    createComponent({
      localVue,
      store,
      router,
      stubs: ["router-link"],
    });
    wrapper.findAll(".button").at(1).trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith("Orders/repeatOrder", 1);
  });
});
