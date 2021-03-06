# 프로세스 개념

## 3.1 소개


이장에서는 프로세스의 개념을 정식으로 살펴본다. 프로세스는 오늘날 컴퓨터 시스템의 동작 원리와 동시에 수행되는 많은 활동을 관리하는 방법을 이해하는데 필요한 핵심 개념이다. 먼저 더 일반적인 프로세스 개념을 소개하고 자세한 프로세스 상태와 이 프로세스들이 상태 변화를 일으키는 방법과 그 이유에 대해 살펴본다. 또한 프로세스를 생성에서부터 종료 일시정지 재시작 깨우기 등 운영체제가 프로세스를 서비스할 때 수행하는 다양한 연산을 논의한다.

### 3.1.1 프로세스 정의

운영체제 문맥에서 프로세스는 60년대 멀틱스 설계자들이 처음 사용하기 시작했다. 그 이후로 프로세스를 어느 정도 작업과 바꿔 쓸 수 있는 용어처럼 여기게되고, 이외에도 여러 정의가 생겼다. 예를 들면 실행중인 프로그램, 비동기 활동, 프로시저에 생명을 불어 넣는것, 실행중이 ㄴ프로시저의 통제소재라고도한다. 한편 운영체제에 있는 프로세스 기술자 또는 프로세스 제어블록이라는 자료구조로 정의되는 것이라고도 한다. 

또한 프로세서가 할당되는 개체, 디스패치 가능한 단위로 지칭하기도 한다. 프로그램이 낱장 악보들이라면, 프로세스는 음악을 연주하는 심포니 오케스트라에 비유할 수 있다. 

프로세스는 개체라는 것이다. 각 프로세스는 자신의 주소 공간을 가지고있다. 주소공간은 대개 텍스트영역, 데이터영역, 스택영역으로구분된다. 텍스트 영역은 프로세서가 실행하는 코드를 저장하는 영역이다. 데이터영역은 변수들을 저장하는 영역과 프로세스가 실행중에 사용하려고 동적으로 할당받은 메모리 공간이다. 스택영역은 호출된 프로시저용으로 지역변수와 명령어들을 저장하는 공간이다. 스택의 내용은 프로세스가 중첩되게 프로시저 호출을 할 수록 증가하고, 호출된 프로시저가 수행을 마치고 반환할 때마다 줄어든다. 두번째로, 프로세스는 실행중인 프로그램이다. 프로그램은 살아있는 개체가 아니다. 프로세서가 프로그램에 생명을 불어넣을 때야 비로소 프로세스라는 활성 개체가 된다.

## 3.2 프로세스 상태 프로세스 생명 주기

운영체제는 각 프로세스가 충분한 프로세서 시간을 할당받을 수 있게 해야한다. 어떤 시스템이든 동시에 실행되는 프로그램이 프로세서 수만큼 존재할 수 있다. 하지만 보통 시스템이는 프로세서 수보다 훨씬 많은 프로세스가 있다. 그러므로 임의의 특정 시간을 두고 볼 때 몇몇 프로세스는 실행되고 몇몇은 실해오디지 못한다. 

프로세스 생명 주기 동안 구분된 프로세스 상태들을 거친다. 다양한 이벤트를 만날 때, 프로세스의 상태가 바뀐다. 프로세스가 프로세서에서 실행되고 있으면 실행중이라고한다. 프로ㅔㅅ스가 프로세서에서 실행 가능하면 준비되었다고 한다. 또한 프로세스가 작업을 진행하기에 앞서 입출력 완료 이벤트등의 특정 이벤트 발생을 대기하고 있다면 블록되었다고 한다.


## 3.3 프로세스 관리

운영체제는 프로세스들의 실행 사이에 끼어들면서 프로세스들이 인터럽트 되고 재시작하거나 프로세스 실행완료를 알리는 등 단순한 일을 위해서도 운영체제와 통신할 수 있어야한다. 


### 3.3.1 프로세스 상태와 상태전이

