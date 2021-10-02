const Sequelize = require('sequelize')

class DB {
  constructor(_config = null) {
    const config = _config || require('../../../config')
    const {dialect, storage, logging} = config
    const sequelize = new Sequelize({
      dialect, storage, logging,
      query:{
        raw:true,
      },
    })
    this.sequelize = sequelize
    this.isInit = false
  }

  getSequelize() {
    return this.sequelize
  }

  init(options = {}){
    if(this.isInit) return

    const {isPurge = false} = options
    const dbOptions = isPurge ? { force: true } : {}
    // return this.sequelize.sync({ force: true })

    if(isPurge) {
      console.log('[INFO] going to purge')
    }

    return this.sequelize.sync(dbOptions).then(() => {
      console.log(`Database & tables created!`)
      this.isInit = true
      return
    })
  }
}

module.exports = new DB()