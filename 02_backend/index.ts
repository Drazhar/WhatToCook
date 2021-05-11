import express = require("express")

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:8080"]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, content-type, Accept"
  )
  next()
})

app.use(express.json())

// Routes
app.use("/api", require("./routes/api"))

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
