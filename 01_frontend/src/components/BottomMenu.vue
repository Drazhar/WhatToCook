<template>
  <div class="bottomMenu">
    <router-link to="add" class="menuBtn">
      <i class="far fa-plus-square"></i>
    </router-link>
    <router-link to="/bookmarks" class="menuBtn" id="btnCart"
      ><p v-if="bookmarksLength > 0">{{ bookmarksLength }}</p>
      <i class="fas fa-shopping-cart"></i
    ></router-link>
    <router-link to="/" class="menuBtn">
      <i class="fas fa-sync-alt"></i>
    </router-link>
  </div>
</template>

<script>
import Vue from "vue"
import store from "@/store"

export default Vue.extend({
  name: "BottomMenu",
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
  color: var(--white);
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

#btnCart {
  position: relative;
}

#btnCart p {
  position: absolute;
  top: -55%;
  right: -5%;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  vertical-align: center;
  color: var(--white);
  border-radius: 50%;
  background-color: var(--red);
  height: 19px;
  width: 19px;
}
</style>
