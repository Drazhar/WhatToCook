import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { nanoid } from "nanoid"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipes: {},
  },
  mutations: {
    getRecipes(state, data) {
      state.recipes = data
    },
    addRecipe(state, recipe) {
      state.recipes[recipe._id] = { name: recipe.name, box: recipe.box }
    },
  },
  actions: {
    async getRecipes({ commit }) {
      const res = await axios.get("http://localhost:3000/api/getRecipes")
      commit("getRecipes", res.data)
    },
    async addRecipe({ commit }, recipe) {
      const recipeObject = { name: recipe.name, _id: nanoid(10), box: 0 }
      commit("addRecipe", recipeObject)
      axios.post("http://localhost:3000/api/addRecipe", recipeObject)
    },
  },
  modules: {},
})
