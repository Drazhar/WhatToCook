<template>
  <div id="bookmarksSection">
    <div id="ingredients"></div>
    <div id="bookmarks">
      <div v-for="id in bookmarks" :key="id" class="entry">
        <button @click="removeRecipe($event, id)">
          <i class="fas fa-times"></i>
        </button>
        <span v-if="recipes[id]">{{ recipes[id].name }}</span>
        <div v-if="!recipes[id]" class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
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
    removeRecipe: function (event, recipeId) {
      store.dispatch("removeRecipeBookmarks", recipeId)
    },
  },
})
</script>

<style scoped>
#bookmarksSection {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--green-8);
  z-index: 2;
  display: flex;
  flex-direction: column;
}

#ingredients {
  height: 100%;
}

#bookmarks {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 60px;
}

.entry {
  flex-grow: 0;
  flex-shrink: 0;
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
  font-size: 1.1em;
  padding: 6px 3px;
  border-radius: 3px;
  background-color: var(--white);
  margin: 2px;
  width: 97px;
  height: 60px;
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

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 50px;
  transform: scale(0.6);
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--grey);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.8s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.8s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.8s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.8s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
