const express = require('express')
const users = require('./users')

const app = express()
app.use(users)

app.listen(8000, () => {
  console.log('run at 8000')
})
