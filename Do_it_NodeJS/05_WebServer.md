# 05 웹 서버 만들기 
## 05-1 간단한 웹 서버 만들기
노드의 `http`모듈을 이용해 간단한 웹서버를 만들 수 있다.

```javascript
//ES6 
const http = require('http') //import 는 왜인지 동작을 안하네요.. v8.11.3인데 
const server = http.createServer()
const port = 3000

server.listen(port, ()=> {
    console.log(`web server start${port}`)
})
```

```javascript
server.listen(port, '192.168.0.5', () =>{ //특정 ip와 포트에서 대기하도록 설정. 
  console.log('connect');
})
```

### client가 서버에 요청할 때 발생하는 이벤트 처리하기

|이벤트 이름|설명|
| :--- | :--- |
|connection|클라이언트가 접속하여 연결이 만들어질 때 발생하는 이벤트이다.|
|request|클라이언트가 요청할 때 발생한느 이벤트.|
|close|서버를 종료할때 발생|

```javascript
//클라이언트 연결 이벤트
server.on('connection', socket=> { //connection 에는 socket 전달
    let addr = socket.address()

    console.log(`클라 이벤트 접속${addr.address} ${addr.port}`)
})

server.on('request', (req, res) => {
  console.dir(req)
})
```

`res`객체의 `writeHead()`, `write()` , `end()` 메소드를 사용하면 클라이언트로 응답을 보낼 수 있다. 
end는 응답을 모두 보냈음을 의미한다. 

res 객체를 사용해서 응답을 보낼 때 사용하는 주요 메소드는 다음과 같다.

