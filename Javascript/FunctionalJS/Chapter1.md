# 0. 나는 왜 이 스터디를 하는가.

잘 짜고싶다.

유기적으로 슉샥슉 읽기 좋은 코드, 퍼포먼스가 좋은 코드를 짜고 싶다. 

새롭고 반짝이는 기술 말고, 기본기를 다지고 싶다. 튼튼한 개발자가 되어야지

# 1. 함수형 자바스크립트 소개

함수를 리턴하거나 괄호가 만흔 코드들을 처음 보는데, 참 난해하다. 3장정도까지 읽다가 메모하지 않으며 읽는 것은 의미가 없을 것 같아서 정리를 시작한다!

# 1.1 먹는건가..

싶다. `for` 와 `if` 의 향연만으로 코드를 짜던 나는 어렵다. 

### 1.1.1 클로저가 등장하는 예제 등장 

```javascript
function addMaker(a) {
    return function(b) {  //1 
        return a+b
    }
}
addMaker(10)(5)
/*
addMaker는 1을 반환하는 함수이다. 
addMaker(10) 의 결과가 함수이므로, 
( addMaker(10))(5) 와 같은 표현이다. 
*/
```

`addMaker(10)` 는 **함수** 이므로 `func` 처럼 써도 무방하다. 

따라서, `addMaker(10)(5)` 는 `func(5)` 이다. 

> 처음보는 ()() 꼴이 약간 혼란스러웠다. 



### 1.1.3 값으로써의 함수와 클로저 

> 클로저에 대한 내용을 따로 정리해보자 (+a)



## 1.2 집중해야 하는 함수형 js의 실용성 챕터

여기서부터 3장까지 읽다가 다시 1장으로 돌아왔다. 무한루프같은 함정에 빠질것 같다.. 따흐흙.... 

### 1.2.1 회원 목록 중 여러 명 찾기 .

```javascript
const users = [
    {id : 1, name : "ID" , age : 32} //이하생략
]
```

원래대로라면, 그냥 `for` 써서 일일히 찾았을 case. 



### 1.2.2 for To filter, if To predicate

```javascript
function filter(list, predicate) {
    let newList = []
    for(let i=0; i<list.length; i++) {
        if(predicate(list[i])) newList.push(list[i])
    }
    return newList
}
```

`predicate` 의 인자로 `list[i]` 가 넘어가고 loop을 돌며 뭘 처리한다. 

그럼 이제, **무언가 검사하는 것은 predicate 에 위임할 수 있다.** 

```javascript
const userName = filter(users, user => user.age < 30)
/*
predicate : user => user.age <30
predicate(list[i]) 에서 list[i] 가 user이다. 
*/
```

Awesome! 좋아졌다. 

### 1.2.3 다른 관점으로 filter 보기. 

함수형 프로그래밍에서는, **항상 동일하게 동작하는 함수** 를 만들고 보조 함수를 조합하는 형태로 로직을 완성한다.  

> 많은 이야기가 있었지만 객체지향과 비교하며 쓴 부분은 와닿지 않아서 패스.

### 1.2.4 map 함수 

이번에 리팩토링할 함수는, user의 나이가 30 이상과 미만인 경우에 각각 나이와 이름을 출력하려고 한다. 

막 짜는건 쉽다. for 돌려서 `.age ` `.name` 하면 된다. 근데 정말 약간만 다르고 로직은 똑같을 것이 뻔하다. 

**일을 위임하는 식** 으로 짜자. 

```javascript
function map(list, iteratee) {
    let newList = []
    for(let i=0; i<list.length; i++) {
        newList.push(iteratee(list[i]))
    }
    return newList
}
```

newList에 **무엇을 넣을 것인가** 는 `iteratee`에게 위임한다.  

```javascript
const re1 = filter(users, user => user.age < 30) //배열 return 
const ages = map(re1,user => user.age) //30미만인 배열을 넘기고, 거기서 age만 다 리턴하기. 
```

### 1.2.5 조금 더 멋지게 써보기.

잊지말자. `filter`함수의 return은 어차피, 배열이다.

`map(re1,user => user.age)` 이 부분의 첫 번째 인자인 re1 도 배열이다. 

있어보이게 한줄로 써보자. 

```javascript
       //30미만인 배열을 return한다.         //age반환함수 넘기기 
map(   filter(users,user=>user.age<30) , user=>user.age)
```

Awesome!

> 로그함수는 복잡하니까 이정도로 이해해도 괜찮을 것 같다. 

