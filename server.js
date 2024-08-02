const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv').config()
const { MongoClient } = require('mongodb')

const port = process.env.PORT || 3000
const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const url = `mongodb+srv://${dbUsername}:${dbPassword}@userprofileapp.y7n0ndp.mongodb.net/?retryWrites=true&w=majority&appName=UserProfileApp`
const client = new MongoClient(url)

const dbName = 'user_db'
const collectionName = 'employees'

app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '/dist')))

app.get('/get-profile', async function (req, res) {

    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const result = await collection.findOne({ id: 1 })
    console.log(result)

    response = {}

    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }
    res.send(response)
    client.close()
})

app.post('/update-profile', async function (req, res) {
    const payload = req.body

    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    if (Object.keys(payload).length === 0) {
        res.status(400).send({ error: "Empty payload. Couldn't update user profile." })
    }
    else {
        payload['id'] = 1;
        const updatedValues = { $set: payload }
        await collection.updateOne({ id: 1 }, updatedValues, { upsert: true })

        // console.log(updatedValues)
        res.status(200).send({ info: "User profile data updated successfully." })
        client.close()
    }
})

app.listen(port, function () {
    console.log('App listening on port ' + port)
})