준비리스트에 있는 첫 번째 프로세스에서 프로세서를 할당하는 것을 디스패칭이라고 한다. 디스패처라는 시스템 개체가 이일을 수행한다. 준비상태 또는 실행상태에 있는 프로세스를 깨어있다라고 한다. 프로세서를 차지하려고 활발히 경쟁하는 상태기 때문이다. 운영체제는 시스템에있는 프로세스들을 가장 잘 서비스 할 수 있게 프로세스들의 상태전이르 ㄹ관리한다. 운영체제는 한 프로세스가 우연이든 고의든 시스템의 프로ㅔㅅ서를 독점하는 일을 방지하려고 하드웨어 인터럽팅 클록을 두어, 프로세스가 특정시간 간격 또는 퀀텀 동안 일을 수행할 수 있게한다. 프로세스가 시간이 만료되기 전에 프로세서를 자발적으로 반납하지 않으면, 인터럽팅 클록이 인터럽트를 발생시키며 프로세서에 대한 제어를 운영체제가 갖는다. 그리고 운영체제는 이전에 실행하던 프로세스의 상태를 준비 상태로 바꾸고 , 준비리스트에 있는 맨 처음 프로세스의 상태를 준비상태에서 실행 상태로 바꾼다. 실행 상태에 있는 프로세스가 자신에 주어진 만료 시간 전에 출력 작업을 시작하고, 프로세서를 다시 사용하기 전에 입출력이 완료되기를 대기해야한다면, 자발적으로 프로세서를 반납한다. 

프로세스가 프로세서를 할당받으면 프로세스의 상태가 준비상태에서 실행상태로 변한다. 프로세스가 할당받은 시간이 만료되면 실행상태에서 준비상태로 변한다. 프로세스가 블록되면 실행상태에서 블록상태로 변한다. 마지막으로 대기하던 이벤트가 완료되면 프로세스가 깨어나고 블록상태에서 준비상태로 변한다. 사용자 프로세스가 스스로 일으키는 상태 전이는 블록 상태 뿐이다. 다른 세가지 상태 전이는 운영체제가 일으킨다.

### 3.3.2 프로세스 제어 블록 프로세스 기술자

운영체제는 프로세스를 생성할 때 몇가지 연산을 수행한다 .먼저 운영체제가 각 프로세스를 식별할수 있어야하므로 PID를 부여한다. 그런다음 프로세스 제어블록을 생성해 프로세스를 관리하는데 필요한 정보를 보관한다. PCB는 대체로 다음과 같은 정보를 포함한다.

- PID
- 프로세스 상태
- 프로그램 카운터
- 스케줄링 우선순위
- 퀀한
- 프로세스의 부모 프로세스
- 프로세스의 자식 프로세스 
- 프로세스의 데이터와 명령어가 있는 메모리 위치를 가리키는 포인터
- 프로세스에 할당된 자원들을 가리키는 포인터

PCB는 또한 실행 프로세스가 실행상태에서 빠져나올 때 마지막으로 실행한 프로세서의 레지스터 내용을 저장하기도 한다. 프로세스의 실행 문맥은 아케턱처에 종속적이지만 프로세스의 주소 공간에 대한 포인터를 저장하는 프로세스 관리 레지스터 외에도 범용 레지스터의 내용을 포함하는 것이 보통이다. 

운영체제는 프로세스가 상태 전이를 할 때 해당 프로세스의 PCB안에 있는 상태정보도 갱신해야한다. 운영체제는 각 프로세스의 PCB를 가리키는 포인터를 시스템 전체 혹은 사용자별 프로세스 테이블에 유지해 PCB에 빠르게 접근할 수 있다. 프로세스테이블은 이 책에서 다루는 운영체제의 여러 자료구ㅈ중하나다. 프로세스가 자발적으로든 운영체제에 의해서든 종료하면 운영체제는 프로세스의 메모리와 기타 자원을 해제해 다른프로세스가 사용할 수 있게하고 , 프로세스 테이블에서 해당 프로세스를 제거한다. 다른 프로세스 조작 기능에 관해서도 잠깐 살펴볼 것이다. 

### 3.3.3 프로세스 연산 

운영체제는 다음을 포함하는 프로세스 연산을 수행할 수 있어야한다.

- 프로세스 생성
- 프로세스 소멸
- 프로세스 일시정지
- 프로세스 재시작
- 프로세스의 우선순위 변경
- 프로세스 블록킹 
- 프로세스 깨우기
- 프로세스 디스패치
- 프로세스가 다른 프로세스와 통신할 수 있게하는 일
  

