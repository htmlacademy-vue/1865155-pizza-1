<template>
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="preload"
        href="/assets/fonts/roboto-bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/assets/fonts/roboto-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/assets/fonts/roboto-light.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/assets/fonts/roboto-bold.woff"
        as="font"
        type="font/woff"
        crossorigin
      />
      <link
        rel="preload"
        href="/assets/fonts/roboto-regular.woff"
        as="font"
        type="font/woff"
        crossorigin
      />
      <link
        rel="preload"
        href="/assets/fonts/roboto-light.woff"
        as="font"
        type="font/woff"
        crossorigin
      />
      <link rel="stylesheet" href="css/style.min.css" />
      <title>V!U!E! Pizza - корзина</title>
    </head>
    <body>
      <header class="header">
        <div class="header__logo">
          <router-link to="/" class="logo">
            <img
              src="@/assets/img/logo.svg"
              alt="V!U!E! Pizza logo"
              width="90"
              height="40"
            />
          </router-link>
        </div>
        <div class="header__cart">
          <router-link to="/cart">{{ cartPrice }} ₽</router-link>
        </div>
        <div class="header__user">
          <router-link :to="`/profile/${user.id}`">
            <picture>
              <source
                type="image/webp"
                srcset="
                  @/assets/img/users/user5.webp    1x,
                  @/assets/img/users/user5@2x.webp 2x
                "
              />
              <img
                src="@/assets/img/users/user5.jpg"
                srcset="@/assets/img/users/user5@2x.jpg"
                alt="Василий Ложкин"
                width="32"
                height="32"
              />
            </picture>
            <span>{{ user.name }}</span>
          </router-link>
          <a href="#" class="header__logout" @click="logout">
            <span>Выйти</span>
          </a>
        </div>
      </header>
      <slot />
    </body>
  </html>
</template>

<script>
export default {
  name: "AppLayoutUser",

  methods: {
    async logout() {
      await this.$store.dispatch("Auth/logout");
      await this.$router.push("/login");
    },
  },
  computed: {
    cartPrice() {
      return this.$store.getters.getCartPrice;
    },
    user() {
      return this.$store.state.Auth.user;
    },
  },
};
</script>
