const sleep = (s=1) => new Promise((resolve) => {
    console.log('[INFO] going to sleep')
    setTimeout(() => {
        console.log('[INFO] end sleep')
        return resolve()
    }, 1000 * s);
})

module.exports = (req, res, next) => {
    req.sleep = sleep

    return next()
}