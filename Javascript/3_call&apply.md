## call, aply

`call` , `apply` 메소드는 다른 객체 대신 메소드를 호출하는데 사용된다. 이 메소드를 사용하여 함수의 this 객체를 원래 컨텍스트에서 `thisObj` 로 지정된 새 객체로 변경할 수 있다.



**call은 인자 하나 하나를, apply는 인자 리스트를 전달한다.**

```javascript
fun.apply([thisObj[,argArray]])
```

1. fun : 가져다 쓸 메소드
2. thisObj : 현재 객체로 사용될 객체
3. argArray : 함수에 전달될 인자 

예를 하나 들어보면 다음과 같다.

```javascript
type = "zero"
var type1 = { type : "one"}
var type2 = { type : "two"}
function getType(){
    console.log(this.type)
}
getType()
getType.call(type1)
getType.call(type2)
```

결과는

```
zero
one
two

```

`call` 함수를 사용한다면 `call` 에 인자로 `this` 를 넘겨줌으로, `this` 값에 따라 `getType` 안에서 출력되는 소ㅑㄴ.쇼의 갑이 달라진다. 



> **bind** 와의 차이점은, call, aply는 함수가 실행되고, bind는 그렇지 않다. 
>
> bind 는 새로운 함수 인스턴스를 생성한다. 즉, context가 조정된 함수를 반환한다는 의미이다.  
