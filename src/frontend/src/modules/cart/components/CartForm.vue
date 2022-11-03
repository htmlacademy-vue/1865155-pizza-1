<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" @change="changeDeliveryType($event)">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option v-if="userId" value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input type="text" name="tel" placeholder="+7 999-999-99-99" />
      </label>

      <div v-if="deliveryType === 2" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",

  methods: {
    changeDeliveryType(event) {
      this.$store.commit("changeDeliveryType", { value: event.target.value });
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
    deliveryType() {
      return this.$store.state.cart.delivery;
    },
  },
};
</script>

<style></style>
