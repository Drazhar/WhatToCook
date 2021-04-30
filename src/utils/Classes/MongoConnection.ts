import { MongoClient } from "mongodb"
import { Recipe } from "./RecipeCollection"

export class MongoConnection {
  uri: string | any = process.env.DB_URI

  dbName: string
  client: any

  constructor(dbName: string) {
    this.dbName = dbName
    this.client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  async insertDocuments(data: Recipe[]) {
    try {
      await this.client.connect()

      const database = this.client.db(this.dbName)
      const recipes = database.collection("recipes")

      await recipes.insertMany(data)
    } finally {
      await this.client.close()
    }
  }

  async getDocuments() {
    let result
    try {
      await this.client.connect()
      const database = this.client.db(this.dbName)
      const recipes = database.collection("recipes")

      const cursor = recipes.find()
      result = await cursor.toArray()
    } finally {
      await this.client.close()
    }
    return result
  }
}
