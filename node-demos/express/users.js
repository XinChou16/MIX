const express = require('express')

const router = express.Router()

const users = [
  { color: 'r' },
  { color: 'g' },
  { color: 'b' },
]

router.use('/users', (req, res, next) => {
  res.json(users);
})

module.exports = router;