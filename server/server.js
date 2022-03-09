const express = require('express')
const path = require('path')
require('dotenv').config()
const Sequelize = require('sequelize')
const {seed} = require('./seed.js')
const {getUser, getTrip, getAllTrips, deleteTrip, postTrip,getJournals} = require('./controller.js')


const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))
// app.use("/static", express.static(path.join(__dirname, "public")))

// DEV
app.post('/seed', seed)


app.get('/user', getUser)

app.get('/trip/:id', (req, res) => {

   getTrip(req, res).then(tripRes => {
        getJournals(tripRes.id).then(journalRes => {
            tripRes['journals'] = journalRes
            res.status(200).send(tripRes)
        })
    })

})

app.get('/trips', getAllTrips)

// app.get("/trip", (req, res) => {
 //     res.sendFile(path.join(__dirname, "../public/   trip.html"))
 // })
    
app.post('/trips', postTrip)

app.get('/journals', getJournals)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
    // .catch(err) { 
    //     console.log("something went wrong", error, res.sendStatus(400))
    // }
});

app.delete('/trip', deleteTrip)




const port = process.env.PORT || 4004

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})