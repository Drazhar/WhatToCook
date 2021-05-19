<template>
  <span id="bubble" :style="properties"> </span>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
  name: "BoilingCounter",
  data() {
    return {
      left: Math.random() * 12 - 7,
      size: 6 + Math.random() * 4,
      speed: 3 + Math.random() * 6,
      delay: Math.random() * 3,
    }
  },
  computed: {
    properties: function () {
      return `left: ${this.left}px; width: ${this.size}px; height: ${this.size}px; animation: move ${this.speed}s infinite; animation-delay: ${this.delay}s`
    },
  },
})
</script>

<style>
#bubble {
  background-color: var(--red);
  border-radius: 100%;
  position: absolute;
  top: 4px;
  bottom: 0;
  display: block;
  z-index: -10;
}

@keyframes move {
  0% {
    background-color: var(--red);
    transform: translate(0, 0);
  }
  10% {
    background-color: var(--red);
  }
  40% {
    background-color: var(--yellow);
  }
  99% {
    transform: translate(0, -30px) scale(0.3);
    background-color: var(--yellow);
  }
  100% {
    transform: translate(0, 0);
    opacity: 0;
  }
}
</style>
