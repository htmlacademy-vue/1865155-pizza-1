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
  data() {
    return {
      popupVisible: false,
    };
  },

  methods: {
    onClick() {
      let payload = { ...this.$store.state.newOrder };
      if (this.user != null) {
        payload.userId = this.user.id;
      } else {
        payload.userId = null;
      }
      this.$store.dispatch("Orders/postOrders", payload);
      this.popupVisible = true;
    },
    onClickPopup() {
      this.popupVisible = false;
      if (this.user) {
        this.$router.push("/orders");
      } else {
        this.$router.push("/");
      }
    },
  },
  computed: {
    cartPrice() {
      return this.$store.getters.getCartPrice;
    },
    address() {
      return this.$store.state.newOrder.address;
    },
    user() {
      return this.$store.state.Auth.user;
    },
  },
};
</script>

<style></style>
