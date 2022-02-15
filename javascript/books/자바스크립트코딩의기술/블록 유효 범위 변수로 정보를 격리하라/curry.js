function  addClick(items) {
    for (var i = 0;  i < items.length; i++) {
        items[i].onClick = (function(i){
            return function () {
                return i;
            }
        })(i)
    }
}