const amqp = require('amqplib');
const {uuid: uuidv4} = require('uuidv4');

const {QUEUE_NAME, RABBITMQ_URL} = require('../../config')
const open = require('amqplib').connect(RABBITMQ_URL);
// Consumer
open
  .then(function(conn) {
    console.log(`[ ${new Date()} ] Server started`);
    return conn.createChannel();
  })
  .then(function(ch) {
    return ch.assertQueue(QUEUE_NAME).then(function(ok) {
      return ch.consume(QUEUE_NAME, function(msg) {
        console.log(
          `[ ${new Date()} ] Message received: ${JSON.stringify(
            JSON.parse(msg.content.toString('utf8')),
          )}`,
        );
        if (msg !== null) {
          const response = {
            uuid: uuidv4(),
          };

          console.log(
            `[ ${new Date()} ] Message to send: ${JSON.stringify(response)}`,
          );

          ch.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(response)),
            {
              correlationId: msg.properties.correlationId,
            },
          );

          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);