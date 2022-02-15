function addClick(itmes) {
    for (var i =0 ; i< itmes.length; i++) {
        itmes[i].onClick = function() {
            console.log(i)
            return i;
            
        }
    }
    return itmes;

}

const example = [ { }, {}];
const clickSet = addClick(example)
clickSet[0].onClick()