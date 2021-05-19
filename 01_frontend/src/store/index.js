import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { nanoid } from "nanoid"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipes: {},
    bookmarks: {},
    showBookmarks: false,
  },
  mutations: {
    getRecipes(state, data) {
      state.recipes = data
    },
    addRecipe(state, recipe) {
      state.recipes = { ...state.recipes, [recipe[0]]: recipe[1] }
    },
    modifyBox(state, recipe) {
      state.recipes[recipe[0]].box = recipe[1].box
    },
    addRecipeBookmarks(state, recipe) {
      state.bookmarks = { ...state.bookmarks, [recipe[0]]: recipe[1] }
    },
    removeRecipeBookmarks(state, recipeId) {
      Vue.delete(state.bookmarks, recipeId)
    },
    toggleShowBookmarks(state) {
      state.showBookmarks = !state.showBookmarks
    },
  },
  actions: {
    async getRecipes({ commit }) {
      const res = await axios.get("http://localhost:3000/api/getRecipes")
      normalizeBoxes(res.data)
      commit("getRecipes", res.data)
    },
    async addRecipe({ commit }, recipe) {
      const recipeObject = { name: recipe.name, _id: nanoid(10), box: 0 }
      commit("addRecipe", recipeObject)
      axios.post("http://localhost:3000/api/addRecipe", recipeObject)
    },
    async increaseBox({ commit }, recipe) {
      recipe[1].box++
      commit("modifyBox", recipe)
      axios.post("http://localhost:3000/api/modifyBox", recipe)
    },
    async decreaseBox({ commit }, recipe) {
      if (recipe[1].box > 0) {
        recipe[1].box--
        commit("modifyBox", recipe)
        axios.post("http://localhost:3000/api/modifyBox", recipe)
      }
    },
  },
  modules: {},
})

function normalizeBoxes(data) {
  let minBox = Infinity
  for (const prop in data) if (data[prop].box < minBox) minBox = data[prop].box
  if (minBox > 0) {
    for (const prop in data) data[prop].box -= minBox
    axios.post("http://localhost:3000/api/updateRecipes", data)
  }
}
