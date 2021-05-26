<template>
  <div id="bookmarks">
    <transition-group id="menu" name="bookmarkTrans"
      ><div v-for="id in bookmarks" :key="id" class="entry">
        <button @click="removeRecipe($event, id)">
          <i class="fas fa-times"></i>
        </button>
        {{ recipes[id].name }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import Vue from "vue"
import store from "@/store"
export default Vue.extend({
  name: "Bookmarks",
  data() {
    return {}
  },
  computed: {
    bookmarks: function () {
      return store.state.bookmarks
    },
    recipes: function () {
      return store.state.recipes
    },
  },
  methods: {
    removeRecipe: function (event, id) {
      store.commit("removeRecipeBookmarks", id)
    },
  },
})
</script>

<style scoped>
#bookmarks {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--green-8);
  z-index: 2;
}

#menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 6px;
}

.entry {
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
  font-size: 1.1em;
  padding: 6px 3px;
  border-radius: 3px;
  background-color: var(--white);
  margin: 2px;
  min-width: 100px;
  width: 22.6vw;
  max-width: 170px;
  min-height: 62px;
  height: 13.9vw;
  max-height: 105px;
  text-align: left;
  align-items: flex-start;
  align-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  cursor: pointer;
}

.entry button {
  position: absolute;
  bottom: 2px;
  right: 2px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 18px;
  cursor: pointer;
  z-index: 3;
}
</style>
