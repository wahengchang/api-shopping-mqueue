(async () => {
  const express = require('express')
  const mq = require('./lib/mqProvider')
  const app = express()
  
  app.use(require('./middleware/expressFunction'))
  app.use(express.static('public'))

  await mq.init()

  app.use('/products', require('./routers/products'))
  app.use('/user', require('./routers/users'))
  app.use('/me', require('./routers/me'))

  app.get('/', async (req, res) => {
    const title = `title-${new Date().getTime()}`
    await mq.add({title})
    return res.send('Hello World!')
  })

  const port = process.env.PORT || 3000

  app.listen(port, function () {
    console.log(`Example app listening on port ${port}! \n http://localhost:${port}`)
  })

})()