<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select">
          <option value="1" @click="myself()">Заберу сам</option>
          <option value="2" @click="newAddress()">Новый адрес</option>
          <template v-if="user != null">
            <option
              v-for="(address, index) in addresses"
              :key="index"
              value="3"
              @click="myAddress(address)"
            >
              {{ address.name }}
            </option>
          </template>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="phone"
        />
      </label>

      <div v-if="deliveryType === 2" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" v-model="addressStreet" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" v-model="addressHouse" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" v-model="addressApartment" />
          </label>
        </div>
      </div>

      <div v-if="deliveryType === 3" class="cart-form__address">
        <span class="cart-form__label">{{ addressName }}</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :placeholder="addressStreet"
              disabled="true"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :placeholder="addressHouse"
              disabled="true"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :placeholder="addressApartment"
              disabled="true"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartForm",
  /* data() {
    return {
      deliveryType: 1,
    };
  }, */

  methods: {
    myself() {
      this.$store.commit("changeDeliveryType", 1);
      this.$store.commit("setOrderAddress", null);
    },
    newAddress() {
      let newAddress = new Object();
      newAddress.name = "Новый добавленный адрес";
      newAddress.street = "";
      newAddress.building = "";
      newAddress.flat = "";
      this.$store.commit("setOrderAddress", newAddress);
      this.$store.commit("changeDeliveryType", 2);
    },
    myAddress(address) {
      this.$store.commit("setOrderAddress", address);
      this.$store.commit("changeDeliveryType", 3);
    },
  },
  computed: {
    user() {
      return this.$store.state.Auth.user;
    },
    addresses() {
      return this.$store.state.Auth.addresses;
    },
    deliveryType() {
      return this.$store.state.deliveryType;
    },
    phone: {
      get() {
        return this.$store.state.newOrder.phone;
      },
      set(data) {
        this.$store.commit("setOrderPhone", data);
      },
    },
    addressName: {
      get() {
        return this.$store.state.newOrder.address.name;
      },
      set(data) {
        this.$store.commit("setOrderAddressName", data);
      },
    },
    addressStreet: {
      get() {
        return this.$store.state.newOrder.address.street;
      },
      set(data) {
        this.$store.commit("setOrderAddressStreet", data);
      },
    },
    addressHouse: {
      get() {
        return this.$store.state.newOrder.address.building;
      },
      set(data) {
        this.$store.commit("setOrderAddressHouse", data);
      },
    },
    addressApartment: {
      get() {
        return this.$store.state.newOrder.address.flat;
      },
      set(data) {
        this.$store.commit("setOrderAddressApartment", data);
      },
    },
  },
};
</script>

<style></style>
