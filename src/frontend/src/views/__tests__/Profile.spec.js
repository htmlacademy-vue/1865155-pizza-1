import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Profile from "@/views/Profile";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe("Profile", () => {
  let store;
  let wrapper;

  const userMock = {
    id: "16cec6b9-b241-46e9-a6b2-ae05ec09ee93",
    name: "Вася Пупкин",
    email: "user@example.com",
    avatar: "/public/img/users/user.jpg",
    phone: "+777 777 777",
  };
  const addressesMock = [
    {
      id: 1,
      name: "дом",
      street: "Советская",
      building: "23",
      flat: "",
      comment: "",
      userId: "61ae90bd-d767-4810-b456-82937d5fdf0b",
    },
  ];
  const newAddressMock = {
    id: 1,
    name: "дом",
    street: "Советская",
    building: "23",
    flat: "",
    comment: "",
  };

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Auth: {
          namespaced: true,
          state: {
            user: userMock,
            addresses: addressesMock,
            newAddress: newAddressMock,
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("данные профиля и адрес отображаются верно", () => {
    createComponent({
      localVue,
      store,
      stubs: ["router-link"],
    });
    expect(wrapper.html()).toContain("Вася Пупкин");
    expect(wrapper.html()).toContain("+777 777 777");
    expect(wrapper.html()).toContain("Адрес №1. дом");
    expect(wrapper.html()).toContain("Советская, д. 23, кв.");
  });

  /* как проверять vmodel не очень понятно, т.к. get() не работает */
  it("кнопка изменить адрес работает правильно", async () => {
    store.commit = jest.fn();
    createComponent({
      localVue,
      store,
      stubs: ["router-link"],
      attachTo: document.body,
    });
    await wrapper.find(".address-form__edit button").trigger("click");
    expect(store.commit).toHaveBeenCalledTimes(6);
  });
});
