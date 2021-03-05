# CDN (Contents Delivery Network)

웹사이트를 구성하는 수많은 리소스들이 있을 경우 어떻게 최적화하는가? 예를들어서, 수십개의 이미지로 구성되어있을 경우 그 용량이 상당하기 때문에 동일한 웹서버에 요청해서 이를 가져온다면 사이트 로딩 속도가 매우 느려지는데 어떻게 해결할 것인가? CDN을 이용한다.

CDN은 컨텐츠 전달 네트워크의 약자로 말그대로, 컨텐츠를 전달하는 네트워크를 구성하는 것이다. 보통 웹사이트를 로딩할 때는 웹 서버에 HTTP요청을 하여 리소스를 가져오지만 웹 서버가 아니라 현재 사용자가 접속한 위치에서 가장 가까운 서버에 리소스를 캐싱해놓고 보다 빠르게 가져오는 기법이다. 물론, CDN네트워크를 구축하기 위해선 해당되는 지역의 ISP(인터넷 제공업체, Internet Service Provider),네트워크 사업자, 이동통신 사업자에게 서버의 호스팅 비용을 지불해야한다. 이렇게 네트워크를 구축하게 되면 정적리소스를 더욱 빠른 속도로 서비스 할 수 있게 된다.

## 장점

- 리소스를 캐싱해 놓기 때문에 로딩속도가 빨라진다.
- 1개의 웹서버에서만 리소스를 가져오지 않기 때문에 서버의 부하가 줄어든다.
- 보통 1개의 도메인이 10개의 병렬 연결을 허용하는데 CDN을 사용하면 병렬연결이 늘어난다.

<br>

## 단점

- 서버를 구축하는 비용 때문에 돈이 더 많이 든다.
- 사용자가 해당되는 CDN을 막아놓으면 리소스 로딩이 막힌다.
- 배포과정이 다소 복잡해질 수 있다.
- 보통 CDN서비스 회사는 각 나라마다의 서버를 구축해 놓지만, 자신의 나라에 없어서 해외 CDN을 사용하는 경우 더 느려질 수 있다.

## 참고

- [David Hall, Advantages and Disadvantages of a Content Delivery Network (CDN)](https://blog.webnames.ca/advantages-and-disadvantages-of-a-content-delivery-network/)
- [Stackoverflow, What are the advantages and disadvantages of using a content delivery network (CDN)?](https://stackoverflow.com/questions/2145277/what-are-the-advantages-and-disadvantages-of-using-a-content-delivery-network-c)