프로세스는 새로운 프로세스를 생성할 수 있다. 이때 프로세스를 생성하는 프로세스를 부모 프로세스라고하고 생성된 프로세스를 자식 프로세스라고한다. 각 자식 프로세스는 정확히 한 부모 프로세스를 통해 생성된다. 이러한 프로세스 생성은 계층적 프로세스 구조를 형성한다. 리눅스와 같은 유닉스 기반 시스템에서는 커널이 메모리에 로드될 때 생성되는 init 프로세스에서 많은 프로세스를 생성한다. 프로세스의 우선순위를 변경하려면  PCB에 있는 우선순위 값을 변경해야한다. 운영체제가 프로세스 스케줄링을 구현한 방법에 따라 PCB를 가리키는 포인터를 놓는 우선순위 큐가 달라진다. 


### 3.3.4 일시정지와 재시작

일시정지는 해당 프로세스 혹은 다른 프로세스에 의해 발생할 수 있다. 단일 프로세서 시스템에서는 실행중인 프로세스가 자신을 일시 정지한다. 일시정지를 발생시킬 다른 프로세스가 동시에 실행될 수 없기 때문이다. 


### 3.3.5 문맥교환

운영체제는 실행중인 프로세스를 멈추고 준비 상태에 있던 다른 프로세스를 실행할 때, 문맥교환을 수행한다. 문맥 교환을 위해서 커널은 먼저 실행중인 프로세스의 실행 문맥을 해당 프로세스의 PCB에 저장한 후 , 이후 실행할 준비 상태 프로세스의 이전 실행 문맥을 PCB에서 읽어 로드한다.  문맥교환은 멀티프로그램 환경에서는 필수적인 것으로 운영체제에 몇가지 도전거리를 준다. 먼저 문맥 교환은 기본적으로 프로세스에 투명해야한다. 즉 프로세스가 자신이 프로세서에서 제거되는 상황을 인식하지 못해야한다. 문맥 교환이 일어나는 동안 프로세서는 의미있는 작업을 전혀 수행할 수 없다. 즉 문맥 교환을 위해 운영체제에 필수적인 작업은 하지만 어떤 프로세스의 명령어도 실행하며 안된다. 문맥교환은 순전히 오버헤드며 매우 빈번하게 발생하므로 운영체제는 문맥교환에 드는 시간을 최소화해야한다. 

운영체제는 PCB에 자주 접근한다. 따라서 효율적으로 문맥 교환을 하기 위해 많은 프로세서에서 현재 실행중인 프로세스의 PCB를 가리키는 하드웨어 레지스터를 포함한다. 



## 3.4 인터럽트 

인터럽트는 소프트웨어가 하드웨어로부터 오는 신호에 반응할 수 있게해준다. 운영체제는 인터럽트 처리기라는 일련의 명령어를 지정해 각 유형의 인터럽트가 발생할 때 실행되게 한다. 이렇게 해서 운영체제는 프로세서에 대한 제어를 가지고 시스템 자원을 관리할 수 있다.

프로세서는 프로세스 명령어를 실행한 결과로 인터럽트를 발생시킬수 있다. 이런 경우를 트랩이라고 하고, 프로세스의 작동과 동기라고 말한다. 예를 들면 인터럽트는 프로세스가 0으로 나눈다거나 보호되는 메모리 위치를 참조하려는 등 잘못된 동작을 하려고 할 때 발생한다. 

또한 프로세스의 현재 명령어와 관련 없는 이벤트에 의해서도 인터럽트가 발생할 수 있다. 이 경우 프로세스 작동과 비동기라고 말한다. 하드웨어 장치들은 프로세서에 상태 변화를 알리기 위해 비동기 인터럽트를 발생시킨다. 예를 들어 사용자가 키보드의 키를 하나 누르면 키보드는 인터럽트를 발생시킨다. 인터럽트는 적은 오버헤드로 프로세서의 주의를 끌 수 있는 방법이다. 인터럽트의 대안으로 프로세서가 각 장치의 상태를 반복적으로 확인하는 방법이있다. 이러한 접근법을 폴링이라고한다. 


> 비동기성대 동기성

이벤트가 프로세스의 수행과 비동기적으로 발생한다는 것은 프로세스의 작동과 무관하게 이벤트가 발생한다는 의미다. 입출력 기능은 실행 프로세스와 병행으로 비동기적으로 발생할 수 있다. 프로세스가 비동기 입출력을 시작하면 해당 프로세스는 입출력 작업이 진행되는 동안에도  실행을 계속할 수 있다. 입출력 작업이 완료 될 때 프로세스에 이 사실이 통지된다. 작업 완료에 대한 통지는 언제라도 올수 있다. 프로세스는 완료 통지를 받았을 때 입출력 완료 인터럽트를 즉시 처리할 수도 있고, 다른 작업을 진행한후 적당한 시간에 처리할 수도 있다. 그러므로 인터럽트는 비동기식 메커니즘으로 인식될 때가 많다. 이에 비해 폴링은 동기메커니즘의 한예이다. 프로세서는 입출력이 완료될 때까지 반복적으로 장치들을 점검한다. 동기 메커니즘은 이벤트가 발생할 떄까지 장치를 재차 테스트하는데 많은 시간을 소비한다. 이에 비해 비동기 메커니즘은 아직 발생하지도 않은 이벤트를 재차 확인하는데 들어가는 시간을 절약하고 다른 작업을 진행해 성능을 향상시킨다.


