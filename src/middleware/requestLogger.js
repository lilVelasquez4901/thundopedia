module.exports = function reqLogger(req,res,next){
    const time = new Date().toISOString()
    const start = process.hrtime.bigint()
    // const ms = Number(process.hrtime.bigint() - start / 1e6)
    res.on('finish', () =>{
        const end = process.hrtime.bigint()
        const durationMs = Number(end - start) / 1e6;
    console.log(`[${time}] ${req.method} ${req.url} ${res.statusCode} - ${durationMs.toFixed(1)} ms`)
    });
    next()
}