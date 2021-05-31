<template>
  <div id="bookmarksSection">
    <div id="ingredients">
      <div
        class="ingredient card"
        @click="switchState"
        v-for="ingredient in ingredients"
        :key="ingredient.name"
      >
        <div class="ingName">
          {{ ingredient.name }}
        </div>
        <div class="ingAmount">
          {{ ingredient.amount }} {{ ingredient.unit }}
        </div>
      </div>
    </div>
    <div id="bookmarks">
      <div v-for="id in bookmarks" :key="id" class="entry card">
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
    ingredients: function () {
      const ingredients = {}
      this.bookmarks.forEach((recipeId) => {
        if (this.recipes[recipeId]) {
          this.recipes[recipeId].ingredients.forEach((ingredient) => {
            if (ingredient[2] in ingredients)
              ingredients[ingredient[2]].amount += ingredient[0]
            else
              ingredients[ingredient[2]] = {
                name: ingredient[2],
                amount: ingredient[0],
                unit: ingredient[1],
              }
          })
        }
      })
      delete ingredients[""]
      return ingredients
    },
  },
  methods: {
    removeRecipe: function (event, recipeId) {
      store.dispatch("removeRecipeBookmarks", recipeId)
    },
    switchState: function (event) {
      const card = searchParentCard(event.target, "card")
      if (card) card.classList.toggle("checked")
    },
  },
})

function searchParentCard(domElement, className) {
  if (!domElement.outerHTML) return false
  if (domElement.classList.contains(className)) return domElement
  return searchParentCard(domElement.parentNode, className)
}
</script>

<style scoped>
#bookmarksSection {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--green-8);
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.card {
  background-color: var(--white);
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
  margin: 2px;
  width: 97px;
  height: 60px;
  border-radius: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

#ingredients {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.ingredient {
  font-size: 16px;
  padding: 4px 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ingName {
  flex-grow: 1;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ingAmount {
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
}

#bookmarks {
  height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  margin-bottom: 15px;
}
.entry {
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 1.1em;
  padding: 6px 3px;
  text-align: left;
  align-items: flex-start;
  align-content: flex-start;
  position: relative;
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

.checked {
  background-color: var(--blue);
  opacity: 0.9;
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