폴링과 인터럽트의 차이점을 전자레인지와 오븐의 예에서 간단히 찾아볼 수 있다. 요리사는 여러가지 방식으로 접근할 수 있다. 하나는 적정한 시간을 정해 타이머를 맞춰놓을 수 있다. 지정된 시간이 흘러 타이머에서 소리가 나면, 이 소리가 주방장의 주의를 이끈다. 즉, 인터럽트한다. 또 다른 방법으로는 주방장은 오븐에 요리를 하며 주기적으로 오븐의 유리문을 열어다 보면서 음식이 알맞게 익었는지 확인 할수 도 있다. 이렇듯 주기적으로 모니터링하는 것이 폴링의 한예다.

인터럽트 지향 시스템은 과부하가 걸릴 수 도있다. 만약 인터럽트가 너무 빨리오면 시스템이 인터럽트를 모두 처리하지 못할 수도 있다. 예를 들어 사람이 항공 운항을 통제하는 시스템에서는 너무 많은 비행기가 좁은 지역에 모여들면 통제가 어려워진다. 


네트워크 시스템에서는 네트워크 인터페이스가 적은 메모리를 가지고 다른 컴퓨터에서 받은 데이터패킷들을 저장한다. 네트워크 인터페이스는 패킷을 받을 때마다 프로세서에 언터럽트를 발생시켜 처리할 데이터가 준비되었음을 알린다. 만일 프로세서가 인터페이스의 메모리가 차기 전에 네트워크에서 받은 데이터를 처리하지 못한다면 패킷을 잃어버릴 수도 있다. 대부분의 시스템들은 처리할 인터럽트를 저장하는데 큐를 사용한다. 이큐들은 물론 제한된 크기의 메모리를 소비한다. 부하가 많이 걸릴 때는 시스템이 모든 인터럽트를 큐에 저장하기 어려울 수도 있다. 즉 몇몇 인터럽트는 잃을 수도 있다. 


### 3.4.1 인터럽트 처리

이제는 컴퓨터 시스템이 하드웨어 인터럽트를 주로 어떤 방법으로 처리하는지 살펴보자.

1. 인터럽트 라인 (메인보드와 프로세서 사이의 전지적 연결이 활성화) 타이머나 주변장치카드 컨트롤러와 같은 장치들은 이터럽트 라인을 활성화하는 신호를 보내 프로세서에 일정 시간이 지났다거나 입출력 작업이 끝났다는 이벤트를 알려준다. 대부분의 프로세서는 인터럽트들을 우선순위에 따라 정렬해 중요한 인터럽트가 먼저 서비스받도록하는 인터럽트 컨트롤러를 가지고있다. 
2. 인터럽트 라인이 활성화된후, 프로세서는 현재 명령어 실행을 완료하면 현재 프로세스의 실행을 멈춘다. 이때 프로ㅔㅅ서는 후에 해당 프로ㅔㅅ스를 다시 시작할 수 있게 충분한 정보를 저장해야한다. 초기의 IBM 시스템에서는 이런 데이터를 프로그램 상태 워드 Program Status Word 라는 자료구조에 저장했다. 인텔 IA-32 아키텍처에서는 이러한 프로세스 상태를 작업 상태 세그먼트라고 한다. TSS는 대체로 프로세스의 PCB에 저장된다. 
3. 프로세서는 제어권을 적절한 인터럽트 처리기에 넘겨준다. 각 유형의 인터럽트는 프로세서가 인터럽트 벡터의 인덱스로 사용하는 유일한 값을 부여받는다. 인터럽트 처리기를 가리키는 포인터들의 배열이다. 이들은 프로세서들이 접근하지 못하는 메모리 영역에 위치하므로, 프로세스들이 내용을 잘못 변경할 수 없게 되어있다. 
4. 인터럽트 처리기는 인터럽트 유형을 기반으로 적절한 일을 수행한다. 
5. 인터럽트 처리기가 작업을 완료하면 인터럽트된 프로세스의 상태(혹은 커널이 문맥교환을 시작했을 경우는 다음 프로세스)가 복구된다. 
6. 인터럽트된 프로세스가 실행된다. 인터럽트된 프로세스 또는 다음프로세스중 무엇을 실행할지는 운영체제의 책임이다. 이는 중요한 결정으로 각 응용 프로그램이 서비스를 받는 수준에 큰 영향을 미친다. 이에 관해서는 8장 프로세서 스케줄링에서 다룬다. 예를 들어 인터럽트가 입출력 완료 이벤트 신호를 보내면, 우선순위가 높은 프로세스가 블록상태에서 준비상태로 바뀌고, 운영체제가 인터럽트된 프로세스를 선점해 프로세스를 우선순위가 높은 프로세스에 할당할 수도 있다. 

