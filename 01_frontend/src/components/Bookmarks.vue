<template>
  <div id="bookmarks">
    <div id="menu">
      <transition-group name="bookmarkTrans"
        ><div v-for="id in Object.keys(bookmarks)" :key="id" class="entry">
          {{ bookmarks[id].name }}
        </div>
      </transition-group>
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

  background-color: rgba(0, 0, 0, 0.2);
}

#menu {
  background-color: whitesmoke;
}

.entry {
  transition: all 0.1s;
}

.bookmarkTrans-enter {
  opacity: 0;
}
</style>
