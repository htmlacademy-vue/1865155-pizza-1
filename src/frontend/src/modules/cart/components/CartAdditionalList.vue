<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="(misc, index) in miscs"
        :key="index"
      >
        <p class="additional-list__description">
          <img
            :src="changeUrl(misc.image)"
            width="39"
            height="60"
            :alt="misc.name"
          />
          <span>{{ misc.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              @click="changeMiscCount(misc.count - 1, index)"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="misc.count"
            />
            <button
              type="button"
              class="counter__button counter__button--plus counter__button--orange"
              @click="changeMiscCount(misc.count + 1, index)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>× {{ misc.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CartAdditionalList",

  methods: {
    changeUrl(url) {
      return "/assets" + url.slice(7);
    },
    changeMiscCount(newCount, index) {
      this.$store.commit("changeMiscCount", {
        newCount: newCount,
        index: index,
      });
    },
  },
  computed: {
    miscs() {
      return this.$store.state.miscs;
    },
  },
};
</script>

<style></style>
