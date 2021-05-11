const { MongoClient } = require("mongodb")

export class MongoDB {
  dbName: string
  client: any
  recipes: any

  constructor(dbName: string) {
    this.dbName = dbName
    this.client = new MongoClient(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.client.connect().then(() => {
      const database = this.client.db(this.dbName)
      this.recipes = database.collection("recipes")
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
}

function recipesArrayToObject(recipesArray) {
  const result = {}
  recipesArray.forEach((value) => {
    result[value._id] = { name: value.name, box: value.box }
  })
  return result
}
