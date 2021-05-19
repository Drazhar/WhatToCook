<template>
  <div id="app">
    <router-view :key="$route.path" />
    <BottomMenu />
  </div>
</template>

<script>
import Vue from "vue"
import store from "@/store"
import BottomMenu from "@/components/BottomMenu.vue"

export default Vue.extend({
  name: "App",
  components: {
    BottomMenu,
  },
  data() {
    return {}
  },
  computed: {
    bookmarks: () => {
      return store.state.bookmarks
    },
    bookmarksLength: function () {
      return Object.keys(this.bookmarks).length
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black-font);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
</style>
