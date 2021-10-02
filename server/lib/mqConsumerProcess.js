(async function(){
  const TranController = require('./db/transations/controller')
  const ProductController = require('./db/products/controller')
  const UserController = require('./db/users/controller')
    
  const amqp = require('amqplib');
  const {uuid: uuidv4} = require('uuidv4');
  
  const {QUEUE_NAME, RABBITMQ_URL} = require('../../config')
  const open = require('amqplib').connect(RABBITMQ_URL);


  const conn = await open

  console.log(`[ ${new Date()} ] Server started`);
  const ch = await conn.createChannel()
  await ch.assertQueue(QUEUE_NAME)

   ch.consume(QUEUE_NAME, async function(msg) {
          console.log(`[ ${new Date()} ] Message received: ${JSON.stringify(JSON.parse(msg.content.toString('utf8')),)}`,);
          
          const failHandler = (msg, errorMsg) => {
            const response = {
              uuid: uuidv4(),
              error: errorMsg
            };
            ch.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(response)),
              {
                correlationId: msg.properties.correlationId,
              },
            );
            ch.nack(msg, false, false);
          }

          const successHandler = (msg) => {
            const response = {
              uuid: uuidv4(),
            };
            ch.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(response)),
              {
                correlationId: msg.properties.correlationId,
              },
            );
            ch.ack(msg)
          }

          if (msg !== null) {
            
            const content = JSON.parse(msg.content.toString('utf8'))
            const {productId, userId, price} = content

            const ProductInstance = new ProductController()
            const productItem = await ProductInstance.findById(productId)
            console.log('1) product found: ', productItem)

            if(productItem.quanity <=0 ){
              return failHandler(msg, 'product has no enough quantity, less than 0 ')
            }
            // start in the future
            const now = new Date()
            if(now < new Date(productItem.beginAtDate)) {
              return failHandler(msg, 'product is not start selling yet')
            }

            const UserInstance = new UserController()
            const userItem = await UserInstance.findById(userId)
            console.log('2) user found: ', userItem)
            if(userItem.balance < price) {
              return failHandler(msg, "you don't have enough balance")
            }

            const TranInstance = new TranController()
            const tranTitle = `${productItem.title}-${userItem}`
            const newTran = await TranInstance.create({
              title: tranTitle,
              productId,
              userId,
              price
            })
            console.log('3) TranInstance create: ', newTran)
            await ProductInstance.update(productId, {quanity: productItem.quanity-1})
            console.log('4) reduct quanity of product')

            await UserInstance.update(userId, {balance: userItem.balance-price})
            console.log('5) reduct user balance')


            return successHandler(msg)
          }
        });
})()