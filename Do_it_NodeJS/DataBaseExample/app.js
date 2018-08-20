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
app.use(bodyParser.urlencoded({encoded:false}))

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

const mongoClient = require('mongodb').MongoClient;

const database

function connectDB() {
    //로컬 pc의 27017포트에서 실행되고 있는 localdatabase에 연결하도록 연결정보 설정.
    let databaseUrl = 'mongodb://localhost:27017/local'

    mongoClient.connect(databaseUrl, (err,db) =>{

        if(err) throw err;

        console.log('connected '+databaseUrl)
        database = db
    })
}