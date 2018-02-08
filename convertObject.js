function convertObject(obj) {
    var arr=[];
    for(key in obj) {
        var val = obj[key];
        if(val !== null) {
            val = val.toString().trim();
            if(val !== '') {
                arr.push(val);
            }
        }

    }
    return arr.sort();
}

console.log(convertObject({ a: 'hello', b: 'Everyone', c: 53, d:' ', e: null }));
