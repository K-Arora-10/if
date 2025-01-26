const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 2000

app.use(express.json());  

app.use('/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})