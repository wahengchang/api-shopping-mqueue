(async () => {
    const amqplib = require('amqplib')

    const q = 'tasks';
    const data = {name: new Date().getTime()}

    const sleep = () => new Promise((resolve) => {
        console.log('[INFO] going to sleep')
        setTimeout(() => {
            console.log('[INFO] end sleep')
            return resolve()
        }, 3000);
    })

    // Publisher
    const conn = await amqplib.connect('amqp://guest:guest@localhost:5672')
    const ch = await conn.createChannel();      

    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, async function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        await sleep()
        ch.ack(msg)
        console.log(" [x] ack-ed %s", msg.content.toString());
    }, { noAck: false })
})()