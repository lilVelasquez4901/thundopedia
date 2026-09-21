require('dotenv').config()

const MANDATORY = ['NODE_ENV', 'PORT', 'MONGODB_URI']
const absent = MANDATORY.filter((key)=>!process.env[key])

if(absent.length > 0){
    console.log(`Missing required environment variable(s): ${absent.join(', ')}`)
}

module.exports = {
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGODB_URI,
    isProduction: process.env.NODE_ENV === 'production'
}