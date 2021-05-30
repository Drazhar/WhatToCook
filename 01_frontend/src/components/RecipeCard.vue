<template>
  <div>
    <div class="card" :style="x">
      <h1 class="recipeName">
        {{ recipe[1].name }}
      </h1>
      <hr />
      <div id="lowerPart">
        <table>
          <tr v-for="ingredient in recipe[1].ingredients" :key="ingredient[2]">
            <td style="width: 20%">
              <span v-if="!editMode">{{ ingredient[0] }}</span>
              <input
                v-if="editMode"
                type="number"
                id="amount"
                placeholder="500"
                v-model="ingredient[0]"
              />
            </td>
            <td style="width: 15%">
              <span v-if="!editMode">{{ ingredient[1] }}</span>
              <input
                v-if="editMode"
                type="text"
                id="unit"
                placeholder="unit"
                v-model="ingredient[1]"
              />
            </td>
            <td style="padding-left: 5px">
              <span v-if="!editMode">{{ ingredient[2] }}</span>
              <input
                v-if="editMode"
                type="text"
                id="ingredient"
                placeholder="ingredient"
                v-model="ingredient[2]"
              />
            </td>
          </tr>
        </table>
        <div id="buttons">
          <button id="delete" @click="deleteRecipe()" v-if="editMode">
            <i class="fas fa-trash"></i>
          </button>
          <button id="save">
            <i class="fas fa-save" v-if="editMode"></i>
          </button>
          <button id="edit" @click="switchEditMode">
            <i class="fas fa-pen"></i>
          </button>
        </div>
      </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue"
import Vue from "vue"
import store from "@/store"
export default Vue.extend({
  components: { ConfirmDialog },
  name: "HelloWorld",
  data() {
    return {
      editMode: false,
    }
  },
  computed: {
    countSubOne: function () {
      if (this.count > 2) return this.count - 1
      return 1
    },
    translate: function () {
      if (this.count <= 1) return 0
      return (120 / this.countSubOne) * this.index - 120
    },
    scale: function () {
      if (this.count <= 1) return 1
      return (0.4 / this.countSubOne) * this.index + 0.6
    },
    blur: function () {
      if (this.count <= 1) return 0
      return (-3 / this.countSubOne) * this.index + 3
    },
    x: function () {
      return `transform: translate(-50%, ${this.translate}px) scale(${this.scale}); filter: blur(${this.blur}px);`
    },
  },
  props: {
    recipe: Array,
    index: Number,
    count: Number,
  },
  methods: {
    async deleteRecipe() {
      const ok = await this.$refs.confirmDialog.show({
        title: "Delete Recipe",
        message: "Are you sure you want to delete this recipe forever?",
        okButton: "Delete Forever",
      })
      if (ok) {
        this.$emit("deleteRecipe")
        store.dispatch("deleteRecipe", this.recipe[0])
      }
    },
    switchEditMode() {
      this.editMode = !this.editMode
    },
  },
})
</script>

<style scoped>
#lowerPart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 298px;
}

#buttons {
  display: flex;
  justify-content: flex-end;
  bottom: 10px;
  height: 27px;
  align-items: flex-end;
}
button:hover {
  color: var(--red);
}

#save {
  font-size: 19px;
}

button {
  font-size: 18px;
  background-color: var(--white);
  border: none;
  cursor: pointer;
  margin-left: 45px;
  transition: color 0.1s;
}

.card {
  will-change: transform, filter;
  background-color: var(--white);
  border-radius: 15px;
  width: 230px;
  height: 372px;
  padding: 15px;
  position: absolute;
  left: 50%;
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
}

h1 {
  height: 60px;
  text-align: left;
  font-size: 26px;
  font-size: clamp(20px, 26px, 30px);
  font-weight: 500;
  margin: 0;
  padding: 0 0 15px 0;
}

hr {
  display: block;
  border: none;
  height: 4px;
  border-radius: 2px;
  background-color: var(--green);
  margin: 0px;
}

table {
  width: 100%;
  margin: 14px 0 0 0;
  padding: 0 9px 0 0;
  font-size: 18px;
  font-weight: 300;
  text-align: left;
}

input {
  width: 100%;
}
</style>
