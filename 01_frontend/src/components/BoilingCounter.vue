<template>
  <div id="counter">
    <svg xmlns="http://www.w3.org/2000/svg">
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.1" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -9"
          result="highContrastGraphic"
        />
        <feComposite
          in="SourceGraphic"
          in2="highContractGraphic"
          operator="atop"
        />
      </filter>
    </svg>
    <div id="relative">
      {{ count }}
      <span class="bubbles">
        <Bubble v-for="n in count * 6 > 50 ? 50 : count * 6" :key="n" />
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import Bubble from "@/components/Bubble.vue"

export default Vue.extend({
  name: "BoilingCounter",
  components: {
    Bubble,
  },
  props: {
    count: Number,
  },
})
</script>

<style>
svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
}

#counter {
  position: absolute;
  top: -30%;
  right: -35%;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  vertical-align: center;
  color: var(--white);
  border-radius: 50%;
  background-color: var(--red);
  height: 19px;
  width: 19px;
  z-index: 10;
  filter: url("#gooey");
}

#relative {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.bubbles {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 7px;
  z-index: -1;
}
</style>

/* filter: url("#gooey"); */
