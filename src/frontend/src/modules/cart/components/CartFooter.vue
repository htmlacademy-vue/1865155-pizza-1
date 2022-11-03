<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ cartPrice }} ₽</b>
    </div>
    <div class="footer__submit">
      <button type="button" class="button" @click="onClick()">
        Оформить заказ
      </button>
    </div>
    <transition v-if="popupVisible">
      <div class="popup">
        <a href="#" class="close" @click="onClickPopup()">
          <span class="visually-hidden">Закрыть попап</span>
        </a>
        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>
        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
        <div class="popup__button">
          <a href="#" class="button" @click="onClickPopup()">Отлично, я жду!</a>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "CartFooter",

  methods: {
    onClick() {
      this.$store.commit("popupVisible", true);
    },
    onClickPopup() {
      this.$store.commit("popupVisible", false);
      if (this.userId) {
        this.$router.push("/orders");
      } else {
        this.$router.push("/");
      }
    },
  },
  computed: {
    cartPrice() {
      return this.$store.state.cartPrice;
    },
    popupVisible() {
      return this.$store.state.popupVisible;
    },
    userId() {
      return this.$store.state.user.id;
    },
  },
};
</script>

<style></style>
