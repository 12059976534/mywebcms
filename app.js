const express=require("express");
const app=express();
const morgan=require("morgan")
const path=require('path')
const route=require("./route/route")
const flash = require('connect-flash');
// const bodyParser=require("body-parser")

const session = require('express-session');
const cookieParser = require('cookie-parser');

// const mahasiswaroute=require("./routes/mahasiswa")
// const autoriz=require("./routes/autorization")
const cors=require('cors')
app.use(cors({
    origin: "*"
}));

app.use(cookieParser('keyboard cat'));
app.use(session({ 
    secret : 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))



app.use(express.static(path.join(__dirname, 'static')));
app.use("/module",express.static("module")); //module 
app.use("/exmodul",express.static("exmodul")); //exmodul 
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');


app.use('/',route);
app.use("/assets",express.static("assets")); //asset 
app.use("/compres",express.static("compres")); //asset 


// ===== hendling error ======
app.use((req, res, next) => {
    const error=new Error("Tidak ditemukan");
    error.status = 404;
    next(error);
})



app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
            status:error.status
        }
    })
})

// =======================

module.exports=app;