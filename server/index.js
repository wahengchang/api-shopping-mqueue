const express = require('express')
const app = express()

app.use(express.static('public'))

app.use('/products', require('./routers/products'))
app.use('/user', require('./routers/users'))

app.get('/', function (req, res) {
    res.send('Hello World!')
  })

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Example app listening on port ${port}! \n http://localhost:${port}`)
})
