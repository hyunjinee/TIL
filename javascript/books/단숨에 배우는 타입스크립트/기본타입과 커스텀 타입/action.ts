// export class SearchAction {
//   actionType = "SEARCH"
//   contructor(readonly payload: {searchQuery: string}) {}
// }

// export SearchSuccessAction

interface Rectangle {
  kind: "rectangle"
  width: number
  height: number
}

interface Circle {
  kind: "circle"
  radius: number
}

type Shape = Rectangle | Circle

function area(shape: Shape): number {
  switch (shape.kind) {
    case "rectangle":
      return shape.width * shape.height
    case "circle":
      return shape.radius * shape.radius * Math.PI
  }
}
