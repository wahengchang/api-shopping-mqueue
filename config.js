module.exports = {
  dialect: 'sqlite',
  storage: './taskmag.sql',
  logging: false,
  // -=-=-=-=-=-= rabbit MQ connection
  QUEUE_NAME: 'flashSalesItem',
  REPLY_QUEUE: 'amq.rabbitmq.reply-to',
  RABBITMQ_URL: 'amqp://guest:guest@localhost:5672',
  AUTH_SECRET: 'PUT_YOUT_SECRET_HERE'
}