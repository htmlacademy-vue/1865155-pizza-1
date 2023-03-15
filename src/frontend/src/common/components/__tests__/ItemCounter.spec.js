import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {});

  afterEach(() => {
    wrapper.destroy();
  });

  /*
    console.log(wrapper.vm);
    console.log(wrapper.html());
    expect(wrapper.html()).toBe('<div></div>');
    const button = wrapper.find(".counter__button--plus");
    const button = wrapper.find("button")[0];
    button.vm.$emit("click");
    wrapper.vm.$emit("update:itemCount");
    console.log(wrapper.emittedByOrder()); 
    expect(wrapper.emittedByOrder()[0]).toEqual({});
    console.log(JSON.stringify(store.state.Builder));
  }); */

  it("кнопка 'минус' отключена по дефолту (count = 0), click не работает", () => {
    createComponent();
    expect(wrapper.vm.count).toBe(0);
    const button = wrapper.find(".counter__button--minus");
    expect(button.attributes("disabled")).toBe("disabled");
    button.trigger("click");
    expect(wrapper.emitted()).toEqual({});
  });

  it("кнопка 'минус' доступна при count = 1, click работает, событие происходит", () => {
    const propsData = { count: 1 };
    createComponent({ propsData });
    expect(wrapper.vm.count).toBe(1);
    const button = wrapper.find(".counter__button--minus");
    expect(button.find('[disabled="disabled"]').exists()).toBeFalsy();
    button.trigger("click");
    expect(wrapper.emitted()).toEqual({ "update:itemCount": [[0]] });
  });

  it("кнопка 'плюс' доступна по дефолту (count = 0), click работает, событие происходит", () => {
    createComponent();
    expect(wrapper.vm.count).toBe(0);
    const button = wrapper.find(".counter__button--plus");
    expect(button.find('[disabled="disabled"]').exists()).toBeFalsy();
    button.trigger("click");
    expect(wrapper.emitted()).toEqual({ "update:itemCount": [[1]] });
  });

  it("кнопка 'плюс' отключена при count = 3), click не работает", () => {
    const propsData = { count: 3 };
    createComponent({ propsData });
    expect(wrapper.vm.count).toBe(3);
    const button = wrapper.find(".counter__button--plus");
    expect(button.attributes("disabled")).toBe("disabled");
    button.trigger("click");
    expect(wrapper.emitted()).toEqual({});
  });
});
