import { shallowMount } from "@vue/test-utils";
import RadioButton from "@/common/components/RadioButton";

describe("RadioButton", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  beforeEach(() => {});

  afterEach(() => {
    wrapper.destroy();
  });

  it("проверка click, отправка события", () => {
    const propsData = { value: "light", id: 1, myPizzaItemId: 1, price: 300 };
    createComponent({ propsData });
    wrapper.trigger("click");
    expect(wrapper.emitted()).toEqual({
      getValueFromRadio: [["light", 1, 300]],
    });
  });
});
