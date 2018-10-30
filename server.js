const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3000
const app = express()
app.use(bodyParser.json())


const api = require('./routes/api')

app.get('/', function(req, res){
    res.send('Hello from server')
})

app.get('/api', api)

app.post('/register', api)
app.post('/login', api)

app.listen(PORT, function(){
    console.log('Express server running on port' + PORT)
})