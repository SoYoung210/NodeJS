# 개발자를 위한 UX Programming
2018 FEconf 코드스쿼드 윤지수 교수님 세션

## UX ? 
`UserExperience` : 사람과 (기기)이벤트 사이의 ineraction.  
UI는 보여지는, 감성적인 부분이고, 만들어진 디자인을 어떻게 조화시켜서 사용자에게 좋은 경험을 줄것인가?   

### UX전문가의 일 
- Task 분석
- 와이어프레임
- 사용성 테스트
- 상세설계 

### FE 개발자가 UX를 신경써야 할까?
결국은, **서비스가 잘 되는 것** 이 목표이다.  
기술적인 고려가 부족한 인터랙션은 결국 **개선사항** 대상이다.  

간결한 인터랙션에 집중하자. UI가 아니다. **UX** 이다.  

### Scenario Driven Development
Gal -> Feauture(Task) -> Scenario -> Function(기능구현) 
**프로그래밍의 설계 시작은 상세설계 분석부터가 아니라, 시나리오를 구체화하는 단계** 이다.  

기능 단위가 아니라, 사용자 사용성 면에서 개발을 진행하자.  


### 시스템 중심 사고 -> 사용자 중심 사고 
API 설계 시, 사용자 관점에서 효과적인지 협력하기. 


## Writing

`input` type number인지, text 인지 .... 

### 입력 Form

* 입력 필드 줄이기 
* 정보를 한번에 입력받을 수는 없을까?
* 훌륭한 input type ... 

#### 좋은 피드백을 주는 form
* 오류메시지는 현상이 아니라, 조치방법을 안내. (ex : 특수문자가 하나니까, 두개 넣으세요!)

### 편안한 글쓰기
임시 저장 기능, undo/redo(immutable object는 뒀다 뭐하나....)

## Animation

애니메이션은 결국 작은것이 모여서 큰 차이. (네이버 검색창 누르면 양쪽으로 약간 넓어짐.)  


## Performance

가장 빠른것은, 안하는 것이다.  
탭을 누를 때 마다 ajax를 요청한다? --> 즉각적인 반복성 저하. (캐시방법) 

ServiceWorker. Cache 를 좀 활용해보자.  
PWA의 핵심은 캐싱이고, ... 잘쓰는 것이다. 
로딩과 같은 이미지를 획기적으로 줄여보자.  

### lazy Loading. 
지연 처리가 초기로딩에는 유리하지만, 더 중요한 것은 반응성이다. 
### 지원군들
async/await , REact16.6 lazy feature. 

### 지연 문제
SPA의 단점을 SSR로 ... ? 
Loading indicator 사용하기.  

하지만 **진짜 느리다면,** 로딩 요청 Progress 를 % 형태로 시각적으로 보여주기.  



## Exploration

사용자는 웹을 잘 탐색하는가? 
debounceTimeout 등으로 지연을 하자. 

Mega drop Down이 불편하다. nav 메뉴에서 선택영역이 유지되도록 하는 것이 섬세한 UX 
![image](https://user-images.githubusercontent.com/18658235/47949345-b16a2200-df84-11e8-87cb-58681688b0ba.png)


## 스와이핑 고찰
사용자 경험을 떠나서, 구현이 어렵다. Dom 조작이라던가.... 스크롤 컨트롤...이라던가... 
적절한 인터랙션을 짜는 것은 자바스크립트를 최소화 하고 브라우저의 **기본적인 인터랙션** 을 많이 알아보자.   
행복하게, 덜짜자. 


