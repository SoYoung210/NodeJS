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

자바스크립트에서의 프로토 타입은 두 가지의 의미가 혼용되어 사용되고 있다.

1. \___proto_\__ : 상위에서 물려 받은 객체의 프로토 타입에 대한 정보. (prototype link)
2. prototype : 자신의 프로토타입 객체, 즉 하위로 물려 줄 프로토타입의 정보. (prototype object)

```javascript
function Animal() {};
console.dir(Animal);
```

다음 코드를 콘솔에서 실행한 결과는 아래와 같다. 

![image](https://user-images.githubusercontent.com/18658235/48145353-06e05f00-e2f6-11e8-82b0-f5f9bad87e8f.png)

위 결과를 다이어그램으로 표시해 보자. 

![image](https://user-images.githubusercontent.com/18658235/48145366-0b0c7c80-e2f6-11e8-8487-07c6a73ec17d.png)



정의한 Animal 함수의 `__proto__` 는 Animal 객체를 생성할 때 사용될 원형 프로토 타입을 가리키고 있다. 

> 두 가지중 첫 번째

Animal 함수의 `prototype` 은 Animal의 프로토타입을 가리키고 있다. 

> 두 가지중 두 번째 

```javascript
function Animal() {};
Animal.prototype.bark = function () { console.log("왈왈!"); };
var dog = new Animal();
var cat = new Animal();
console.dir(Animal);
console.dir(dog);
console.dir(cat);
```

아래는 응용 ver.

```javascript
function Animal() {};
Animal.prototype.bark = function () { console.log("왈왈!"); };
var dog = new Animal();
var cat = new Animal();
console.dir(Animal);
console.dir(dog);
console.dir(cat);

```

![image](https://user-images.githubusercontent.com/18658235/48145321-f62fe900-e2f5-11e8-858f-7a2081f48bdb.png)


생성한 cat, dog 객체의 `__proto__` (prototype link) 는, cat 객체와 dog 객체를 생성한 프로토타입 객체를 가르키고 있다.



#### Prototype Chain

코드 2에서 `dog.bark()` 를 실행하면 어떤 결과가 나올까? 

> "왈왈"

dog 객체에는 bark라는 함수가 정의 되어 있지 않지만, Animal 프로퍼티에는 bark라는 함수가 정의 되어 있고, Animal 프로퍼티에 정의된 bark의 결과 값을 얻게 된다.



이와 같이 현재의 객체에서 어떠한 기능을 호출하였는데, 찾지 못하면 상위로 올라가 찾게된다.

이러한 개념(반복하여 상위로 올라가며 찾는) 을 프로토타입 체인(Prototype Chain) 이라고 한다. 

#### 참고

[bemoy](
## 

## 출처
[pillarlee16's git](https://github.com/pillarlee16/tiramiusjs/blob/master/tiramius.js)  
[medium/bluesh55](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
