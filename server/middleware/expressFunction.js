const {getReasonPhrase} = require('http-status-codes')

const sleep = (s=1) => new Promise((resolve) => {
    console.log('[INFO] going to sleep')
    setTimeout(() => {
        console.log('[INFO] end sleep')
        return resolve()
    }, 1000 * s);
})

const responseDefaultError = (res) => (STATUS_CODE, customMessage = null) => {
    const msg = customMessage || getReasonPhrase(STATUS_CODE)
    res.status(STATUS_CODE)
    return res.json({
        error: msg
      });
}

module.exports = (req, res, next) => {
    req.sleep = sleep
    res.responseDefaultError = responseDefaultError(res)

    return next()
}