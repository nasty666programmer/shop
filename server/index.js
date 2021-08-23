const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sessionMiddleware = require('./middleware/user');
const authRegistration = require('./router/auth/registration');
const authSignIn = require('./router/auth/sign-in')
const authMiddleware = require('./middleware/auth');
const mongoose = require('mongoose');
const flash = require('connect-flash')
const helmet = require('helmet');
const compression = require('compression')
const multer = require('multer')
const path = require('path');
const dashboard = require('./router/dashboard');
const fileMiddleware = require('./middleware/file')
const profileRouter = require('./router/profile/edit');
const varMiddleware = require('./middleware/variables');
const createProduct = require('./router/product/create-product');
const allProduct = require('./router/product/all_product');
const orders = require('./router/orders/orders');
const verifyProduct = require('./router/confirm_product')


const PORT = process.env.PORT || 3005;
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

/*Mongo connect: username:dev password:dev.pass*/
mongoose.connect('mongodb+srv://dev:dev.pass@cluster0.zt0nc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


const store = new MongoStore({
    collection:'session',
    uri:'mongodb+srv://dev:dev.pass@cluster0.zt0nc.mongodb.net/myFirstDatabase'
})

app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    store
}))

app.use(fileMiddleware.single('file'))


app.use(bodyParser());
app.use(cors({
    origin: 'http://localhost:3000/'
  }));
app.use(flash())
app.use(express.static("client/build"));
app.use(helmet())
app.use(compression())

app.use(sessionMiddleware)
app.use(varMiddleware);

app.use('/auth',authRegistration);
app.use('/auth',authSignIn);
app.use(dashboard)
app.use('/profile',profileRouter)
app.use('/product',createProduct);
app.use(allProduct);
app.use('/orders',orders);
app.use('/confirm',verifyProduct);

app.use('/images',express.static(path.join(__dirname,'images')))

app.get("/*", (request, response) => {
    response.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

app.get('/',(req,res) => {
    res.send(`<h1> Server run </h1>`)
})

async function start() {
    try {
        app.listen(PORT,() => {
            console.log(`server has been run in port ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start();
