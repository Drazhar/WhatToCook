import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { nanoid } from "nanoid"

Vue.use(Vuex)

let backendAddress
if (process.env.NODE_ENV === "development") {
  backendAddress = "http://localhost:3000/api/"
} else {
  let url = window.location.href
  let arr = url.split("/")
  backendAddress = arr[0] + "//" + arr[2] + "/api/"
}

export default new Vuex.Store({
  state: {
    recipes: {},
    bookmarks: {},
  },
  mutations: {
    getRecipes(state, data) {
      state.recipes = data
    },
    addRecipe(state, recipe) {
      state.recipes = {
        ...state.recipes,
        [recipe._id]: { name: recipe.name, box: recipe.box },
      }
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
  },
  actions: {
    async getRecipes({ commit }) {
      const res = await axios.get(backendAddress + "getRecipes")
      normalizeBoxes(res.data)
      commit("getRecipes", res.data)
    },
    async addRecipe({ commit }, recipe) {
      const recipeObject = { name: recipe.name, _id: nanoid(10), box: 0 }
      commit("addRecipe", recipeObject)
      axios.post(backendAddress + "addRecipe", recipeObject)
    },
    async increaseBox({ commit }, recipe) {
      recipe[1].box++
      commit("modifyBox", recipe)
      axios.post(backendAddress + "modifyBox", recipe)
    },
    async decreaseBox({ commit }, recipe) {
      if (recipe[1].box > 0) {
        recipe[1].box--
        commit("modifyBox", recipe)
        axios.post(backendAddress + "modifyBox", recipe)
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
    axios.post(backendAddress + "updateRecipes", data)
  }
}
