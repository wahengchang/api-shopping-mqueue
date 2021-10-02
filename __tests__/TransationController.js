const TranController = require('../server/lib/db/transations/controller')
const ProductController = require('../server/lib/db/products/controller')
const UserController = require('../server/lib/db/users/controller')

describe('[TranController] ', ()=>{
    it('[TranController] should have basic function', async ()=>{
        const TranCon = new TranController()
        expect(typeof TranCon.findById).toEqual('function')
        expect(typeof TranCon.create).toEqual('function')
        expect(typeof TranCon.list).toEqual('function')
        expect(typeof TranCon.init).toEqual('function')
    })

    it('[TranController] should have findById()', async ()=>{
        const TranCon = new TranController()
        const title = `title-${new Date().getTime()}`
        await TranCon.init({isPurge: true})

        const ProductCon = new ProductController()
        const titleProduct = `title-${new Date().getTime()}`
        const createdItemProduct = await ProductCon.create({title})
        const productId = createdItemProduct.id

        const username = `username-${new Date().getTime()}`
        const password = `password-${new Date().getTime()}`
        const price = 234
        const UserCon = new UserController()
        const createdItemUser = await UserCon.create({username, password})
        const userId = createdItemUser.id

        const createdItem = await TranCon.create({title, productId, userId , price})
        const foundItem = await TranCon.findById(createdItem.id)
        expect(createdItem.id).toEqual(foundItem.id);
        expect(createdItem.title).toEqual(foundItem.title);
        expect(createdItem.productId).toEqual(productId);
        expect(createdItem.userId).toEqual(userId);
    })

    it('[TranController] should have list()', async ()=>{
        const TranCon = new TranController()
        await TranCon.init({isPurge: true})
        const foundItemList = await TranCon.list()

        expect(Array.isArray(foundItemList)).toEqual(true);

        for(let i =0 ; i<foundItemList.length; i++) {
            expect(typeof foundItemList[i].id).toEqual('string');
            expect(typeof foundItemList[i].title).toEqual('string');
            expect(typeof foundItemList[i].userId).toEqual('string');
            expect(typeof foundItemList[i].productId).toEqual('string');
        }
    })
})