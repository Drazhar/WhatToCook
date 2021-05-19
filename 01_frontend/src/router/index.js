import Vue from "vue"
import VueRouter from "vue-router"
import Main from "@/views/Main.vue"
import Bookmarks from "@/views/Bookmarks.vue"
import AddRecipe from "@/views/AddRecipe.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/bookmarks",
    component: Bookmarks,
  },
  {
    path: "/add",
    component: AddRecipe,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
