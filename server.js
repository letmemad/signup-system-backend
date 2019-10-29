const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const cors = require('cors')

// CONFIGs
const app = express()
app.use(express.json())
app.use(cors())
env.config()

// MONGOOSE CONNECT
mongoose.connect(process.env.MONGO, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

// MAIN ROUTEs
app.use('/api/user', require('./src/routes/routes'))

// INITIALIZE APP
const PORT = process.env.PORT || 4040
app.listen(PORT, () => console.log(`SERVER ON: http://localhost:${PORT}`))