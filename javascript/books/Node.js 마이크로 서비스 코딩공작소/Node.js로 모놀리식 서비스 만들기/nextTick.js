function func(callback) {
    process.nextTick(callback, "callback!!")

}

try {
    func((param)=> {
        a.a = 0;
    })
} catch (error) {
    console.log('exception!!')
}

// process.nextTick 함수는 비동기 처리를 위해 노드내부의 스레드 풀로 다른 스레드 위에서 콜백함수를 동작한다.
// trycatch문은 같은 스레드 위에서만 동작하기 때문에 서로 다른 스레드 간으 예외 처리가 불가능하다. 