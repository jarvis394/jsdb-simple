const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(4000, () => console.log('Started on port 4000'))
