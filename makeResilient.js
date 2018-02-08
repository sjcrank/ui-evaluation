function makeResilient(object){

    var prop,
        val;
    for (prop in object){
        val = object[prop];
        if (typeof val == "function"){
            object[prop] = function(val){
                return function(){
                    try {
                        return val.apply(this, arguments);
                    } catch (ex) {
                        console.log("Exception caught:  "+ ex.message);
                    }
                };

            }(val);
        }
    }
    return object;
}

let view = {
    name: 'test view',
    render: function(options) {
      console.log('message = ' + options.message);
    }
  };
  
let modifiedView = makeResilient(view);
console.log(modifiedView.name);
modifiedView.render(null);