인터럽팅 클록은 일정한 시간 간격마다 인터럽트를 발생시켜 운영체제가 프로세스스케줄링과 같은 시스템 관리 기능을 수행하도록한다. 이경우 프로세서는 프로세스 p1을 실행하고있다. 이때 인터럽트를 생성한다. 인터럽트를 받자 프로세서는 타이머 인터럽트에 해당하는 인터럽트 벡터 엔트리에 접근한다. 그후 프로세서는 프로세스의 실행 문맥을 메모리에 저장해, 인터럽트 처리기가 실행될 때 P1의 실행 문맥을 잃지 않게한다. 그리고 프로세서는인터럽트 처리기를 실행해 인터럽트에 적절한 반응을한다. 그후 인터럽트 처리기는 이전에 실행하던 프로세스의 상태를 복구하거나 운영체제 ㅍ로세서 스케줄러를 호출해 다음 프로세스를 실행한다. 이경우 처리기가 프로세스 스케줄러를 호출하고 스케줄러는 대기중인 프로세스중 우선순위가 가장 높은 프로세스 p2가 프로세서를 차지하게 하고 있다. 그후 PCB에서 프로세스 P2의 문맥을 로드하고 프로세스 p1의 실행문맥을 메인메모리에있는 P1의 PCB에 저장한다.

### 3.4.2 인터럽트 클래스

컴퓨터가 지원하는 인터럽트 집합은 시스템 아키텍처에 따라 다르지만 몇가지 인터럽트 유형은 많은 아키테처에서 공통으로 지원한다. 프로세서가 받을 수 있는 신호를 인터럽트와 예외 두가지로 구분한다. 인터럽트는 프로ㅔㅅ서에 이벤트가 발생했거나 외부 장치의 상태가 변경되었음을 알려준다. IA-32 아키텍처는 또한 소프트웨어 생성 인터럽트를 제공한다. 프로세스는 소프트웨어 생성 인터럽트를 사용해 시스템 호출을 수행한다. 예외는 하드웨어나 소프트웨어의 명령어의 실행 결과가 오류가 발생했음을 알려준다. IA-32 아키텍처는 코드의 중간점에 도달할 때 예외를 사용해 프로세스를 멈추기도한다. 

인터럽트를 발생시키는 장치들은 프로세서에ㅅ는 외부 개체들이다. 이러한 인터럽트들은 실행되는 명령어들과 무관하게 발생하므로 실행중인 프로세스와 비동기적이다. 한편 시스템 호출과 같은 소프트웨어 생성 인터럽트들은 소프트웨어의 특정 명령어 때문에 인터럽트가 생성되므로 실행중인 프로세스와동기적이다. 다음은 IA-32 아키텍처에서 인식하는 몇가지 인터럽트 유형이다.

- 입출력: 입출력 하드웨어에서 발생하는 인터럽트이다. 입출력 인터럽트는 프로세서에 채널이나 장치의 상태가 변한 사실을 알려준다. 예를 들면, 입출력 인터럽트는 입출력 작업이 완료될 때 발생한다.
- 타이머: 시스템은 주기적으로 인터럽트를 발생시키는 장치를 가질수 ㅣㅇㅆ다. 이러한 인터럽트는 시간을 점검하거나 성능 모니터링 임무 등에 사용할 수 있다. 운영체제는 타이머를 통해 프로세스들의 퀀텀이 다 되었는지 확인할 수 있다. 
- 프로세서: 이유형의 인터럽트느 ㄴ멀티 프로세서 시스템에서 한 프로세서가 다른 프로세서에 메시지를 보낼 수 있게 해준다.

