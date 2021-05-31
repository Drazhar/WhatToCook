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
  created() {
    store.dispatch("getBookmarks").then(() => {
      store.dispatch("getRecipes")
    })
  },
})
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black-font);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}
</style>
