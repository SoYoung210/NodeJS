## 리액트란 무엇인가?

 프레임워크들의 모델은, 대부분 어떻게 작동하냐면, 양방향 바인딩을 통하여 모델에 있는 값이 변하면, 뷰에서도 이를 변화시켜 준다. 여기서 핵심적인 부분은 **변화시켜준다는** 부분이다. 일단 첫 화면을 보여주고, 변화에 따라 필요한곳을 바꿔준다.



하지만, 매번 DOM 을 새로 업데이트한다면, 엄청난 성능저하가 있을 것이다. 

그래서 사용하는 것이 **Virtual DOM ** 이다.

VirtualDOM 은 가상의 DOM으로, 변화가 일어나면 실제로 브라우저의 DOM에 새로운 넣는 것이 아니라 먼저 Virtual DOM에 한번 렌더링을 하고, 기존의 DOM과 비교해서 업데이트가 필요한 곳만업데이트 한다. 



## props와 state

`props` 는 부모 컴포넌트가 자식 컴포넌트에게 주는 값이다. 

반면, `state` 는 내부에서 선언하며 내부에서 값을 변경할 수 있다. 

### LifeCycle API

이 API 는 컴포넌트가  브라우저에서 나타날때, 사라질때, 그리고 업데이트 될 때, 호출되는 API 이다.

![undefined](https://cdn.filestackcontent.com/ApNH7030SAG1wAycdj3H)

### 컴포넌트 초기 생성

컴포넌트가 브라우저에 나타나기 전, 후에 호출되는 API 들이 있다.

#### constructor

```javascript
constructor(props) {
    super(props)
}
```

컴포넌트가 새로 만들어질 때 마다 호출된다. 

#### componentDidMount

```javascript
componentDidMount() {
    // 외부 라이브러리 연동.
    // 컴포넌트에 필요한 데이터 요청 ajax, graphql
}
```

컴포넌트가 화면에 나타나게 되었을 때 호출 된다. 

> 설명이 좀 부족한듯;

### 컴포넌트 업데이트

컴포넌트 업데이트는 `props` , `state` 의 변화에 따라 결정된다. 업데이트가 되기 전과 된 후에 어떤 API가 호출될까? 

#### static getDerivedStateFromProps()

`props` 로 받아온 값을 `state` 로 동기화 하는 작업을 해줘야 하는 경우에 사용한다. 

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
  // 여기서는 setState 를 하는 것이 아니라
  // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
  // 사용됩니다.
  /*
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
  */
}
```

#### shouldComponentUpdate

```javascript
shouldComponentUpdate(nextProps, nextState) {
  // return false 하면 업데이트를 안함
  // return this.props.checked !== nextProps.checked
  return true;
}
```



#### getSnapshotBeforeUpdate

이 API 가 발생하는 시점은 다음과 같다.

1. render()
2. **getSnapshotBeforeUpdate()**
3. 실제 DOM 에 변화 발생
4. componentDidUpdate

이 API를 통해서, DOM 변화가 일어나기 직전의 DOM 상태를 가져오고, 여기서 리턴하는 값은 componentDidUpdate 에서 3번째 파라미터로 받아올 수 있게 된다.

```javascript
 getSnapshotBeforeUpdate(prevProps, prevState) {
    // DOM 업데이트가 일어나기 직전의 시점입니다.
    // 새 데이터가 상단에 추가되어도 스크롤바를 유지해보겠습니다.
    // scrollHeight 는 전 후를 비교해서 스크롤 위치를 설정하기 위함이고,
    // scrollTop 은, 이 기능이 크롬에 이미 구현이 되어있는데, 
    // 이미 구현이 되어있다면 처리하지 않도록 하기 위함입니다.
    if (prevState.array !== this.state.array) {
      const {
        scrollTop, scrollHeight
      } = this.list;

      // 여기서 반환 하는 값은 componentDidMount 에서 snapshot 값으로 받아올 수 있습니다.
      return {
        scrollTop, scrollHeight
      };
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { scrollTop } = this.list;
      if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 구현되어있다면 처리하지 않습니다.
      const diff = this.list.scrollHeight - snapshot.scrollHeight;
      this.list.scrollTop += diff;
    }
  }
```