IA-32 명세는 예외를 폴트 트랩 또는 중단으로 분류한다 폴트와 트랩은 예외 처리기가 프로세스들의 실행을 지속할 수 있도록 허용하는 예외다. 폴트는 예외처리기가 수정할 수 있는 오류를 말한다. 예를 들어, 페이지 폴트는 프로세스가 메모리에 없는 데이터에 접근하려고 할 때 발생한다. 운영체제는 요청된 데이터를 메인 메모리에 놓음으로써 이 문제를 해결할 수 있다. 문제를 해결하고 난 후에는 프로세서가 프로세스의 오류를 유발한 명령어에서부터 다시 실행한다.

폴트: 폴트는 프로그램의 기계어 명령어가 실행될 때 발생하는 넓은 범위의 문제 때문에 발생한다. 이런 예로는 0으로 나누려하거나 처리중인 데이터의 포맷이 잘못되었거나 유효하지 않은 코드를 실행하거나 실제 메모리의 한계를 넘어서는 메모리의 위치 참조, 사용자 프로세스가 특권 명령어를 실행하거나, 보호되는 자원에 접근하려고하는 일등이 포함된다.

트랩: 트랩은 오버플로우 (레지스터에 저장된 값이 레지스터의 용량을 초과하는 것)와 같은 예외 때문에 발생하거나 프로그램 제어권이 코드의 중단점에 도달할때 발생한다.

중단: 중단은 프로세서가 프로세스가 극복해낼수 없는 오류를 탐지할 때 발생한다. 예를 들어 예외처리 루틴 자체가 예외를 발생시킬때 프로세서가 두가지 오류를 순차적으로 처리할 수 없을 때 발생한다. 이를 이중 폴트 예외라고 하며, 예외를 발생시킨 프로세스가 종료된다.

중단은 하드웨어 오류와 같이 프로세스나 시스템조차 복구할 수 없는 오류와 관련이있다.ㅇ ㅣ경우 프로세서가 프로세스의 실행문맥을 저장함을 보장할 수 없다. 그 결과 운영체제는 중단을 일으킨 프로세스를 중도에 종료하는 경우가 많다.

대부분의 아키텍처와 운영체제는 인터럽트에 우선순위르 ㄹ부여한다. 어떤 인터럽트는 다른것보다 즉각적인 조치를 요구하기 때문이다. 예를 들면 하드웨어 오류는 입출력 완료 이벤트에 반응하는 일보다 중요하다. 인터럽트 우선순위는 하드웨어와 소프트웨어 모두를 통해 구현할 수 있다.예를 들어 프로세서는 현재 처리하고 있는 인터럽트보다 우선순위가 낮은 인터럽트를 블록하거나 큐에 저장할 수 있다. 때로는 인터럽트에 신속하게 반응하고 인터럽트된 프로세스들에 제어를 돌려 주는 일은 자원 사용을 극대화하고 상호작용성을 높이는데 필수적이다. 그러므로 대부분의 프로세서들은 커널이 인터럽트 유형을 비활성화(마스크) 하도록 한다. 그러면 프로세서는 비활성화된 유형의 인터럽트들을 무시하고 해당 유형의 인터럽트가 다시 활성화 될때까지 보류 인터럽트 큐에 저장한다.


## 3.5 프로세스간 통신 InterProcess Communication

멀티 프로그래밍 네트워크 환경에서는 프로세스들이 서로 통신하는 일이 흔히 일어난다. 많은 운영체제에서 프로세스간 통신 interprocess communication 메커니즘을 제공한다. 예를 들면 텍스트 에디터가 문서를 프린터 스쿨러에 보낼 수 있게 하거나 웹 브라우저가 원격 서버에서 데이터를 조회할 수 있게한다. 또한 프로세스 간 통신은 공통의 목적을 달성하려고 서로 협력 해야하는 프로세스들에 필수적이다. 리눅스에서의 사례연구를 통해 리눅스 운영체제에서  IPC를 구현한 방법을 살펴본다.


### 3.5.1 신호

signal 은 프로세스에 이벤트가 발생했음을 알리는 소프트웨어 인터럽트이다.신호는 앞에서 논의한 다른 IPC 메커니즘과 달리, 프로세스들이 다른 프로세스와 교환할 데이터를 명시할 수 있게 하지 않는다. 시스템의 신호는 운영체제와 특정 프로세서에서 지원하는 소프트웨어 생성 인터럽트에 따라 달라진다. 

