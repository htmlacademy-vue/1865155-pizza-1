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
            :src="changeUrl(misc.miscId)"
            width="39"
            height="60"
            :alt="getName(misc.miscId)"
          />
          <span>{{ getName(misc.miscId) }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              @click="changeMiscCount(misc.quantity - 1, index)"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="misc.quantity"
            />
            <button
              type="button"
              class="counter__button counter__button--plus counter__button--orange"
              @click="changeMiscCount(misc.quantity + 1, index)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>× {{ getPrice(misc.miscId) }} ₽</b>
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
    changeUrl(miscId) {
      let url = this.$store.state.miscsSource.find(
        (item) => item.id === miscId
      ).image;
      return "/assets" + url.slice(7);
    },
    getName(miscId) {
      return this.$store.state.miscsSource.find((item) => item.id === miscId)
        .name;
    },
    changeMiscCount(newCount, index) {
      this.$store.commit("changeMiscCount", {
        newCount: newCount,
        index: index,
      });
    },
    getPrice(miscId) {
      return this.$store.state.miscsSource.find((item) => item.id === miscId)
        .price;
    },
  },
  computed: {
    miscs() {
      return this.$store.state.newOrder.misc;
    },
  },
};
</script>

<style></style>
