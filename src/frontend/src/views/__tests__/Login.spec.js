import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import index from "@/store/index";
import Login from "@/views/Login";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Login", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state: index.state,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("проверка необходимости заполнения полей", async () => {
    createComponent({
      localVue,
      store,
      stubs: ["router-link"],
      attachTo: document.body,
    });
    await wrapper.find(".button").trigger("click");
    expect(wrapper.findAll(".input").at(0).html()).toContain(
      "Поле обязательно для заполнения"
    );
    expect(wrapper.findAll(".input").at(1).html()).toContain(
      "Поле обязательно для заполнения"
    );
  });

  /* метод отправки данных не срабатывает */
  it("проверка валидации", async () => {
    createComponent({
      localVue,
      store,
      stubs: ["router-link"],
      attachTo: document.body,
    });
    const emailInput = wrapper.findAll(".input").at(0);
    emailInput.element.value = "user";
    await emailInput.trigger("input");
    expect(emailInput.element.value).toBe("user");
    const passInput = wrapper.findAll(".input").at(1);
    passInput.element.value = "pass";
    await passInput.trigger("input");
    expect(passInput.element.value).toBe("pass");
    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.find("[type='submit']").trigger("click");
  });
});
