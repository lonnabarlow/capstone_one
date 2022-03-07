const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        
    }
})


module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists trips cascade;
        drop table if exists users;
        drop table if exists journals;
        
        CREATE TABLE users (
            id SERIAL  PRIMARY KEY,
            name VARCHAR(75) NOT NULL,
            email VARCHAR(75) NOT NULL,
            password VARCHAR(100) NOT NULL
          );
          
          CREATE TABLE trips (
            id SERIAL  PRIMARY KEY,
            name VARCHAR(50),
            image_URL TEXT,
            location VARCHAR(75),
            star_rating INT,
            start_date timestamp,
            end_date timestamp,
            created_at timestamp,
            user_id INT NOT NULL
          );
          
          CREATE TABLE journals (
            id SERIAL  PRIMARY KEY,
            title VARCHAR(75),
            description TEXT,
            created_at timestamp,
            trip_id INT NOT NULL
          );
          
          ALTER TABLE trips ADD FOREIGN KEY (user_id) REFERENCES users (id);
          
          ALTER TABLE journals ADD FOREIGN KEY (trip_id) REFERENCES trips (id);
          
        
        

        

        insert into users (id, name, email, password)
        values (1, 'Lonna Barlow 2', 'Lonna@test.com', 'asdf');

        insert into trips (id, name, image_url, location, star_rating, start_date, end_date, created_at, user_id)
        values (1, 'Paris', 'https://www.toureiffel.paris/sites/default/files/styles/1200x675/public/actualite/image_principale/vue_depuisjardins_webbanner_3.jpg?itok=FqfmDgIB', 'Paris', 5, '2019-2-24', '2019-3-6', '2022-3-2', 1),
        (2, 'Norway', 'https://www.toureiffel.paris/sites/default/files/styles/1200x675/public/actualite/image_principale/vue_depuisjardins_webbanner_3.jpg?itok=FqfmDgIB', 'Oslo', 5, '2019-2-24', '2019-3-6', '2022-3-2', 1);;
        
            
        insert into journals (id, title, description, created_at, trip_id)  
        values (1, 'Norway Trip', 'Today we landed in beautiful Oslo.', '2022-3-2', 1),
        (2, 'Northern Lights', 'After a plane ride, a ferry ride, two hours in a van, and then another driving leg of the trip we finally made it to the artic circle.', '2022-3-2', 1);

       
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}




