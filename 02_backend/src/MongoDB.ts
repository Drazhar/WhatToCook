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

  /* async insertDocuments(data: Recipe[]) {
    try {
      await this.client.connect()

      const database = this.client.db(this.dbName)
      const recipes = database.collection("recipes")

      await recipes.insertMany(data)
    } finally {
      await this.client.close()
    }
  } */

  async getRecipes() {
    const cursor = this.recipes.find()
    return await cursor.toArray()
  }
}