### 1.2.6 함수를 값으로 다룬 예제의 실용성

줄이면, 덜읽고, 협업에 좋다.

> 개발자가 두명인 프로젝트에서도 내가 너무 길고 못짜서 처음에 힘들었다. 

```javascript
function bvalue(key) {
    return function(obj){
        return obj[key]
    }
}

bvalue('a',({a:'hello',b'world'}))
```

[addMaker](1.1.1 클로저가 등장하는 예제 등장 ) 와 상당히 똑같은 함수이다.  

map 과 같이 사용해보자. 

>  map은 iteratee의 결과에 따라 새로운 배열을 리턴하는 함수이다. 

```javascript
map( filter(users, user=>user.age<30 ), bvalue('name'))
```

map 이 사용하는 함수를 `bvalue`가 리턴하는 함수로 대체한다 .

>  iteratee === `function(obj) return obj[key]`

이 코드의 동작을 정리해보자면, `filter` 에서 user.age가 30미만인 배열을 만들고, 그 배열의 `name` 만 뽑는다.  



## 1.3 함수형 자바스크립트의 실용성 2

응용인가보다. 

### 1.3.1 회원 목록 중 한 명 찾기 

회원 목록 중, 특정 조건을 가진 회원만 찾고 싶다. 예를 들면 id값으로 .

`filter` 함수를 활용하면 되지만, filter 함수는 무조건 list.length 만큼 실행되기 때문에 효율적이지 못하다. 

차라리 `for`에 `break` 를 거는 것이 낫다.

```javascript
let user
for(let i=0; i<users.length; i++) {
    if(users[i].id ===3) {
        user = users[i]
        break
    }
}
```

원하는 user를 찾은 후 break 로 빠져나오는 일반적인 코드이다. 

하지만 **재사용이 불가능** 하다. 재사용이 가능하도록 해보자.

```javascript
function findById(list, id){
    for(let i=0; i<list.length;i++) {
        if(list[i].id === id) return list[i]
    }
}
```

근데 이것도, **id** 찾기만 가능하다. 별로다.

general한 함수로 바꿔보자.

```javascript
function findBy(key, list, val) {
    for(let i=0; i<list.length; i++) {
        if(list[i].key === val) return list[i]
    }
}
```

하지만 이것도, 아래와 같은 상황에서는 안된다. 

```javascript
function User(id, name, age) {
    this.getId = function() {
        return id
    }
    this.getName = function() {
        return name
    }
}
const user = [
    new User(1,"id",32)
]
```

이 코드를 보면 user의 id를 `getId`로 얻어와야 하기 때문에 대응할 수 없다. 

더 나은 함수를 만들어 보자.



### 1.3.2 값에서 함수로

`filter`나 `map` 처럼 인자로 키와 값 대신 함수를 사용해 보자. 

```javascript
function find(list, predicate) {
    for(let i=0; i<list.length; i++) {
        if(predicate(list[i])) return list[i]
    }
}
console.log(
	find(user, u=> return u.getID()===25).getName()
)
```

`find` 는이제 배열에 어떤 값이 들어 있든 사용할 수 있게 되었다. 

마지막으로 awesome 하게 써보자.

```javascript
//map 설명
//(list, iteratee)를 인자로 받음 
//newList.push(iteratee(list[i]))
     // list                     //iteratee
map( filter(users, u=>u.age>30) , u=>u.name )
```

### 1.3.3 함수를 만드는 함수와 find, filter 조합하기

```javascript
function bmatch(key, val) {
    return function(obj) {
        return obj[key] === val
    }
}
console.log( find(users, bmatch('id',1))  )
```

> 나는 아무래도 클로저에 대한 이해가 부족한것 같다. 

bmatch의 실행 결과는 **함수**다. key 와 val을 미리 받아서 나중에 들어올 obj와 비교하는 익명함수를 클로저로 만들어 리턴한다.

> 응? ?  ?  ? 클로저 정리 진짜 해야할때다. 

bmatch는 함수를 리턴하기 때문에 filter나 map 과 조합이 좋다. 



여러 개의 key에 해당하는 value들을 비교하는 함수를 만들어 보자. 

