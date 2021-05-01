import express = require("express")

const app = express()
const port = process.env.PORT || 3000

// Routes
app.use("/api", require("./routes/api"))

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
