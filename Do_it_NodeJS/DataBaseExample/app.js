const express = require('express')
const http = require('http')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const static = require('serve-static')
const errorHandler = require('errorhandler')

const expressErrorHandler = require('express-error-handler')
const expressSession = require('express-session')

const app = express();

//기본속성
app.set('port',process.env.PORT||3000)
//바디 파서를 사용해 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({encoded:flase}))

//바디파서를 사용해 application/json 파싱
app.use(bodyParser.json())

app.use('/public',static(path.join(__dirname,'public')))

app.use(cookieParser())

app.use(expressSession({
    secret:'my-key',
    resave : true,
    saveUninitialized:true
}))

const router = express.Router();

router.route('/process/login').post((req,res)=> {

})

app.use('/',router)

http.createServer(app).listen(app.get('port'), ()=>{
    console.log(app.get('port'))
})