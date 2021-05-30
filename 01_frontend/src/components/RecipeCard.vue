<template>
  <div>
    <div class="card" :style="x">
      <h1 v-if="!editMode" class="recipeName">
        {{ recipe[1].name }}
      </h1>
      <textarea
        v-if="editMode"
        rows="2"
        name="Name"
        id="inputRecipeName"
        placeholder="Enter recipe name"
        v-model="recipe[1].name"
      />
      <hr />
      <div id="lowerPart">
        <div class="ingredientTable">
          <table>
            <tr v-for="(ingredient, i) in recipe[1].ingredients" :key="i">
              <td style="width: 18%; text-align: right">
                <span v-if="!editMode">{{ ingredient[0] }}</span>
                <input
                  v-if="editMode"
                  type="number"
                  placeholder="500"
                  v-model="ingredient[0]"
                  @change="addIngredientIfNeeded"
                />
              </td>
              <td style="width: 15%; padding-left: 5px">
                <span v-if="!editMode">{{ ingredient[1] }}</span>
                <input
                  v-if="editMode"
                  type="text"
                  placeholder="unit"
                  v-model="ingredient[1]"
                  @change="addIngredientIfNeeded"
                />
              </td>
              <td style="padding-left: 10px">
                <span v-if="!editMode">{{ ingredient[2] }}</span>
                <input
                  v-if="editMode"
                  type="text"
                  placeholder="ingredient"
                  v-model="ingredient[2]"
                  @change="addIngredientIfNeeded"
                />
              </td>
            </tr>
          </table>
        </div>
        <div id="buttons">
          <button id="delete" @click="deleteRecipe" v-if="editMode">
            <i class="fas fa-trash"></i>
          </button>
          <button id="save" @click="saveChanges" v-if="editMode">
            <i class="fas fa-save"></i>
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
    ingredients: function () {
      return this.recipe[1].ingredients
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
      if (this.editMode) this.addIngredientIfNeeded()
      else this.removeEmptyIngredients()
    },
    saveChanges() {
      this.removeEmptyIngredients()
      store.dispatch("changeRecipe", { _id: this.recipe[0], ...this.recipe[1] })
      this.switchEditMode()
    },
    removeEmptyIngredients() {
      for (let i = this.recipe[1].ingredients.length - 1; i >= 0; i--) {
        if (!this.recipe[1].ingredients[i][2]) {
          this.recipe[1].ingredients.splice(i, 1)
        }
      }
    },
    addIngredientIfNeeded() {
      const ingredients = this.recipe[1].ingredients
      const lastIndex = ingredients.length - 1
      if (
        lastIndex < 0 ||
        ingredients[lastIndex][0] ||
        ingredients[lastIndex][2]
      )
        this.recipe[1].ingredients.push(["", "", ""])
    },
  },
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #909090;
}
#lowerPart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 298px;
}

.ingredientTable {
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
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
  text-overflow: ellipsis;
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
  font-weight: lighter;
  text-align: left;
  border-collapse: collapse;
}

td {
  border-bottom: 2px dashed rgb(200, 200, 200);
}

td {
  padding: 4px 0;
}

tr:last-child td {
  border-bottom: 0;
}

input {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
}

#inputRecipeName {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 67px;
  width: 220px;
  font-size: 26px;
  font-weight: 500;
  margin: 0;
  resize: none;
  border-style: none;
  background-color: var(--white);
}
</style>
