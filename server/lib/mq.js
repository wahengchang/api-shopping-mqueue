
const amqplib = require('amqplib')
module.exports = async () => {

    try {
        const q = 'tasks';
        const data = {name: new Date().getTime()}

        // Publisher
        const conn = await amqplib.connect('amqp://guest:guest@localhost:5672')
        const ch = await conn.createChannel();  
        const ok = await ch.assertQueue(q)
        ch.sendToQueue(q, Buffer.from(JSON.stringify(data)));


        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            ch.ack(msg)
        }, { noAck: false })


    }
    catch(e) {
        console.log(e)
        throw new Error(e)
    }
    

    // Consumer
    // open.then(function (conn) {
    //     return conn.createChannel();
    // }).then(function (ch) {
    //     return ch.assertQueue(q).then(function (ok) {
    //         return ch.consume(q, function (msg) {
    //             if (msg !== null) {
    //                 console.log(msg.content.toString());
    //                 ch.ack(msg);
    //             }
    //         });
    //     });
    // }).catch(console.warn);
}