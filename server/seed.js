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

        insert into trips ( name, image_url, location, star_rating, start_date, end_date, created_at, user_id)
        values ( 'Paris', 'https://www.toureiffel.paris/sites/default/files/styles/1200x675/public/actualite/image_principale/vue_depuisjardins_webbanner_3.jpg?itok=FqfmDgIB', 'Paris', 5, '2019-2-24', '2019-3-6', '2022-3-2', 1),
        ('Norway', 'https://outsider.com/wp-content/uploads/2021/10/northern-lights-will-be-visible-far-south-virginia-due-geomagnetic-storm-585x390.jpg', 'Oslo', 5, '2019-2-24', '2019-3-6', '2022-3-2', 1),
        ('Costa Rica', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F06%2F01%2Fcosta-rica-arenal-volcano-COSTARICATG0621.jpg&w=1100&h=737&c=sc&poi=face&q=60','Costa Rica', 5, '2015-4-21', '2015-4-28', '2022-3-8', 1),
        ('Switzerland', 'https://img.theculturetrip.com/768x/smart/wp-content/uploads/2021/05/wengen_w40b97.jpg', 'Switzerland', 4, '2006-3-20', '2006-3-30', '2022-3-8', 1),
        ('New York', 'https://s3-eu-west-1.amazonaws.com/eflanguagesblog/wp-content/uploads/2019/06/12201311/10-reasons-to-love-New-York_568x464.jpg', 'New York', 5, '2021-12-21', '2021-12-25', '2022-3-8', 1);
        
            
        insert into journals (title, description, created_at, trip_id)  
        values ('Paris',' Taking the kids back to Paris with us after almost twenty years and it has been amazing! I am so glad that they love it as much as we do.', '2019-4-22', 1),
        ('Norway Trip', 'Today we landed in beautiful Oslo.', '2022-3-2', 2),
        ( 'Northern Lights', 'After a plane ride, a ferry ride, two hours in a van, and then another driving leg of the trip we finally made it to the artic circle.', '2022-3-2', 2), ('Costa Rica', 'From seeing beaches with black smooth sand, to seeing sloths in the jungle, this trip has been more than I expected, I am so glad that we were able to come and try new things with our friends. Next time we are going to the volcano for sure.', '2022-3-8', 3), ('Switzerland', 'I may have seen my fill of churches and cathedrals, but the mountains and landscapes are ones that might never get old. I love the people here and the rotating restaraunt on the mountain was quite an experience.', '2022-3-8', 4), ('New York', 'Although we have been many times, New York is one of my favorites every single time. This time having the kids with us was stressful, but it was one that I dont think that they will forget. Hot Chocolate in the park each morning is one that I wont forget soon either.', '2021-12-22', 5);

       
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}




