const express = require('express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const app = express()
const port = 8001
const path = require('path')
app.use(express.static('public'))
app.use(express.json())


async function connectToDB() {
    const client = await MongoClient.connect('mongodb://localhost:27017')
    const db = client.db('week13')
    return db
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views', '/index.html'))
})

app.get('/api/tweets', async (req, res) => {
    const db = await connectToDB()
    const collection = await db.collection('tweets')
    const data = await collection.find({}).toArray()
    res.json({data})
})

app.post('/api/tweets', async (req, res) => {
    const db = await connectToDB()
    const collection = await db.collection('tweets')
    const text = req.body.text
    const tweet = await collection.insertOne({text})
    res.send({tweet})
})


app.listen(port, () => {
    console.log('loaded')
})