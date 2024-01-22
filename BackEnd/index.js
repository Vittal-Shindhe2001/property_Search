const express = require('express')
const cors = require('cors')
const app = express()
const db_config = require('./config/db_config')
const router = require('./config/routes')
const port=3056
app.use(express.json())
app.use(cors())
db_config()
app.use(router)
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})