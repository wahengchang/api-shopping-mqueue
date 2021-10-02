const ControlerBase = require('../server/lib/db/ControllerBase')

describe('[ControlerBase] ', ()=>{
    it('[ControlerBase] should have findById()', async ()=>{
        const cBase = new ControlerBase()

        expect(typeof cBase.findById).toEqual('function')
        try {
            cBase.findById()

        }
        catch(e) {
            expect(e).toEqual(new Error('not implement yet'));
        }
    })
})