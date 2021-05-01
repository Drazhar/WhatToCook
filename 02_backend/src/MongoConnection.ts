const { MongoClient } = require("mongodb")

export class MongoConnection {
  dbName: string
  client: any

  constructor(dbName: string) {
    this.dbName = dbName
    this.client = new MongoClient(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
