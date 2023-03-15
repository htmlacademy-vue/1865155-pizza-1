import { shallowMount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("SelectorItem", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  };

  beforeEach(() => {});

  afterEach(() => {
    wrapper.destroy();
  });

  it("проверка назначения класса анимации shake", () => {
    const propsData = {
      ingredientName: "Лосось",
      ingredientId: 1,
      animateOnClickId: 1,
    };
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain("shake");
  });

  it("проверка назначения класса анимации shake", () => {
    const propsData = {
      ingredientName: "Лосось",
      ingredientId: 1,
      animateOnDropId: 1,
    };
    createComponent({ propsData });
    expect(wrapper.attributes("class")).toContain("move");
  });
});
