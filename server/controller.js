const Sequalize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequalize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        
    }
})

const userId = 1
const journalId = 1

module.exports = {
    getUser: (req, res) => {
        sequelize.query(
        `SELECT * 
         FROM users
         WHERE id = ${userId}; `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getAllTrips: (req, res) => {
        sequelize.query(
        `SELECT *
        FROM trips
        WHERE user_id = ${userId}; `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    getTrip: (req, res) => {
        const tripId = req.params.id
        sequelize.query(
        `SELECT *
        FROM trips
        WHERE id = ${tripId}; `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    getJournals: (req, res) => {
        sequelize.query(
        `SELECT *
        FROM journals
        WHERE id = ${journalId}; `)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
}
