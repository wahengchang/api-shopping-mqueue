const amqp = require('amqplib');
const EventEmitter = require('events');
const uuid = require('uuid');

// pseudo-queue for direct reply-to
const {QUEUE_NAME, REPLY_QUEUE, RABBITMQ_URL} = require('../../config')

// Credits for Event Emitter goes to https://github.com/squaremo/amqp.node/issues/259

const createClient = rabbitmqconn =>
  amqp
    .connect(rabbitmqconn)
    .then(conn => conn.createChannel())
    .then(channel => {
      channel.responseEmitter = new EventEmitter();
      channel.responseEmitter.setMaxListeners(0);
      channel.consume(
        REPLY_QUEUE,
        msg => {
          channel.responseEmitter.emit(
            msg.properties.correlationId,
            msg.content.toString('utf8'),
          );
        },
        { noAck: true },
      );
      return channel;
    });

const sendRPCMessage = (channel, message, rpcQueue) =>
  new Promise(resolve => {
    const correlationId = uuid.v4();
    channel.responseEmitter.once(correlationId, resolve);
    channel.sendToQueue(rpcQueue, Buffer.from(message), {
      correlationId,
      replyTo: REPLY_QUEUE,
    });
  });


class MQ {
    constructor() {
        this.channel = null

    }

    async init() {
        const channel = await createClient(RABBITMQ_URL);
        this.channel = channel
    }

    async add(payload = {}) {
        const {channel} = this
        console.log(`[ ${new Date()} ] Message going to send: ${JSON.stringify(payload)}`);
        const respone = await sendRPCMessage(channel, JSON.stringify(payload), QUEUE_NAME);
        console.log(`[ ${new Date()} ] Message response: ${respone}`);
    }
}
module.exports = new MQ()