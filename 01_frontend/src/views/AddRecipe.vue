<template>
  <div id="addRecipe">
    <form>
      <div class="card">
        <textarea
          rows="2"
          name="Name"
          id="inputRecipeName"
          placeholder="Enter recipe name"
        />
        <hr />
        <div
          class="ingredients"
          v-for="(ingredient, index) in ingredients"
          :key="index"
        >
          <input
            type="number"
            name="amount"
            id="amount"
            class="amount"
            placeholder="500"
            v-model="ingredient[0]"
          />
          <input
            type="text"
            name="unit"
            id="unit"
            class="unit"
            placeholder="unit"
            v-model="ingredient[1]"
          />
          <input
            type="text"
            name="ingredient"
            id="ingredient"
            class="ingredient"
            placeholder="ingredient"
            v-model="ingredient[2]"
          />
        </div>
      </div>
      <input @click="addRecipe" type="submit" value="Add" />
    </form>
  </div>
</template>

<script>
import Vue from "vue"
import store from "@/store"
export default Vue.extend({
  name: "AddRecipe",
  data() {
    return {
      ingredients: [["", "", ""]],
    }
  },
  methods: {
    addRecipe(event) {
      event.preventDefault()
      const recipeName = document.getElementById("inputRecipeName").value
      store.dispatch("addRecipe", {
        name: recipeName,
        ingredients: this.ingredients.slice(0, this.ingredients.length - 1),
      })
    },
  },
  watch: {
    ingredients: function (val) {
      const lastIndex = val.length - 1
      if (val[lastIndex][0] && val[lastIndex][1] && val[lastIndex][2])
        this.ingredients.push(["", "", ""])
    },
  },
})
</script>

<style scoped>
#addRecipe {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding: 6px;
}

.card {
  background-color: var(--white);
  border-radius: 15px;
  width: 230px;
  height: 372px;
  padding: 15px;
  position: absolute;
  left: 50%;
  box-shadow: 1px 5px 8px 1px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  left: 50%;
  transform: translate(-50%, 115px);
}

.ingredients {
  margin-top: 3px;
  display: flex;
  width: 100%;
  overflow: hidden;
}
.ingredients .amount {
  width: 40px;
}
.ingredients .unit {
  width: 30px;
}
.ingredients .ingredient {
  width: 136px;
}

#inputRecipeName {
  height: 60px;
  width: 220px;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  padding: 0 0 15px 0;
  resize: none;
  border-style: none;
  background-color: var(--white);
}

hr {
  display: block;
  border: none;
  height: 4px;
  border-radius: 2px;
  background-color: var(--green);
  margin: 0px;
}
</style>