```javascript
function object(key,val) {
    let obj = {}
    obj[key] = val
    return obj
}
function match(obj, obj2) {
    for(let key in obj2) {
        if(obj[key] !== obj2[key]) return false
    }
    return true
}

function bmatch(obj, vla) {
    //arguments.length 속성은 실제로 함수에 전달된 arguments 의 수를 제공합니다.
    //obj2를 만들어줌.
    if(arguments.length === 2) obj2 = object(obj2,val) 
    return function(obj) {
        return match(obj,obj2)
    }
}

// 어려운 코드 ...
console.log( match(find(users,bmatch('id',3)) , find(users,bmatch('name','BJ'))  ) 
```

`find`를 고쳐서 `findIndex` 를 만들 수 있다. 

```javascript
function findIndex(list, predicate) {
    for(let i=0; i<list.length; i++) {
        if(predicate(list[i])) return i
    }
    return -1
}
```

잘 만들었다.

### 1.3.4 고차함수

고차 함수란, 함수를 인자로 받거나 함수를 리턴하는 함수를 말한다. 보통 고차 함수는 함수를 인자로 받아, **필요한 때 실행하거나 클로저로 만들어 리턴한다.**

> 끊임없는 클로저 이야기

아직 lodash 나 Undersocre.js 를 많이 써보지 않았지만, ~~책에 있으니까 써보자.~~ 만들어 보자. 

```javascript
_.map = function(list, iteratee) {
    let newList = []
    for(let i=0; i<list.length; i++){
        newList.push(iteratee(list[i], i, list))
    }
}
_.filter = function(list , predicate) {
    let newList = []
    for(let i=0; i<list.length; i++) {
        if(predicate(list[i],i,list)) newList.push(list[i])
    }
}
                                 //val = list[index]
console.log( _.filter([1,2,3,4], (val,index)=>index>1  ) )
```

### 1.3.5 쓸모없어 보이지만 쓸모 있다고 하는 함수

`Underscore.js` 에 있는 함수라고 한다. ~~진짜 쓸모없어 보인다.~~

```javascript
_.identity = v=>return v
const a = 10
console.log(_.identity(a)) //10
```

뭔가 싶다. 

**결론을 스포하자면, undef나 null 체크에 좋다.**

```javascript
console.log( filter([true,0,'10',false,null]), _.identity )
//[true,'10']
```

> 질문이다. 어렵다. 모르겠다; !! 왜하지 
>
> 해결 되었다. 

[!! 쓰는 이유](https://hermeslog.tistory.com/279 )

정리하자면 느낌표 두개(!!) 연산자는 **확실한 논리결과**를 가지기 위해 사용합니다.
예를 들어 정의되지 않은 변수 undefined 값을 가진 내용의 논리 연산 시에도 **확실한 true / false**를 가지도록 하는게 목적입니다.

```javascript
_.some = function(list) {
    return !!_.find(list,_.identity)
}
_.every = function(list) {
    return _.filter(list, _.identity).length == list.length
}
```

`_.some` 은 배열에 들어 있는 값 중 하나라도 긍정적인 값이 있으면 `true` , 하나도 없다면 `false` 를 리턴한다.

`_.every` 는 모두 긍정적인 값이어야 `true` 를 리턴한다. 

그런데, `_.every` 는 좀 루프를 끝까지 돌아서 좀 비효율 적이다. 



### 1.3.6 연산자 대신 함수로 

아주 작은 함수. tiny 함수.

```javascript
function not(v) return !v
function beq(a) {
    return function(b) {
        return a === b
    }
}
```

굳이 이런것 까지 함수로 만들어야 할까.. 라고 싶지만 일단 따라가자. 

```javascript
_.some = function(list) {
    return !!_.find(list , _.identity)
}
_.every = function(list) {
    return beq(-1)(_.find(list,not))
}
```

not은 연산자 !가 아닌 함수이기 때문에, `_.findIndex` 와 함께 사용할 수 있다. 

list의 값 중 하나라도 부정적인 값을 만나면, `predicate` 가 `not`이므로 부정적인 값을 가진 해당 아이템의 `index` 를 리턴한다. 

그렇게 되면, -1과 비교했을 때, `false`이므로 `_.every` 의 값도 false가 된다. 

**함수가 가능하면 하나의 일만 하게 하자.**

### 1.3.7 함수 합성

함수를 쪼갤수록 함수 합성은 쉬워진다. 

Underscore.js 의 `_.compose` 는 오른쪽의 함수의 결과를 바로 왼쪽 함수에게 전달한다. ... 어쩌구 저쩌구.... 

> 질문이다... 나중에 뭔지 다시보자..

```javascript
//underscore.js 중 일부 발췌
_.compose = function() {
    let args = 
}
```





