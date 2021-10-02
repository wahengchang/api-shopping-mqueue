const request = require("supertest");
const {getReasonPhrase} = require('http-status-codes')
const route = require('../server/routers/products')
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/", route);

const mockProductController = require('../server/lib/db/products/controller')
jest.mock('../server/lib/db/products/controller'); 

describe('[ProductController] happy path', ()=>{
    beforeAll(()=> {
        mockProductController.mockImplementation(() => {
            throw new Error('mock error')
        })
    })
    beforeEach(() => {
        mockProductController.mockClear();
    });
    it('[ProductController] should recieve 500 status code, with message', async ()=>{
        const res = await request(app).get("/")
        expect(mockProductController).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toEqual(500);
        expect(res.status).toEqual(500);
        expect(res.body.error).toEqual(getReasonPhrase(500));
    })
})