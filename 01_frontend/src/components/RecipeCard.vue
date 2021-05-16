<template>
  <div class="card" :style="x">
    <h1 class="recipeName">
      {{ recipe[1].name }}
    </h1>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "HelloWorld",
  data() {
    return {}
  },
  computed: {
    x: function () {
      if (typeof this.index === "number") {
        return `transform: translate(-50%, ${this.index * 10}px) scaleX(${
          this.index * 0.08 + 0.68
        }); opacity: ${this.index * 0.2 + 0.2}; filter: blur(${
          2 - this.index / 2
        }px);`
      }
      return ""
    },
  },
  props: {
    recipe: Array,
    index: Number,
  },
})
</script>

<style scoped>
.card {
  background-color: whitesmoke;
  border-radius: 15px;
  width: 250px;
  height: 405px;
  padding: 15px;
  position: absolute;
  left: 50%;
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: left;
  font-size: 30px;
  margin: 0;
  padding: 0 0 15px 0;
}

hr {
  display: block;
  border: none;
  height: 4px;
  border-radius: 2px;
  background-color: #06d6a0;
  margin: 0px;
}
</style>
