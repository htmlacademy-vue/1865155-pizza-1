<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector />
          <BuilderSizeSelector />
          <BuilderIngredientsSelector />

          <div class="content__pizza">
            <BuilderNameSelector />
            <BuilderPizzaView />
            <BuilderPriceCounter />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter.vue";
import BuilderNameSelector from "../modules/builder/components/BuilderNameSelector.vue";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderNameSelector,
  },
};
</script>

<style></style>
