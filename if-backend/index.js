const connectToMongo = require('./db');
const express = require('express')
const cors = require("cors");


connectToMongo();
const app = express()
const port = 2000

app.use(cors());
app.use(express.json());  

app.use('/auth',require('./routes/auth'))
app.use('/form',require('./routes/form'))
app.use('/authCompany',require('./routes/authCompany'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})