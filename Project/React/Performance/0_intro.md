# SemiBasement의 성능 개선에 대한 과정을 담는 글 

semibasement의 성능 개선에 대한 과정을 담아보는 글.

2018 GDG DevFest [한재엽님_발표](https://slides.com/jbee/devfest_seoul_2018_performance_optimization_with_chrome_devtools?fbclid=IwAR1NOO0qwYz_ssaGzXcwu6YhiTkmQQZFAbhcDob4wsuhjGwhCiSVUJCvhaA#/) 를 듣고, 현재 진행하고 있는 프로젝트의 성능을 Chrome 개발자 도구인 `Audits`를 사용해 측정해 보았다. 

## 성능 최악

`build` 하지 않고 측정해 보긴 했지만, Performance 부분에서 ~~17~~점 이라는 저조하디 저조한 점수를 받고 충격받았다.

사실 프로젝트 자체가 비동기 요청이 많다보니, 어느 정도는 느릴 수 밖에 없다고 생각은 했지만 **이 정도일줄은 몰랐다.** 

User가 웹서비스를 판단할 때, 다른 어떠한 요소보다도 **속도** 를 가장 중요시 한다는 발표자료를 보았다. 성능개선은 선택이 아닌 필수라고 생각했다.

> Front단의 기본적 기능구현이 완료된 상황에서 진행할 적합한 작업이라고 생각했다. 

## 어떻게 하지..

너무 막막했다. 2018GDG 웹 세션에서는 다양한 방법으로 성능 최적화를 진행하신 분들이 많았지만, 도대체 나는 어떤것을 적용해서 최적화 해야할지 막막했다. 

`Workbox` , `Lazy Loading` , `Data Schema` 등에 대한 키워드는 많이 들었지만 문서는 어려웠고 **이것을 도입하는 것이 맞을까?** 에 대한 확신이 없었다. 

**모르면, 물어봐야 한다.**

조언을 구하고자 개발자 분께 메일로 연락을 드렸다.

![image](https://user-images.githubusercontent.com/18658235/48314028-0a7e2980-e607-11e8-9f7e-54c570cb5592.png)

정말 감사하게도, 도움을 주시겠다고 응답이 왔고 방향을 잡아볼 수 있었다. 



## 방향을 잡아보자.

우선, ~~17점~~이 나온것은 `build` 하지 않아서 였다..

> build 하고서는 37점 되었다..

### Landing Page의 동영상과 gif. 

[gif사용을 멈춰주세요!](https://medium.com/vingle-tech-blog/stop-using-gif-as-animation-3c6d223fd35a) 를 보면, **GIF는 불필요하게 대역폭을 낭비해 엄청나게 많은 전송량을 발생시킵니다.** 라는 점에 주목할만 하다. 

gif 사용을 피할 수 있다면, 정말 피해야 한다. 이는 디자이너님의 영역이므로 재빠르게 슬랙으로 상황을 공유드린다.

![image](https://user-images.githubusercontent.com/18658235/48314081-ac9e1180-e607-11e8-93e6-d187373b5396.png)

> p4 파일이랑 gif 파일 빼면 audit 기준 30점 상승. 야호!



### web font

SPA 경우에는 일단 자바스크립트가 돌아야 첫 화면이 그려지는데 부트스트랩이랑 폰트를 긁어오는 동안에 `rendering path`가 blocking되고 있다. 부트스트랩은 어쩔 수 없지만, font는 빼볼 수 있다. 

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

![image](https://user-images.githubusercontent.com/18658235/48314116-19b1a700-e608-11e8-83a0-81c81d565c4d.png)

> 정말 여러가지 폰트가 있다. 

이 부분에 대한 키워드는 아래와 같다.

1. `rel="preload"` 
2. https://slides.com/sangjinlee/webconf-2018-5



### Etc

이 외에도, 클릭이벤트에서 매번 중복데이터를 비동기 요청 처리하는 것을 접어두고 `Redux` 나 기타 다른 것들..(..) 을 활용해 **저장해 두었다가 사용** 해보는 것을 실험해볼 예정이다. 

## 개선해보자!

성능 측정은 계속 `Audits` 을 활용하고, 가급적 같은 네트워크 환경에서 진행하며 과정을 비교해본다. 
