## 브라우저의 동작 원리

1. HTML 마크업을 처리하고, DOM 트리를 빌드한다. (**"무엇을"** 그릴 지 결정한다.)
2. CSS 마크업을 처리하고, CSSSOM 트리를 빌드한다.( **"어떻게"** 그릴 지 결정한다.)
3. DOM 및 CSSOM 을 결합하여 렌더링 트리를 형성한다. (**"화면에 그려질 것만"** 결정)
4. 렌더링 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산한다.
   (**"box-model"** 을 생성한다.)
5. 개별 노드를 화면에 페인트 한다. 



### 브라우저의 주요 구성 요소 

![brouser1](https://d2.naver.com/content/images/2015/06/helloworld-59361-1.png)

1. 사용자 인터페이스 - 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분이다.
2. 브라우저 엔진 - 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어.
3. 렌더링 엔진 - 요청한 콘텐츠를 표시. 예를 들어 HTML을 요청하면 HTML과 CSS를 파싱하여 화면에 표시함.
4. 통신 - HTTP 요청과 같은 네트워크 호출에 사용됨. 이것은 플랫폼 독립적인 인터페이스이고 각 플랫폼 하부에서 실행됨.
5. UI 백엔드 - 콤보 박스와 창 같은 기본적인 장치를 그림. 플랫폼에서 명시하지 않은 일반적인 인터페이스로서, OS 사용자 인터페이스 체계를 사용.
6. 자바스크립트 해석기 - 자바스크립트 코드를 해석하고 실행.
7. 자료 저장소 - 이 부분은 자료를 저장하는 계층이다. 쿠키를 저장하는 것과 같이 모든 종류의 자원을 하드 디스크에 저장할 필요가 있다. HTML5 명세에는 브라우저가 지원하는 '[웹](http://www.html5rocks.com/en/features/storage)[ ](http://www.html5rocks.com/en/features/storage)[데이터](http://www.html5rocks.com/en/features/storage)[ ](http://www.html5rocks.com/en/features/storage)[베이스](http://www.html5rocks.com/en/features/storage)'가 정의되어 있다.



#### 렌더링 엔진들

파이어폭스와 크롬, 사파리는 두 종류의 렌더링 엔진으로 제작되었다. 파이어폭스는 모질라에서 직접 만든 **게코(Gecko) 엔진**을 사용하고 사파리와 크롬은 **웹킷(Webkit) 엔진**을 사용한다.

> 굿닥 설문에 사파리와 크롬 브라우저만 대응하는 적절한 근거가 될 수 있겠다.
>
> +) HTML5 tag의 audio, video tag 에 관한 이슈도 설명해주면 좋을듯.



### DOM트리 예제

예를 들어, 이런 마크업이 있다고 하자.

```html
 <html>
  <body>
   <p>Hello World</p>
   <div><img src="example.png" /></div>
  </body>
</html>
```

이것은 아래와 같은 DOM 트리로 변환할 수 있다.

![brouser8](https://d2.naver.com/content/images/2015/06/helloworld-59361-8.png)

브라우저 주소창에 url을 입력하고 엔터키를 치면 브라우저는 해당 서버에 요청을 보내게 됩니다. 요청에 대한 응답으로는 위와 같은 형태의 HTML문서를 받아오게 되고, 이걸 하나하나 **파싱parsing**하기 시작하면서 브라우저가 데이터를 화면에 그리는 과정이 시작됩니다. 

- 미디어 파일을 만나면 추가로 요청을 보내서 받아옵니다.
- JavaScript 파일을 만나면 해당 파일을 받아와서 실행할 때까지 파싱이 멈춥니다.



HTML을 파싱하다가 CSS링크를 만나면, CSS파일을 요청해서 받아오게 됩니다.   
받아온 CSS파일은 HTML을 파싱한 것과 유사한 과정을 거쳐서 역시 Tree형태의 **CSSOM**으로 만들어집니다.   
CSS 파싱은 CSS 특성상 자식 노드들이 부모 노드의 특성을 계속해서 이어받는(cascading) 규칙이 추가된다는 것을 빼고는 HTML파싱과 동일하게 이루어집니다.   
이렇게 CSSOM을 구성하는 것이 끝나야, 비로소 이후의 Rendering 과정을 시작할 수 있습니다. 
(그래서 CSS는 rendering의 blocking 요소라고 합니다.)  

### 출처
[브라우저가 그리는 원리](https://m.post.naver.com/viewer/postView.nhn?volumeNo=8431285&memberNo=34176766)
[브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361?comment_srl=66159)
