# FlatList

FlatList는 RN 에서 제공하는 코어 컴포넌트입니다.

컴포넌트를 여러개 렌더링 할 때는 FlatList 코어 컴포넌트를 활용하는 것이 속도가 빠릅니다.

```ts
import { FlatList } from 'react-native'
```

FlatList는 data라는 속성을 제공하고, renderItem 이란 속성을 제공하므로 아래와 같이 구현합니다.
```ts
<FlatList
  data={person}
  renderItem={(item) => <Person person={item}/>}
  keyExtractor={(item, index) => item.id}
  itemSeparatorComponent={() => <View style={styles.itmeSeparator}></View>}
/>
```

타입스크립트 관점에서 타입 T의 배열 T[] 타입 데이터를 data속성에 설정하려면 renderItem 에는 ({item}:{item: T}) => {} 즉 , T 타입 데이터이며 item 이란 이름의 속성이 있는 객체를 매개변수로 하는 콜백 함수를 설정합니다.

keyExtractor 속성에는 item 과 index값이 매개변수인 콜백함수를 지정해서 renderItem 에 설정한 콜백함수가 반환하는 컴포넌트의 key 속성에 설정할 값을 얻습니다.

추가로 itemSeparatorComponent 속성은 이 콜백함수가 반환하는 컴포넌트를 아이템과 아이템간의 구분자 역할을 하는 컴포넌트로 삽입합니다. 