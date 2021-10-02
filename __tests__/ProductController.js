const ProductController = require('../server/lib/db/products/controller')

describe('[ProductController] ', ()=>{
    it('[ProductController] should have basic function', async ()=>{
        const ProductCon = new ProductController()
        expect(typeof ProductCon.findById).toEqual('function')
        expect(typeof ProductCon.create).toEqual('function')
        expect(typeof ProductCon.list).toEqual('function')
        expect(typeof ProductCon.init).toEqual('function')
    })

    it('[ProductController] should have findById()', async ()=>{
        const ProductCon = new ProductController()
        const title = `title-${new Date().getTime()}`
        const price = 11
        const quantity = 99
        const beginAt = new Date('2030-01-01')
        await ProductCon.init({isPurge: true})
        const createdItem = await ProductCon.create({title, price, quantity, beginAt})
        const foundItem = await ProductCon.findById(createdItem.id)
        expect(createdItem.id).toEqual(foundItem.id);
        expect(createdItem.title).toEqual(foundItem.title);
        expect(createdItem.price).toEqual(foundItem.price);
        expect(new Date(createdItem.beginAt)).toEqual(beginAt);
    })


    it('[ProductController] should able to update()', async ()=>{
        const ProductCon = new ProductController()
        const title = `title-${new Date().getTime()}`
        const price = 12
        const quantity = 67

        await ProductCon.init({isPurge: true})
        const createdItem = await ProductCon.create({title, price, quantity})
        const foundItem = await ProductCon.findById(createdItem.id)
        expect(createdItem.id).toEqual(foundItem.id);
        expect(createdItem.title).toEqual(foundItem.title);
        expect(createdItem.price).toEqual(foundItem.price);

        // check updated item
        const titleUpdate = `titleUpdate-${new Date().getTime()}`
        await ProductCon.update(createdItem.id, {title: titleUpdate})
        const foundItemUpdated = await ProductCon.findById(createdItem.id)
        expect(foundItemUpdated.id).toEqual(foundItem.id);
        expect(foundItemUpdated.title).toEqual(titleUpdate);
    })

    it('[ProductController] should have list()', async ()=>{
        const ProductCon = new ProductController()
        await ProductCon.init({isPurge: true})
        const foundItemList = await ProductCon.list()

        expect(Array.isArray(foundItemList)).toEqual(true);

        for(let i =0 ; i<foundItemList.length; i++) {
            expect(typeof foundItemList[i].id).toEqual('string');
            expect(typeof foundItemList[i].title).toEqual('string');
            expect(typeof foundItemList[i].price).toEqual('number');
            expect(typeof foundItemList[i].quantity).toEqual('number');
            expect(typeof foundItemList[i].beginAt).toEqual('string');
        }
    })
})