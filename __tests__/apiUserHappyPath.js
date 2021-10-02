const request = require("supertest");
const route = require('../server/routers/users')
const express = require("express");
const app = express();
app.use(require('../server/middleware/expressFunction'))

app.use("/", route);


describe('[/products] happy path', ()=>{
    const payload = {
        username: `username-${new Date().getTime()}`,
        password: `password-${new Date().getTime()}`,
        balance:123
    }
    it('[/user] should signup', async ()=>{
        const res = await request(app)
            .post("/signup")
            .send(payload)

        expect(res.statusCode).toEqual(201);
        expect(res.status).toEqual(201);

        const {body} = res
        expect(typeof body.id).toEqual('string');
        expect(typeof body.username).toEqual('string');
        expect(typeof body.balance).toEqual('number');
        expect(typeof body.updatedAt).toEqual('string');
        expect(typeof body.createdAt).toEqual('string');
        
        expect(body.username).toEqual(payload.username);
        expect(body.balance).toEqual(payload.balance);


        const resLogin = await request(app)
            .post("/login")
            .send({
                username: payload.username,
                password: payload.password,
            })

    })

    it('[/user] should login', async ()=>{
        const res = await request(app)
            .post("/login")
            .send({
                username: payload.username,
                password: payload.password,
            })

        expect(res.statusCode).toEqual(200);
        expect(res.status).toEqual(200);

        const {body} = res
        expect(typeof body.id).toEqual('string');
        expect(typeof body.username).toEqual('string');
        expect(typeof body.balance).toEqual('number');
        expect(typeof body.updatedAt).toEqual('string');
        expect(typeof body.createdAt).toEqual('string');
        expect(typeof body.token).toEqual('string');
                
        expect(body.username).toEqual(payload.username);
        expect(body.balance).toEqual(payload.balance);
    })
})
