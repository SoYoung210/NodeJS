# Browser에 특정 URL로의 이동 action을 보낼 때 일어나는일
본 글은 [What happens when you type an URL in the browser and press enter?](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a) 을 번역한 글입니다. 

## www.google.com 을  쳤을 때 일어나는 일 

### 1. 브라우저의 주소창에 주소 입력

### 2. 브라우저 캐시에서 DNS레코드를 확인하여 www.google.com 의 IP 주소를 찾는다.

`DNS` 는 웹 사이트의 이름과 링크 할 특정 IP 주소를 유지, 관리 하는 데이터 베이스 이다. 인터넷의 모든 단일 URL에는 고유한 IP주소가 할당되어 있다. 

IP 주소는 우리가 `access` 를 요청한 웹사이트의 서버를 호스팅하는 컴퓨터에 속한다. 

> 예를 들어, www.google.com의 ip주소는 209.85.227.104 이다.

DNS 레코드를 찾기 위해 브라우저는 네 개의 캐시를 확인한다. 

1. Browser Cache를 확인한다. Browser는 이전에 방문한 웹 사이트의 고정된 기간동안 DNS레코드 저장소를 유지, 관리한다. 
2. OS Cache를 확인한다. Browser Cache에 해당 내용이 없으면, Browser는 system call을 사용하여 레코드를 가져온다. 
3. Router Cache를 확인한다. 컴퓨터에서 찾을 수 없다면, Browser는 자신의 DNS 레코드 캐시를 유지하는 라우터와 통신한다. 
4. ISP Cache를 확인한다. 



### 3. 요청 된 URL이 Cache에 없으면, ISP의 DNS 서버가 DNS 쿼리를 시작하여 googel.com을 호스팅하는 서버의 IP 주소를 찾는다. 

DNS 쿼리의 목적은 웹 사이트에 올바른 IP주소를 찾을 때 까지 인터넷 상의 여러 DNS 서버를 검색하는 것이다. 

DNS 서버에서 DNS 서버로 반복적으로 검색이 계속 진행 되므로 필요한 IP주소를 찾거나 찾을 수 없다는 응답을 반환 할 때까지 검색을 계속한다. 

![img](https://cdn-images-1.medium.com/max/1600/0*udK6jZ3PjlhjqW8U.png)

이 그림을 통해 DNS 쿼리 수행과정을 살펴보자. 

map.google.com 이라고 한다면, 우선 DNS recursor는 루트 도메인 서버에 연결한다. 

1. 루트 네임 서버는 `.com` 도메인 네임 서버로 redirection. 

1. `.com` 도메인 네임 서버가 `google.com`  도메인 네임 서버로 redirection
2. `google.com` 네임 서버는 `maps.google.com` 의 일치하는 IP주소를 **DNS 레코드** 에서 찾아서 DNS Cache로 반환하여 다시 브라우저로 전송한다. 

### 4. 브라우저가 서버와 TCP 연결을 시작한다. 

브라우저가 올바른 ip 주소를 받으면, 정보를 전송하기 위해 ip 주소와 일치하는 서버와의 연결을 구축한다. tcp는 모든 유형의 HTTP 요청에 사용되는 가장 일반적인 프로토콜이다. 

Client와 Server간에 데이터 패킷을 전송하려면, TCP 연결을 설정하는 것이 중요하다. 

이 연결은 TCP/IP 3 hand shake 라는 프로세스를 사용하여 설정된다. 

> Client와 Server가 SYN(동기) 및 ACK(승인) 메시지를 교환하여 연결을 설정하는 3단계 프로세스. 
>
> 1. client는 새로운 연결을 위해 server에 syn 패킷을 보낸다.
> 2. server가 새로운 연결을 받아들이고 시작할 수 있는 open port를 가지고 있으면 syn/ack 패킷을 사용하여 Acknowledgement로 응답한다. 
> 3. client는 server로부터 SYN/ACK 패킷을 수신하고 ACK 패킷을 보내 응답한다.
>
> 연결 끄읕!

### 5. 브라우저가 웹 서버에 HTTP 요청을 보낸다. 

TCP 연결이 설정되면, 데이터 전송을 시작한다. 

브라우저가 map.google.com 웹 페이지를 요청하는 `GET` 요청을 보낸다. 

> 양식을 제출하거나 자격증명등의 요청일 경우 POST

이 요청에는 User-Agent Header, Access Acceptance 등에 대한 추가 정보, 쿠키에서 가져온 정보도 포함.

![img](https://cdn-images-1.medium.com/max/1600/0*SyxEqHOBZElX5laf.png)

> 헤더 강조표시 되어 있음

### 6. 서버가 요청을 처리하고 Response 되돌려 보낸다.

> 잘 모르겠는 부분. 

### 7. 서버가 HTTP 응답을 보낸다.

서버 응답에는 상태 코드, 압축 유형, 개인 정보 등 요청한 웹페이지가 포함된다.

Example :

![img](https://cdn-images-1.medium.com/max/1600/0*ifRt45gihG_AwR3Z.png)



### 8. 브라우저는 서버가 보낸 HTML 내용을 표시한다.

브라우저는 단계적으로 HTML 내용을 표시한다. 

html tag를 검사하고, 이미지, css style sheet, js 파일 등과 같은 웹 페이지의 추가 요소에 대한 `GET` 요청을보낸다. 

이후 렌더링 과정은 [1_how_to_browser_work.md](./1_how_to_browser_work.md) 에서 다룬다. 

### 출처

[url-browser-enter](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a) 번역
