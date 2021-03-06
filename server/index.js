import express from 'express';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import Sequelize from 'sequelize';
let app = express();
//app.use(cookieParser());
MySQLStore(session);
require('dotenv').config();


const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    createDatabaseTable: true,
    schema: {
        tableName: 'bk_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
})



const PORT = process.env.PORT || 3000;
app.use(session({
    secret: process.env.SESSION_SECRET,/*config.session.secret*/
    key: 'myCookie',    
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        path: '/',
        maxAge: Date.now() + 10000000
    }
    })
);
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', __dirname + '/../client/views');

app.use('/assets', express.static(__dirname + '/../client/assets'));
app.use('/favicon', express.static(__dirname + '/../client/assets/favicon'));



app.use('/', routes);



app.listen(PORT, () => {
    console.log("MAGIC HAPPENING ON PORT " + PORT)
    console.log([process.env.DB_DATABASE], 
    [process.env.DB_USERNAME], 
    [process.env.DB_PASSWORD],
    [process.env.DB_HOST],
    [process.env.DB_PORT]
);
});

export const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST
    }
)