운영체제는 신호가 발생할 때 먼저 해당 신호를 받을 프로세스와 해당 프로세스가 신호에 반응할 방법을 결정한다.

프로세스는 신호를 잡아내거나 무시하거나 마스크할 수 있다. 프로세스는 신호를 전달할 때 운영체제가 호출하는 루틴을 정함으로써 신호를 잡는다. 프로세스는 신호를 무시할 수 있다. 이 경우 프로세스는 신호 처리를 위한 운영체제의 기본 동작에 의존한다. 공통적인 기본 동작은 중단으로 abort 프로세스를 즉시 종료한다. 다른 공통적인 기본 동작은 메모리 덤프이다. 중단과 비슷하게 메모리 덤프를 할 때 프로세스가 종료하지만, 그전에 프로세스가 코어파일을 만든다. 코어 파일은 디버깅에 유용한 프로세스의 실행 문맥과 주소 공간의 데이터를 담고있다. 세번째 동작은 신호를 그냥 무시하는 것이다. 그외의 기본 동작은 프로세스를일시 정지하고, 이어서 재시작하는 것이다. 

프로세스는 마스킹을 통해 신호를 막을 수도 있다. 프로세스가 특정 유형의 신호 예를들면, 일시정지 신호를 마스크하면 운영체제는 프로세스가 이 시그널 마스크를 없앨 때까지 해당 유형의 신호를 전달하지 않는다. 프로세스들은 대개 특정 시그널을 처리하고 있을 때 같은 유형의 시그널들을 블록한다. 마스크된 인터럽트와 유사하게 운영체제의 구현에 따라 마스크된 신호를 잃을 수도 있다.

### 3.5.2 메시지 전달

분산 시스템이 크게 증가하면서 메시지 기반 프로세스 간 통신에 대한 관심도 커졌다. 

메시지는 한번에 한방향으로 보낼 수 있다. 어떤 메시지든 한 프로세스가 송신자가 되고 다른 하나는 수신자가 된다. 메시지 전달이 양방향으로 일어날 수도 있다. 즉 각 프로세스가 프로세스간 통신에서 전송자인 동시에 수신자로 동작할 수 있다. 블로킹 송신은 수신자가 메시지를 수신할 때까지 기다려야하고, 수신자가 메시지를 수신하면 이 사실을 송신자에게 알려주도록 요구한다. 넌 블로킹 송신은 송신자가 수신자로부터 메시지를 받지 않았을 때도 작업을 계속할 수 있는 전송 방식이다. 이를 위해서는 수신자가 메시지를 모두 수신할 때까지 메시지를 보유할 수 있는 메시지 버퍼링 메커니즘이 필요하다. 블록킹 송신은 동기통신, 넌블로킹 송신은 비동기 통신의 예이다. 

넌블로킹 송신을 사용해 비동기 통신을 하면 프로ㅔㅅ스들이 대기하는 시간이 감소하므로 처리량을 늘릴 수 있다 .예를 들어 송신자는 바쁘게 작업중인 프린터에 정보를 보낼 수 있다. 시스템은 프린트 서버가 수신 준비가 될때까지 이 정보를 버퍼에 저장할 수 있다. 따라서 송신자는 프린트 서버를 기다릴 필요 없이 작업을 계속 진행할 수 있다.

메시지를 보낸게 전혀 없으면 블록킹 수신 호출은 수신자가 기다리게 만든다. 블록킹 수신 호출은 수신자가 다음 수신을 시도하기 전에 다른 처리를 계속할 수 있게해준다. 

잘 알려진 메시지 전달 구현은 파이프이다. 파이프는 운영체제에서 보호하는 메모리 영역으로 버퍼 역할을 해 프로세스 둘 이상이 데이터를 교환할 수 있게 해준다. 운영체제는 버퍼에 대한 접근을 동기화한다. 프로세스가 데이터를 읽을 때 해당 데이터는 파이프에서 지워진다. 리더가 버퍼에서 읽는 작업을 마치면 운영체제는 리더의 실행을 중지하고 데이터가 버퍼에 데이터를 쓰게한다. 분산시스템에서는 전송에 오류가 생기거나 심지어 데이터를 잃어버릴 수도 있다. 그리므로 송신자와 수신자는 각각의 데이터 전송이 적절히 이루어지는지 확인할 수 있게 승인 프로토콜을 사용하는 것이 보통이다. 수신자로부터 승인메시지를 기다리는 송신자는 타임아웃 메커니즘을 사용할 수도 있다. 송신자는 타임아웃이 되도록 승인이 도착하지 않으면 메시지를 재전송할 수 있다. 이러한 재전송 기능을 갖춘 메시지 전달 시스템은 새로운 메시지들을 일련번호를 통해 식별할 수 있다. 수신자는 이 번호들을 검사해 모든 메시지를 주고 받았는지 확인하며, 순서가 맞지 않는 메시지들은 번호를 다시 매긴다. 만약 승인 메시지를 잃어버려 송신자가 재전송을 결정하면, 재전송된 메시지에는 원래 전송되었던 메시지와 똑같은 일련번호를 부여한다. 

