const UserController = require('../server/lib/db/users/controller')

describe('[UserController] ', ()=>{
    it('[UserController] should have basic function', async ()=>{
        const UserCon = new UserController()
        expect(typeof UserCon.findById).toEqual('function')
        expect(typeof UserCon.create).toEqual('function')
        expect(typeof UserCon.list).toEqual('function')
        expect(typeof UserCon.init).toEqual('function')
    })

    it('[UserController] should able to create() and have findById()', async ()=>{
        const UserCon = new UserController()
        const username = `username-${new Date().getTime()}`
        const password = `password-${new Date().getTime()}`
        await UserCon.init()
        const createdItem = await UserCon.create({username, password})
        const foundItem = await UserCon.findById(createdItem.id)
        expect(createdItem.id).toEqual(foundItem.id);
        expect(createdItem.username).toEqual(foundItem.username);
        expect(createdItem.balance).toEqual(foundItem.balance);
        expect(createdItem.password == undefined).toBe(true)
    })

    it('[UserController] should able to update()', async ()=>{
        const UserCon = new UserController()
        const username = `username-${new Date().getTime()}`
        const password = `password-${new Date().getTime()}`

        await UserCon.init()
        const createdItem = await UserCon.create({username, password})
        const foundItem = await UserCon.findById(createdItem.id)
        expect(createdItem.id).toEqual(foundItem.id);
        expect(createdItem.username).toEqual(foundItem.username);
        expect(createdItem.balance).toEqual(foundItem.balance);
        expect(createdItem.password == undefined).toBe(true)

        // check updated item
        const usernameUpdate = `usernameUpdate-${new Date().getTime()}`
        await UserCon.update(createdItem.id,{username: usernameUpdate})
        const foundItemUpdated = await UserCon.findById(createdItem.id)
        expect(foundItemUpdated.id).toEqual(foundItem.id);
        expect(foundItemUpdated.username).toEqual(usernameUpdate);
        expect(foundItemUpdated.password == undefined).toBe(true)
    })
})