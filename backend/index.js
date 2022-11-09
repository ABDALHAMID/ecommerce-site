const express = require('express');
const core = require('cors');
const bparser = require('body-parser'); 
const db = require('./dbconection')
var app = express();
app.use(core());
app.use(express.json({limit: '50mb'}));
app.use(bparser.json({limit: '59mb'}));



db.connect((err)=>{
    (err)?console.log('data base failed to connect'):console.log('database connect successfully');
    console.log(err)
})

//connect to port
app.listen(3000,()=>{
    console.log("port connected")
});


const userRouter = require('./routers/userRouter');
app.use('/users',userRouter);

const productsRouter = require('./routers/productsRouter');
app.use('/product',productsRouter);

