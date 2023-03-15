<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link
        to="/"
        class="logo layout__logo"
        style="padding-bottom: 54px"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
          style="margin-left: 29px"
        />
      </router-link>
      <router-link to="/Orders" class="layout__link layout__link--active">
        История заказов
      </router-link>
      <router-link :to="`/profile/${user.id}`" class="layout__link">
        Мои данные
      </router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section v-for="order in orders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ totalPrice(order.id) }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(order.id)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            v-for="product in order.orderPizzas"
            :key="product.id"
            class="order__item"
          >
            <Product :product="product" />

            <p class="order__price">
              {{ product.quantity }}х{{ getPriceByProduct(product) }} ₽
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-if="checkMiscId(order, 1)">
            <img
              src="@/assets/img/cola.svg"
              width="20"
              height="30"
              alt="Coca-Cola 0,5 литра"
            />
            <p>
              <span>Coca-Cola 0,5 литра</span>
              <b>{{ miscQuantity(order, 1) }}х56 ₽</b>
            </p>
          </li>
          <li v-if="checkMiscId(order, 2)">
            <img
              src="@/assets/img/sauce.svg"
              width="20"
              height="30"
              alt="Острый соус"
            />
            <span>Острый соус <br />{{ miscQuantity(order, 2) }}х30 ₽</span>
          </li>
          <li v-if="checkMiscId(order, 3)">
            <img
              src="@/assets/img/potato.svg"
              width="20"
              height="30"
              alt="Картошка из печи"
            />
            <p>
              <span>Картошка из печи</span>
              <b>{{ miscQuantity(order, 3) }}х170 ₽</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки:
          {{ order.addressId ? order.orderAddress.name : "Заберу сам" }}
        </p>
      </section>
    </div>
  </main>
</template>

<script>
import Product from "@/common/components/Product.vue";

export default {
  name: "Orders",
  components: {
    Product,
  },

  methods: {
    getPriceByProduct(product) {
      return this.$store.getters["Builder/getPriceByProduct"](product);
    },
    checkMiscId(order, id) {
      return order.orderMisc.find((item) => item.miscId === id);
    },
    miscQuantity(order, id) {
      return order.orderMisc.find((item) => item.miscId === id).quantity;
    },
    totalPrice(id) {
      return this.$store.getters["Orders/getOrderPrice"](id);
    },
    deleteOrder(id) {
      this.$store.dispatch("Orders/deleteOrder", id);
    },
    repeatOrder(id) {
      this.$store.dispatch("Orders/repeatOrder", id);
      this.$router.push("/cart");
    },
  },
  computed: {
    orders() {
      return this.$store.state.Orders.orders;
    },
    user() {
      return this.$store.state.Auth.user;
    },
  },
};
</script>
