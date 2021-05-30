import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { nanoid } from "nanoid"

Vue.use(Vuex)

const backendAddress = getBackendAddress()

export default new Vuex.Store({
  state: {
    recipes: {},
    bookmarks: [],
  },
  mutations: {
    getRecipes(state, data) {
      state.recipes = data
    },
    addRecipe(state, recipe) {
      const id = recipe._id
      delete recipe._id
      state.recipes = {
        ...state.recipes,
        [id]: { ...recipe },
      }
    },
    deleteRecipe(state, recipeId) {
      Vue.delete(state.recipes, recipeId)
    },
    modifyBox(state, recipe) {
      state.recipes[recipe[0]].box = recipe[1].box
    },
    addRecipeBookmarks(state, recipeId) {
      if (!state.bookmarks.includes(recipeId)) {
        state.bookmarks.push(recipeId)
      }
    },
    removeRecipeBookmarks(state, recipeId) {
      const index = state.bookmarks.indexOf(recipeId)
      if (index > -1) {
        state.bookmarks.splice(index, 1)
      }
    },
    getBookmarks(state, data) {
      state.bookmarks = data
    },
  },
  actions: {
    async getRecipes({ commit }) {
      const res = await axios.get(backendAddress + "getRecipes")
      normalizeBoxes(res.data)
      commit("getRecipes", res.data)
    },
    async addRecipe({ commit }, recipe) {
      const recipeObject = { ...recipe, _id: nanoid(10), box: 0 }
      commit("addRecipe", recipeObject)
      axios.post(backendAddress + "addRecipe", recipeObject)
    },
    async deleteRecipe({ commit }, recipeId) {
      commit("deleteRecipe", recipeId)
      axios.post(backendAddress + "deleteRecipe", { recipeId })
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
    async addRecipeBookmarks({ commit }, recipeId) {
      commit("addRecipeBookmarks", recipeId)
      axios.post(backendAddress + "addBookmark", { _id: recipeId })
    },
    async removeRecipeBookmarks({ commit }, recipeId) {
      commit("removeRecipeBookmarks", recipeId)
      axios.post(backendAddress + "removeBookmark", { _id: recipeId })
    },
    async getBookmarks({ commit }) {
      const res = await axios.get(backendAddress + "getBookmarks")
      commit("getBookmarks", res.data)
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

function getBackendAddress() {
  const url = window.location.href
  const arr = url.split("/")
  let backendAddress
  if (process.env.NODE_ENV === "development") {
    const domain = arr[2].split(":")
    backendAddress = arr[0] + "//" + domain[0] + ":3000"
  } else {
    backendAddress = arr[0] + "//" + arr[2]
  }
  return backendAddress + "/api/"
}
