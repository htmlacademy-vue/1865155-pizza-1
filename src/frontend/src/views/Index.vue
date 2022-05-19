<template>
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="css/style.min.css" />
      <title>V!U!E! Pizza - главная</title>
    </head>
    <body>
      <header class="header">
        <div class="header__logo">
          <a href="index.html" class="logo">
            <img
              src="img/logo.svg"
              alt="V!U!E! Pizza logo"
              width="90"
              height="40"
            />
          </a>
        </div>
        <div class="header__cart">
          <a href="cart.html">0 ₽</a>
        </div>
        <div class="header__user">
          <a href="#" class="header__login"><span>Войти</span></a>
        </div>
      </header>

      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <div class="content__dough">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите тесто</h2>

                <div class="sheet__content dough">
                  <label
                    v-for="dough in pizzas.dough"
                    :key="dough.id"
                    class="dough__input"
                    :class="{
                      'dough__input--light': dough.id === 1,
                      'dough__input--large': dough.id === 2,
                    }"
                  >
                    <input
                      type="radio"
                      name="dought"
                      :value="getDoughValue(dough.id)"
                      class="visually-hidden"
                    />
                    <b>{{ dough.name }}</b>
                    <span>{{ dough.description }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>

                <div class="sheet__content diameter">
                  <label
                    v-for="size in pizzas.sizes"
                    :key="size.id"
                    class="diameter__input"
                    :class="{
                      'diameter__input--small': size.id === 1,
                      'diameter__input--normal': size.id === 2,
                      'diameter__input--big': size.id === 3,
                    }"
                  >
                    <input
                      type="radio"
                      name="diameter"
                      :value="getSizeValue(size.id)"
                      class="visually-hidden"
                    />
                    <span>{{ size.name }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="title title--small sheet__title">
                  Выберите ингредиенты
                </h2>

                <div class="sheet__content ingredients">
                  <div class="ingredients__sauce">
                    <p>Основной соус:</p>
                    <label
                      v-for="sauce in pizzas.sauces"
                      :key="sauce.id"
                      class="radio ingredients__input"
                    >
                      <input
                        type="radio"
                        name="sauce"
                        :value="getSauceValue(sauce.id)"
                      />
                      <span>{{ sauce.name }}</span>
                    </label>
                  </div>

                  <div class="ingredients__filling">
                    <p>Начинка:</p>

                    <ul class="ingredients__list">
                      <li
                        v-for="ingredient in pizzas.ingredients"
                        :key="ingredient.id"
                        class="ingredients__item"
                      >
                        <span
                          class="filling"
                          :class="getIngredientClassName(ingredient.image)"
                          >{{ ingredient.name }}
                        </span>
                        <div
                          class="counter counter--orange ingredients__counter"
                        >
                          <button
                            type="button"
                            class="counter__button counter__button--minus"
                            disabled
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="content__pizza">
              <label class="input">
                <span class="visually-hidden">Название пиццы</span>
                <input
                  type="text"
                  name="pizza_name"
                  placeholder="Введите название пиццы"
                />
              </label>

              <div class="content__constructor">
                <div class="pizza pizza--foundation--big-tomato">
                  <div class="pizza__wrapper">
                    <div class="pizza__filling pizza__filling--ananas"></div>
                    <div class="pizza__filling pizza__filling--bacon"></div>
                    <div class="pizza__filling pizza__filling--cheddar"></div>
                  </div>
                </div>
              </div>

              <div class="content__result">
                <p>Итого: 0 ₽</p>
                <button type="button" class="button" disabled>Готовьте!</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </body>
  </html>
</template>

<script>
import miscs from "@/static/misc.json";
import pizzas from "@/static/pizza.json";
import users from "@/static/user.json";

export default {
  name: "Index",
  data() {
    return {
      miscs,
      pizzas,
      users,
    };
  },

  methods: {
    getDoughValue(doughId) {
      if (doughId === 1) {
        return "light";
      } else {
        return "large";
      }
    },
    getSizeValue(sizeId) {
      if (sizeId === 1) {
        return "small";
      } else if (sizeId === 2) {
        return "normal";
      } else {
        return "big";
      }
    },
    getSauceValue(sauceId) {
      if (sauceId === 1) {
        return "tomato";
      } else {
        return "creamy";
      }
    },
    getIngredientClassName(imgUrl) {
      function replacer(match, p1, p2) {
        return [p2];
      }
      let result = imgUrl.replace(/^\/(.+\/)*(.+)\.(.+)$/, replacer);
      return "filling--" + result;
    },
  },
};
</script>

<style></style>
