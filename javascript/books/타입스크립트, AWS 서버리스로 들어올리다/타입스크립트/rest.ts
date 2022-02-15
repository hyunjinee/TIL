function cities(name: string , ...restName: string[]) {
    return name + "," + restName.join(",");
}


let ourCities = cities("서울", "대전", "대구", "부산");
console.log(ourCities);