|메소드 이름|설명|
| :--- | :---|
|writeHead(statusCode [,statusMessage][,headers]||
|write(chunk[,encoding][,callback])|
|end([data][,encoding][,callback])|

#### 이미지 파일을 읽어 클라이언트 쪽으로 응답을 보내는 코드
```javascript
const http = require('http')
const fs = require('fs')

//..중간생략

server.on('request' , (req, res) => {
  fs.readFile(filename, (err,data) =>{
    res.writeHead(200 , {"Content-Type" : "image/png"})
    res.write(data)
    res.end()
  })
})
```

#### Content-Type에 올 수 있는 것들

|메소드 이름|설명|
| :--- | :---|
|text/plain|일반 텐스트 문서|
|text/html|html문서|
|text/css|css문서|
|image/jpeg, image/png|이미지|
|video/mpeg , audio/mp3|사운드 ,비디오|
|application/zip|zip압축파일|

#### 파일을 스트림으로 읽어 응답 보내기
> pipe 는 좀 다시 정리해보기 _ 링크

파일을 스트림 객체로 읽어 들인 후 **pipe() 메소드** 로 응답객체와 연결하면 별다른 코드 없이도 파일에 응답을 보낼 수 있다. 

```javascript
server.on('request' , (req, res) => {
  let filename = 'house.png'
  let infile = fs.createReadStream(filename, {flags: 'r'})
  
  infile.pipe(res)
})

```

#### 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기

http 클라이언트가 `GET`, `POST` 방식으로 다른 웹 서버에 데이터를 요청할 수도 있다. 

```javascript
const http = require('http')

const options = {
  host : 'www.google.com',
  port:80,
  pth:'/'
};

const req = http.get(options, res => {
  let resData= '';
  
  res.on('data', chunk=>{
    resData +=chunk
  })
})
```

## 05-2 익스프레스로 웹 서버 만들기 

익스프레스 모듈의 **미들웨어** 와 **라우터** 를 사용하면 간단하게 웹서버 기능을 구성할 수 있다.

### 새로운 익스프레스 서버 만들기 

```javascript
var express = require('express')
  ,http = require('http')
  
  var app = express()
  //기본 포트를 app 객체 속성으로 설정. 
  app.set('port' , process.env.PORT || 3000)
  
  //익스프레스 서버 시작
  http.createServer(app).listen(app.get('port'), () => {
    console.log('start')
  })
```

`createServer` 메소드에 전달되는 파라미터로 app 객체를 전달한다. 
이 app 객체는 express 메소드 호출로 만들어지는 `익스프레스 서버 객체` 이다. 
  
#### 익스프레스 서버 객체가 가지고 있는 주요 메소드 

|메소드 이름|설명|
| :--- | :---|
|set(name, value)|서버 설정을 위한 속성.|
|get(name)|서버 설정을 위해 지정한 속성 꺼내오기|
|use([path,]function[,function..])|미들웨어 함수를 사용|
|get..|특정 패스로 요청된 정보 처리|

`set` 은 웹 서버의 환경을 설정하는 데 필요한 메소드 이다. 만약 title 속성을 app 객체에 넣어 두었다가 필요할 때 꺼내 사용하고 싶다면
`app.set('title', 'my-app')` 처럼 set 메소드를 사용한다. 

### 미들웨어로 클라이언트에 응답 보내기 
`use` 메소드를 사용하여 미들웨어 설정법에 대해 알아보자.  

웹 요청과 응답에 관한 정보를 사용해 `필요한 처리가 진행되도록` 독립된 함수로 분리한다. 이렇게 분리한 각각의 것들을 **미들웨어** 라고 합니다. 

예를들어, 클라이언트에서 요청했을 때 로그로 남기는 간단한 기능을 함수로 만든 후 use() 메소드를 사용해 미들웨어로 등록해 두면, 모든 클라이언트 요청이
이 미들웨어를 거치면서 로그를 남기게 된다.

각각의 미들웨어는 **next 메소드** 를 호출하여 그 다음 미들웨어가 처리할 수 있도록 순서를 넘길 수 있다.  

라우터는, 클라이언트의 요청 경로를 보고 이 요청 정보를 처리할 수 있는 곳으로 기능을 전달해 주는 역할을 한다. 

#### 여러개의 미들웨어를 등록하여 사용하는 방법 알아보기 

```javascript
// 첫번째 미들웨어
app.use(function(req, res, next) {
  req.user = 'mike'
  next()
})

// 두번째 미들웨어
app.use('/' , function(req, res, next) {
  res.writeHead('200' , {////생략})
  res.end()
})
```

첫번째에서 next를 반드시 호출해주어야 한다. 

### 익스프레스의 요청 객체와 응답객체
몇 가지 메소드를 더 추가할 수 있다. 다음은 익스프레스에서 추가로 사용할 수 있는 주요 메소드 이다. 

|메소드 이름|설명|
| :-- | :-- |
|send|클라이언트에 응답 데이터를 보낸다. 전달할 수 있는 데이터는 html, buffer, json|
|status|http 상태코드 반환|
|redirect|웹페이지 경로를 강제로 이동|
|render|view engine 을 사용해 문서를 만든 후 전송|

`status` 와 `sendStatus` 메소드를 사용해 상태코드를 전송할 수 있다. `status` 메소드는 상태 코드를 작성하는 기능만 있으므로 `send` 와 함께 이용해야 한다.

```javascript
res.status(403).send('Forbidden')
```

### 익스프레스에서 요청 객체에 추가한 헤더와 파라미터 
클라이언트에서는 요청 파라미터를 함께 보낼 수 있다. 이 때 GET 방식으로 요청했다면 요청 파라미터들은 요청 객체의 query 객체 안에 들어간다. 

## 05-3 미들웨어 사용하기
이미 만들어진 미들웨어를 잘 사용해보자.
### static 미들웨어
static 미들웨어는 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 만들어 준다. 
ex) public 폴더에 있는 모든 파일을 웹 서버의 루트 패스로 접근할 수 있도록 만들고 싶다면?

```javascript
var static = require('serve-static')
app.use(static(path.join(__dirname, 'public')))
```

### body-parser
POST 로 요청했을 때 요청 파라미터를 확인할 수 있는 미들웨어. 
> 이 부분도 잘 모르겠군..

## 05-4 요청 라우팅
요청 url을 일일이 확인하는 문제 해결을 위한것이 **라우터 미들웨어**

```javascript
//라우터 객체참조
var router = express.Router()

//라우팅 함수
router.route('./process/login').get(...)
router.route('./process/login').post(...)

//라우터 객체를 app 객체에 등록
app.use('/',router)
```
