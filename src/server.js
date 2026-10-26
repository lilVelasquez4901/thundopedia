const {connectDatabase, disconnectDatabase} = require('./config/database.js');
const {port, nodeEnv} = require('./config/env.js')
const app = require('./app.js')
const {API_PREFIX} = require('./config/constants.js')

async function start() {
    await connectDatabase()
    const server = app.listen(port, ()=>console.log(`Listening on http://localhost:${port}`))
};
start()

const shutdown = (signal)=>{
    console.log(`\n${signal} received, shutting down`)

    const force = setTimeout(() => {
        console.error("Forcing exit after 10s")
        process.exit(1000)
    }, 10000);
    force.unref()

    server.close(async ()=>{
        await disconnectDatabase()
        console.log("Shutdown complete")
        process.exit(0)
    })

    process.on('SIGTERM', ()=> shutdown("SIGTERM"))
    process.on('SIGINT', ()=>shutdown("SIGINT"))
}

start()