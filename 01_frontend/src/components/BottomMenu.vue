<template>
  <div class="bottomMenu">
    <router-link to="add" class="menuBtn">
      <i class="far fa-plus-square"></i>
    </router-link>
    <router-link to="/bookmarks" class="menuBtn" id="btnCart"
      ><BoilingCounter v-if="bookmarksLength > 0" :count="bookmarksLength" />
      <i class="fas fa-shopping-cart"></i
    ></router-link>
    <router-link to="/" class="menuBtn">
      <i class="fas fa-layer-group"></i>
    </router-link>
  </div>
</template>

<script>
import Vue from "vue"
import store from "@/store"
import BoilingCounter from "@/components/BoilingCounter.vue"

export default Vue.extend({
  name: "BottomMenu",
  components: {
    BoilingCounter,
  },
  computed: {
    bookmarks: () => {
      return store.state.bookmarks
    },
    bookmarksLength: function () {
      return Object.keys(this.bookmarks).length
    },
  },
})
</script>

<style>
.bottomMenu {
  background-color: var(--grey);
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.menuBtn {
  font-size: 26px;
  color: var(--white-trans);
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.router-link-exact-active {
  color: var(--white);
}

#btnCart {
  position: relative;
}
</style>
