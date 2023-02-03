<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link to="/" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
      <router-link to="/Orders" class="layout__link">
        История заказов
      </router-link>
      <router-link
        :to="`/profile/${user.id}`"
        class="layout__link layout__link--active"
      >
        Мои данные
      </router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5@2x.webp 1x,
              @/assets/img/users/user5@4x.webp 2x
            "
          />
          <img
            :src="avatar"
            :srcset="avatar"
            :alt="user.name"
            width="72"
            height="72"
          />
        </picture>
        <div class="user__name">
          <span>{{ user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ user.phone }}</span>
        </p>
      </div>

      <div class="layout__address">
        <div
          class="sheet address-form"
          v-for="(address, index) in addresses"
          :key="index"
        >
          <div class="address-form__header">
            <b>Адрес №{{ index + 1 }}. {{ address.name }}</b>
            <div class="address-form__edit">
              <button
                type="button"
                class="icon"
                @click="changeAddress(address, index)"
              >
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>
            {{ address.street }}, д. {{ address.building }}, кв.
            {{ address.flat }}
          </p>
          <small>{{ address.comment }}</small>
        </div>
      </div>

      <div v-if="showAdding" class="layout__address">
        <form
          action="test.html"
          method="post"
          class="address-form address-form--opened sheet"
          @submit.prevent="saveAddress"
        >
          <div class="address-form__header">
            <b>Адрес №{{ currentNumber }}</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input
                  type="text"
                  name="addr-name"
                  placeholder="Введите название адреса"
                  required
                  v-model="newAddressName"
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input
                  type="text"
                  name="addr-street"
                  placeholder="Введите название улицы"
                  required
                  v-model="newAddressStreet"
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input
                  type="text"
                  name="addr-house"
                  placeholder="Введите номер дома"
                  required
                  v-model="newAddressHouse"
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input
                  type="text"
                  name="addr-apartment"
                  placeholder="Введите № квартиры"
                  v-model="newAddressApartment"
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input
                  type="text"
                  name="addr-comment"
                  placeholder="Введите комментарий"
                  v-model="newAddressComment"
                />
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button
              v-if="showDelete"
              type="button"
              class="button button--transparent"
              @click="deleteAddress"
            >
              Удалить
            </button>
            <button type="submit" class="button">Сохранить</button>
          </div>
        </form>
      </div>

      <div class="layout__button">
        <button type="button" class="button button--border" @click="addAddress">
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Profile",
  data() {
    return {
      currentNumber: 0,
      showAdding: false,
      showDelete: false,
    };
  },

  methods: {
    layoutAddress(addFlag, delFlag) {
      this.showAdding = addFlag;
      this.showDelete = delFlag;
    },
    saveAddress() {
      if (this.$store.state.Auth.newAddress.id === null) {
        this.$store.dispatch("Auth/postAddresses");
        this.layoutAddress(false, false);
      } else {
        this.$store.dispatch("Auth/putAddresses");
        this.layoutAddress(false, false);
      }
    },
    deleteAddress() {
      this.$store.dispatch("Auth/deleteAddresses");
      this.layoutAddress(false, false);
    },
    addAddress() {
      this.currentNumber = this.addresses.length + 1;
      this.layoutAddress(true, false);
      this.$store.commit("Auth/setNewAddressDefaultState");
    },
    changeAddress(address, index) {
      this.currentNumber = index + 1;
      this.layoutAddress(true, true);
      this.$store.commit("Auth/updateAddressId", address.id);
      this.$store.commit("Auth/updateAddressName", address.name);
      this.$store.commit("Auth/updateAddressStreet", address.street);
      this.$store.commit("Auth/updateAddressHouse", address.building);
      this.$store.commit("Auth/updateAddressApartment", address.flat);
      this.$store.commit("Auth/updateAddressComment", address.comment);
    },
  },
  computed: {
    user() {
      return this.$store.state.Auth.user;
    },
    avatar() {
      return axios.defaults.baseURL + this.$store.state.Auth.user.avatar;
    },
    addresses() {
      return this.$store.state.Auth.addresses;
    },
    newAddressName: {
      get() {
        return this.$store.state.Auth.newAddress.name;
      },
      set(data) {
        this.$store.commit("Auth/updateAddressName", data);
      },
    },
    newAddressStreet: {
      get() {
        return this.$store.state.Auth.newAddress.street;
      },
      set(data) {
        this.$store.commit("Auth/updateAddressStreet", data);
      },
    },
    newAddressHouse: {
      get() {
        return this.$store.state.Auth.newAddress.building;
      },
      set(data) {
        this.$store.commit("Auth/updateAddressHouse", data);
      },
    },
    newAddressApartment: {
      get() {
        return this.$store.state.Auth.newAddress.flat;
      },
      set(data) {
        this.$store.commit("Auth/updateAddressApartment", data);
      },
    },
    newAddressComment: {
      get() {
        return this.$store.state.Auth.newAddress.comment;
      },
      set(data) {
        this.$store.commit("Auth/updateAddressComment", data);
      },
    },
  },
};
</script>

<style></style>
