const Sequalize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequalize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        
    },
    define: {
        timestamps: false
    }
})
let trips = sequelize.define('trips', {     
    name: Sequalize.STRING,
    image_url: Sequalize.STRING,
    location: Sequalize.STRING,
    star_rating: Sequalize.INTEGER,
    start_date: Sequalize.DATE,
    end_date: Sequalize.DATE,
    created_at: Sequalize.DATE,
    user_id: Sequalize.INTEGER
});

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
    // don't send back to browser
    // instead send back to endpoint to be combined with journals
    getTrip: (req, res) => {
        const tripId = req.params.id

        return sequelize.query(
        `SELECT *
        FROM trips
        WHERE id = ${tripId}; `)
            .then(dbRes => {
                return dbRes[0][0]
            })
            .catch(err => console.log(err))
    },
    // don't send back to browser
    // instead send back to endpoint to be combined with trips
    getJournals: (tripId) => {
        return sequelize.query(
        `SELECT *
        FROM journals
        WHERE trip_id = ${tripId}; `)
        .then(dbRes => {
            return dbRes[0]
        })
        .catch(err => console.log(err))
    },
    postTrip: (req, res) => {
        console.log('req', req.body)
        
        return trips.create({
            name: req.body.name,
            image_url: req.body.image_url,
            location: req.body.location,
            star_rating: req.body.star_rating,
            start_date: req.body.dates,
            end_date: req.body.dates,
            created_at: new Date(),
            user_id: userId

        }).then(function (trips) {
            if (trips) {
                res.send(trips[0]);
            } else {
                res.status(400).send('Error in insert new record');
            }

        });
    },
    deleteTrip: (req, res) => {
        const tripId = req.body.id
        trips.destroy({
            where: {
              id: tripId
            }
          }).then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }
}