분산 시스템에서 메시지 전달이 복잡한 이유중 하나는 특정 프로세스를 명시한 메시지를 송수신할 때, 올바른 프로세스를 대상으로 명시적인 send/receive 호출을 하도록 모호하지 않은 프로세스 이름을 지어야한다는 점이다. 프로세스를 생성하고 소멸할 때 중앙 집중화된 명명 메커니즘과 연결할 수도 있지만, 이렇게 하면 개별 시스템이 새 이름을 사용할 때마다 허가를 받아야 하므로 상당한 통신 부하가 생긴다. 분산 시스템에서 메시지 기반 통신은 심각한 보안 문제를 야기한다. 그 중하나가 인증 문제이다. 송수신자는 자신이 통신하는 대상이 데이터를 훔치거나 손상시키려는 사기꾼이 아닌지 알 방법이 없다. 

## 3.6 사례 연구: 유닉스 프로세스

유닉스와 유닉스 기반 운영체제는 여러 운영체제에서 빌려온 프로세스 구현을 제공한다. 

각 프로세스는 실행중에 자신의 코드와 데이터 스택을 메모리에 저장해야한다. 실제 메모리 시스템에서는 프로세스들이 물리적 주소를 참조해 이러한 정보의 위치를 찾아낼 것이다 . 각 프로세스를 위한 유효한 메인 메모리 범위는 메인 메모리 크기와 다른 프로세스들이 소비한 메모리 용량에 따라 결정된다. 유닉스는 가상 메모리를 구현하므로 모든 유닉스 프로세스는 가상 주소 공간이라는 일련의 메모리 주소를 제공받으며, 프로세스들은 여기에 정보를 저장할 수 있다. 가상 주소 공간은 텍스트 영역과 데이터 영역, 스택 영역을 포함한다.

커널은 프로세스의 PCB를 사용자 프로세스가 접근할 수 없는 보호된 메모리 영역에 유지한다. 유닉스 시스템에서는 PCB에 프로세서 레지스터의 내용과 프로세스 식별자, 프로그램카운터, 시스셑ㅁ 스택등의 정보를 저장한다. 모든 프로세스의 PCB는 프로세스 테이블에 리스트되고, 이때문에 운영체제가 모든 프로세스의 정보에 접근할 수 있다. 

유닉스 프로세스들은 시스템 호출을 통해 운영체제와 상호 작용한다. 프로세스는 부모 프로세스의 사본을 생성하는 fork 시스템 호출을 통해 자식 프로세스를 생성할 수 있다. 자식 프로ㅔㅅ스는 부모 프로세스의 데이터와 스택 세그먼트, 기타 자원들의 사본을 받는다. 텍스트 세그먼트는 부모의 읽기 전용 명령어를 포함하는 것으로 자식 프로세스와 공유된다. fork호출 즉시 부모와 자식 프로세스가 동일한 데이터와 명령어를 갖게된다. 이는 부모나 자식 프로세스중 하나가 자신을 구별하지 않는 한 두 프로세스가 동일한 작업을 수행함을 의미한다. 프로세스는 exec 함수를 호출해 파일로부터 새로운 프로그램을 로드할 수 있다. exec 함수는 종종 자식 프로세스가 생성된 직후 수행된다.    

- fork: 자식 프로세스를 생성하고부모 프로세스 자원의 사본을 할당.
- exec: 파일에 있는 프로세스의 명령어들과 데이터를 그 주소 공간에 로드한다.
- wait: 자식 프로세스들이 종료되기까지 호출하는 프로세스가 블록되게 한다.
- signal: 프로세스가 특저 유형의 신호를 위한 신호 처리기를 지정하게 한다. 
- nice : 프로세스의 스케줄링 우선순위를 수정한다. 