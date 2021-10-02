const request = require("supertest");
const route = require('../server/routers/products')
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/", route);


describe('[/products] happy path', ()=>{
    let firstItemId
    it('[/products] get product list', async ()=>{
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

        firstItemId = body[0].id
    })

    it('[/products] get product detail by Id', async ()=>{
        const res = await request(app).get(`/${firstItemId}`)

        expect(res.statusCode).toEqual(200)
        expect(res.status).toEqual(200)

        expect(res.body.id).toEqual(firstItemId)

        expect(typeof res.body.id).toEqual('string')
        expect(typeof res.body.title).toEqual('string')
        expect(typeof res.body.price).toEqual('number')
        expect(typeof res.body.quantity).toEqual('number')
        expect(typeof res.body.beginAt).toEqual('object')
    })

    it('[/products] should return NULL for non-existed id', async ()=>{
        const res = await request(app).get(`/mock-non-existed}`)

        expect(res.statusCode).toEqual(200)
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(null)
    })
})
