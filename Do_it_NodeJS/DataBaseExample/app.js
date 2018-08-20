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
const mongoose = require('mongoose')
const database

function connectDB() {
    //로컬 pc의 27017포트에서 실행되고 있는 localdatabase에 연결하도록 연결정보 설정.
    let databaseUrl = 'mongodb://localhost:27017/local'
/*
    mongoClient.connect(databaseUrl, (err,db) =>{
        
        if(err) throw err;

        console.log('connected '+databaseUrl)
        database = db
    })*/
    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)
    database = mongoose.connection

    database.on('error', console.error.bind(console, 'mongoose error'))
    database.on('open',()=> {
        UserSchema = mongoose.Schema({
            id : String,
            name : String,
            password : String
        })
        UserModel = mongoose.model("users ",UserSchema)
        
    })
    database.on('disconnect',()=>{
        setInterval(connectDB,5000)
    })
}

var authUser = (database,id,password,callback) => {
    let users = database.collections('users')

    users.find({"id":id, "password":password,}).toArray((err,docs)=> {
        return new Promise(function(resolve,reject) {
            if(err) {reject((err,null))}
            else {
                if(docs.length > 0) {
                    console.log('사용자 찾음 :'+id,password)
                    resolve((null,docs))
                }else {
                    resolve((null,null))
                }
            }
        })
    })
}

var router = express.Router();

// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

    // 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

                // 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			
			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
});

// 라우터 객체 등록
app.use('/', router);

var addUser = function(database,id,password,name, callback) {

    var users = database.collections('users')

    users.insertMany([{"id":id, "password":password}], (err,result)=>{
       if(err) {
           callback(err,null)
           return;
       }
       if(result.insertedCount > 0) {
           console.log('plus')
       }else {
           console.log('null')
       }
       callback(null,result)
    })
}

router.route('/process/adduser').post((req,res)=> {
    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password
    var paramName = req.body.name || req.query.name

    if(database) {
        addUser(database,paramId,paramPassword, paramName, (err,result)=> {
            if(err) throw err

            if(result && result.insertedCount > 0){
                res.writeHead('200', {'Content-Type ': 'text/html; charset=utf8'})
                res.write('사용자 추가성공')
                res.end()
            }else {
                res.writeHead('200', {'Content-Type ': 'text/html; charset=utf8'})
                res.write('사용자 추가실패')
                res.end()                
            }
        })
    }else {
        res.writeHead('200', {'Content-Type ': 'text/html; charset=utf8'})
        res.write('database 연결 실패')
        res.end()          
    }
})