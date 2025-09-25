const express=require('express');
const session=require('express-session');
const storeRouter=require('./routes/storeRoute');
const hostRouter=require('./routes/hostRoute');
const authRouter=require('./routes/authRoute');

const app=express();
const path=require('path');
const {pageNotFound}=require('./controllers/404');
const connectDB = require("./utils/database");

// Session
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
     cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10  
    }

}))

// To pass session to all ejs files
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(storeRouter);
app.use('/host',hostRouter);
app.use(authRouter);
app.use(pageNotFound);
(async ()=>{
    await connectDB();
    app.listen(3000,()=>{
        console.log('Server Running on http://localhost:3000');
    });
}
)();
