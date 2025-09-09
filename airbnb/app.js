const express=require('express');
const userRouter=require('./routes/userRoute');
const hostRouter=require('./routes/hostRoute')
const app=express();
const path=require('path');
const rootDir=require('./utils/pathUtils');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(userRouter);
app.use('/host',hostRouter);

app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});

app.listen(3000,()=>{
    console.log('Server Running on http://localhost:3000');
});