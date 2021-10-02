(async () => {
    const amqplib = require('amqplib')

    const q = 'tasks';

    // Publisher
    const conn = await amqplib.connect('amqp://guest:guest@localhost:5672')
    const ch = await conn.createChannel();  
    const ok = await ch.assertQueue(q)

    setInterval(() => {
        const data = {name: new Date().getTime()}
        ch.sendToQueue(q, Buffer.from(JSON.stringify(data)));
    }, 1000);
})()