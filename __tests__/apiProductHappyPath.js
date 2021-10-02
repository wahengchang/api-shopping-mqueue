const request = require("supertest");
const route = require('../server/routers/products')
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/", route);


describe('[ProductController] happy path', ()=>{
    it('[ProductController] should have basic function', async ()=>{
        const res = await request(app).get("/")

        expect(res.statusCode).toEqual(200);
        expect(res.status).toEqual(200);

        const {body} = res
        for(let i =0 ; i<body.length; i++) {
            expect(typeof body[i].id).toEqual('string');
            expect(typeof body[i].title).toEqual('string');
            expect(typeof body[i].price).toEqual('number');
            expect(typeof body[i].quantity).toEqual('number');
            expect(typeof body[i].beginAt).toEqual('object');
        }
    })
})
