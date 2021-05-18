<template>
  <div class="card" :style="x">
    <button id="edit"><i class="fas fa-pen"></i></button>
    <h1 class="recipeName">
      {{ recipe[1].name }}
    </h1>
    <hr />
    <table>
      <tr>
        <td>500g</td>
        <td>Tomaten</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from "vue"
export default Vue.extend({
  name: "HelloWorld",
  data() {
    return {}
  },
  computed: {
    countSubOne: function () {
      if (this.count > 2) return this.count - 1
      return 1
    },
    translate: function () {
      if (this.count <= 1) return 40
      return (120 / this.countSubOne) * this.index - 80
    },
    scale: function () {
      if (this.count <= 1) return 1
      return (0.4 / this.countSubOne) * this.index + 0.6
    },
    blur: function () {
      if (this.count <= 1) return 0
      return (-3 / this.countSubOne) * this.index + 3
    },
    x: function () {
      return `transform: translate(-50%, ${this.translate}px) scale(${this.scale}); filter: blur(${this.blur}px);`
    },
  },
  props: {
    recipe: Array,
    index: Number,
    count: Number,
  },
})
</script>

<style scoped>
#edit {
  position: absolute;
  font-size: 18px;
  bottom: 15px;
  right: 10px;
  background-color: whitesmoke;
  border: none;
  cursor: pointer;
}

.card {
  background-color: whitesmoke;
  border-radius: 15px;
  width: 230px;
  height: 372px;
  padding: 15px;
  position: absolute;
  left: 50%;
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
}

h1 {
  height: 60px;
  text-align: left;
  font-size: 26px;
  font-size: clamp(20px, 26px, 30px);
  font-weight: 500;
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

table {
  margin-top: 14px;
  font-size: 18px;
  font-weight: 300;
}
</style>
