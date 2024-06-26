//importing necessary packages
const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection.js');
const helpers = require('./utils/auth.js');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "Secret Stuff",
    cookie: {
        maxAge: 60 * 60 * 1000,
        
    },
    resave:false,
    saveUninitialized:true,
    store: new SequelizeStore({
        db:sequelize
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log("Server Launched"));
});