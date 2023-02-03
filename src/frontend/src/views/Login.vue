<template>
  <div class="sign-form">
    <router-link to="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="test.html" method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            placeholder="example@mail.ru"
            v-model="email"
          />
          <span v-if="validations.email.error" style="color: red">{{
            validations.email.error
          }}</span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            name="pass"
            placeholder="***********"
            v-model="password"
          />
          <span v-if="validations.password.error" style="color: red">{{
            validations.password.error
          }}</span>
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const rules = {
  required: {
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
};

const validator = (value, appliedRules) => {
  let error = "";
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  watch: {
    email() {
      this.clearValidationErrors();
    },
    password() {
      this.clearValidationErrors();
    },
  },
  methods: {
    async login() {
      if (
        !this.validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      await this.$router.push("/");
    },
    validateFields(fields, validations) {
      let isValid = true;
      Object.keys(validations).forEach((key) => {
        validations[key].error = validator(fields[key], validations[key].rules);
        if (validations[key].error) {
          isValid = false;
        }
      });
      return isValid;
    },
    clearValidationErrors() {
      if (!this.validations) {
        return;
      }
      Object.keys(this.validations).forEach((key) => {
        this.$set(this.validations[key], "error", "");
      });
    },
  },
};
</script>
