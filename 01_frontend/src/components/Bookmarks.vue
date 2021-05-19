<template>
  <div @click="toggleShowBookmarks" id="bookmarks">
    <transition-group id="menu" name="bookmarkTrans"
      ><div v-for="id in Object.keys(bookmarks)" :key="id" class="entry">
        <button @click="removeRecipe($event, id)">
          <i class="fas fa-times"></i>
        </button>
        {{ bookmarks[id].name }}
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
  },
  methods: {
    removeRecipe: function (event, id) {
      store.commit("removeRecipeBookmarks", id)
    },
    toggleShowBookmarks(event) {
      if (event.target.id === "bookmarks") store.commit("toggleShowBookmarks")
    },
  },
})
</script>

<style scoped>
#bookmarks {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--green-8);
  z-index: 2;
  padding: 6px;
}

#menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.entry {
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
