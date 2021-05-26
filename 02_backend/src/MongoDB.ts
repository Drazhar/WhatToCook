const { MongoClient } = require("mongodb")

export class MongoDB {
  dbName: string
  client: any
  recipes: any
  bookmarks: any

  constructor(dbName: string) {
    this.dbName = dbName
    this.client = new MongoClient(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.client
      .connect()
      .then(() => {
        const database = this.client.db(this.dbName)
        this.recipes = database.collection("recipes")
        this.bookmarks = database.collection("bookmarks")
      })
      .catch((err) => {
        console.log("Couldn't connect to database...")
        console.log(err)
      })
  }

  async insertDocuments(data) {
    await this.recipes.insertOne(data)
  }

  async getRecipes() {
    const cursor = this.recipes.find()
    const result = await cursor.toArray()
    return recipesArrayToObject(result)
  }

  async deleteRecipe(recipeId) {
    const result = await this.recipes.deleteOne({ _id: recipeId })
    console.log("Deleted: " + result.deletedCount)
  }

  updateValue(_id, payload) {
    this.recipes.updateOne({ _id }, { $set: payload })
  }

  addBookmark(_id) {
    this.bookmarks
      .insertOne(_id)
      .catch((error) => console.log("Bookmark already exists"))
  }

  removeBookmark(_id) {
    this.bookmarks
      .deleteOne(_id)
      .catch((error) => console.log("Bookmark not found for deletion"))
  }

  async getBookmarks() {
    const cursor = this.bookmarks.find()
    const result = await cursor.toArray()
    let resultCleaned = []
    result.forEach((element) => {
      resultCleaned.push(element._id)
    })
    return resultCleaned
  }
}

function recipesArrayToObject(recipesArray) {
  const result = {}
  recipesArray.forEach((value) => {
    result[value._id] = { name: value.name, box: value.box }
  })
  return result
}
