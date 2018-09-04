# ProtoType, Chaining

## 개요 
`Promise` , 그리고 `Node` 공부를 하다보니 Javascript 에서 필수적인 개념을 간과하고 있었다.  
가령, Promise 의 resolve 함수 내부 구현을 보았을 때,  

```javascript
function Tiramius(executor) {
  this._fullfillHandler = undefined;
  if (typeof executor === 'function') {
    executor(this.resolve.bind(this));
  }
}

Tiramius.prototype.resolve = function (obj) {
  let result = null;
  if (this._fullfillHandler) {
    result = this._fullfillHandler(obj);
  }
  if (this._chain) {
    if (result instanceof Tiramius) {
      result._fullfillHandler = this._chain._fullfillHandler;
      return result;
    }

    this._chain.resolve(result);
  }

  return new Tiramius(INTERNAL);
}

Tiramius.prototype.then = function (didFullfill) {
  this._fullfillHandler = didFullfill;

  const tiramius = this._chain = new Tiramius(INTERNAL);
  return tiramius;
}
```

이 코드를 완벽히 이해할 수 있는가에 대한 대답은 **아니오** 였다.  
프로토타입과 체이닝 정리를 시작해보자. 

## Prototype vs Class
자바스크립트도 객체지향언어이다. 자바스크립트에는 클래스라는 개념이 없다. 대신 프로토타입(Prototype)이라는 것이 존재한다. 자바스크립트가 프로토타입 기반 언어라고 불리는 이유이다.

클래스가 없으니 기본적으로 상속기능도 없습니다. 그래서 보통 프로토타입을 기반으로 상속을 흉내내도록 구현해 사용한다.

(하지만 ES6에 들어서면서 class도 생기고 extends도 생겼다. 그래도 기초는 변하지 않는다. 문법이 추가되었을 뿐, 기반 자체가 변했다고 보기는 어렵지.)  

## 간단한 예제.

Javascript로 만들어진 어떤책을 봐도 초반부에 등장할만한 코드이다.

```javascript
function Person() {
  this.eyes = 2;
  this.nose = 1;
}
var kim  = new Person();
var park = new Person();
console.log(kim.eyes);  // => 2
console.log(kim.nose);  // => 1
console.log(park.eyes); // => 2
console.log(park.nose); // => 1
```

kim과 park은 eyes와 nose를 공통적으로 가지고 있는데, 메모리에는 eyes와 nose가 두 개씩 총 4개 할당된다. 객체를100개 만들면 200개의 변수가 메모리에 할당되는 문제가 발생한다. (메모리 낭비)
바로 이런 문제를 프로토타입으로 해결할 수 있다.  

```javascript
function Person() {}
Person.prototype.eyes = 2;
Person.prototype.nose = 1;
var kim  = new Person();
var park = new Person():
console.log(kim.eyes); // => 2
```
Person.prototype이라는 빈 Object가 어딘가에 존재하고, Person 함수로부터 생성된 객체(kim, park)들은 어딘가에 존재하는 Object에 들어있는 값을 모두 갖다쓸 수 있다. 
(밑에서 조금 더 자세히 살펴본다.)  
즉, eyes와 nose를 어딘가에 있는 빈 공간에 넣어놓고 kim과 park이 공유해서 사용하는 것. 이글을 여기까지 읽었는데 이해가 안돼도 지금은 괜찮다.  

## Prototype Link와 Prototype Object
자바스크립트에는 `Prototype Link` 와 `Prototype Object` 라는 것이 존재한다.  
그리고 이 둘을 통틀어 **ProtoType** 이라고 부른다.  

### Prototype Object
모든 객체(Object)의 조상은 함수이다. 

```javascript
function Person() {} // 함수

var kim  = new Person(); // 함수로 객체를 생성 
```


## 

## 출처
[pillarlee16's git](https://github.com/pillarlee16/tiramiusjs/blob/master/tiramius.js)  
[medium/bluesh55](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
