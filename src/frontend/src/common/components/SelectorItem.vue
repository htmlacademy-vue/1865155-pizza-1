<template>
  <span
    class="filling"
    :class="{
      shake: ingredientId === animateOnClickId ? true : false,
      move: ingredientId === animateOnDropId ? true : false,
      cssProps: ingredientId === animateOnDropId ? true : false,
    }"
    >{{ ingredientName }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    ingredientName: {
      type: String,
      required: true,
    },
    animateOnClickId: {
      type: Number,
      default: 0,
    },
    ingredientId: {
      type: Number,
      required: true,
    },
    onDropCoordinates: {
      type: Object,
    },
    animateOnDropId: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    //В данный момент не используется. Не получилось использовать эти переменные в стиле
    cssProps() {
      return {
        "--move-left": this.onDropCoordinates.x + "px",
        "--move-top": this.onDropCoordinates.y + "px",
      };
    },
  },
};
</script>

<style>
:root {
  --move-left: 400px;
  --move-top: 0px;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.move {
  animation: move 0.5s;
  position: relative;
}

@keyframes move {
  0% {
    top: 0px;
    left: 0px;
  }
  50% {
    top: -30px;
  }
  100% {
    top: var(--move-top);
    left: var(--move-left);
  }
}
</style>
