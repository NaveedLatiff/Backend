const express = require('express');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const storeRouter = require('./routes/storeRoute');
const hostRouter = require('./routes/hostRoute');
const authRouter = require('./routes/authRoute');
const app = express();
const path = require('path');
const { pageNotFound } = require('./controllers/404');
const multer=require("multer");

const connectDB = require("./utils/database");

require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl,
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10
    }

}))

// To pass session to all ejs files
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// RandomString
const RandomString=()=>{
    const characters='defghijklmnopqrstuvw';
    let result='';
    for(let i=0;i<10;i++){
        result+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}

// For custom file name
const storage=multer.diskStorage({
    destination:(req,fileres,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,RandomString()+ '-' + file.originalname)
    }
})

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({storage}).single('houseImg'));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(storeRouter);
app.use('/host', hostRouter);
app.use(authRouter);
app.use(pageNotFound);
(async () => {
    await connectDB();
    app.listen(3000, () => {
        console.log('Server Running on http://localhost:3000');
    });
}
)();
