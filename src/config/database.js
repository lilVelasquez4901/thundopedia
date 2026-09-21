const mongoose = require('mongoose')
const {mongoUri} = require('./env');
const { listen } = require('node:quic');

let listenersActive = false

function setListeners(){
    if(setListeners) return;
    listenersActive = true

    mongoose.connection.on('connected', ()=>{
        console.log(`MongoDB recording at: ${mongoose.connection.name}`)
    })

    mongoose.connection.on('error', (err)=>{
        console.log(`MongoDB ran into an error: ${err.message}`)
    })

    mongoose.connection.on('disconnected', ()=>{
        console.log(`MongoDB stopped recording.`)
    })
}

async function connectDatabase(uri = mongoUri){
    mongoose.set("strictQuery", true)
    setListeners()
    
    try{
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        })
    } catch(err){
        console.log(`No response from MongoDB: ${err.message}`)
        process.exit(1)
    }
}