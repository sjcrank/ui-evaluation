# UI Developer Technical Evaluation

### JS Questions

#### 1.
Implement a JavaScript function "convertObject()" with this functionality:
- accepts a single parameter "obj" which is a plain JavaScript object having 0 or more properties
- all properties of "obj" will have values which are strings or numbers or null
- convertObject should return an array, where each element is the value of one of the properties of "obj"
- do not include any "obj" properties with null values, empty string values, or whitespace-only values
- convert any "obj" number values to strings before inserting into the array
- sort elements of the array in case-insensitive alphabetical order
- return the array

#### Sol 1.

function convertObject(obj) {
  var resArr = [];

  for(let item in obj) {
    if(obj[item] !== null && (/\S/.test(obj[item]))){
      if(typeof obj[item] === 'number' ){
          obj[item] = obj[item].toString();
        }
      resArr.push(obj[item]);
    }
  }

  return resArr.sort((a,b) =>{
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    }
  );
}

Usage example:
```
convertObject({ a: 'hello', b: 'Everyone', c: 53, d: ' ', e: null });
// returns [ '53', 'Everyone', 'hello' ]
```

#### 2.
Implement a JavaScript function "makeResilient()" with this functionality:
- accepts a single parameter "view" which is a plain JavaScript object having various properties, including a function "view.render()" which may take any number of parameters
- returns an object that has the same properties as "view", except that its "render()" calls "view.render()" inside a try/catch block and writes any caught errors to the console

#### Sol 2.
function makeResilient(view) {  
  let modifiedView = Object.assign({}, view);
  delete modifiedView.render;
  modifiedView.render = function(options) {
    try {
      view.render(options);
    }
    catch(err) {
      console.log(err);
    }
  }
  return modifiedView;
}

Usage example:
```
let view = {
  name: 'test view',
  render: function(options) {
    console.log('message = ' + options.message);
  }
};

let modifiedView = makeResilient(view);
console.log(modifiedView.name); // test view
modifiedView.render({ message: 'hello world' }); // hello world
modifiedView.render(null); // error is printed to console
```

#### 3.
Summarize the differences between using Promises and Callbacks for asynchronous code (calling REST APIs is a common asynchronous task). What are some considerations that are relevant in determining which approach is most appropriate for a given situation?

As an example, the SuperAgent library (http://visionmedia.github.io/superagent/#request-basics) provides support for both approaches, .then() for Promises or .end() for Callbacks.

#### Sol 3.
Promise is an object that represents the eventual completion or rejection (failure) of an asynchronous operation, and its resulting value.  You can set callbacks on it, which will be invoked when the value is ready to be read. Promises are  more composeable, easy to read and understand. Promises uses .then() method for chaining which makes it east to follow the code. With promises, you know that an exception which escapes one callback function will be caught and passed to the error handler you provided with .error() or .catch().

A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. if there are multiple callbacks then the chaining is hard to read due to lot of nesting and to undersntad the code. With callbacks, how an exception gets handled may depend entirely on which of the many nested callbacks threw it, and which of the functions taking callbacks has a try/catch in its implementation. 
### CSS Questions

#### 1.
Given the following structure:
```
<div style='border: 1px solid #000;'>
  <span style='width: 30px; background: #ff0000; display:inline-block;'>R</span>
  <span style='width: 30px; background: #0000ff; display:inline-block;'>B</span>
</div>
```
How many different ways can you style the blue span so that it is right-aligned within its parent div?

Which approach would you recommend?
1. One way to do is absolute position it to the right. As mentioned in the question that it needs to be in the parent div which will require to set some hard widths and 'right' property to make sure it stays within the parent div. The reason is that the absolute position elements are out of the document flow and can't decide how to wrap with other elements.
#blueSpan {
  position:absolute;
  //right: 40px; // to make sure it is inside the parent div
} 
2. Float property to set it to right. But in case of wrapping the elements for smaller screen, it won't do a great job either.
 #blueSpan {
  float: right;
} 

3. Flexbox -  By making the parent as flex container with display: flex;  flex-grow: 1; to redSpan, it can push the blueSpan all the way over to the right. Flex containers can wrap with flex-wrap: wrap. This way on differnt media screen it will wrap properly.

 div {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  }
  div > span {
    white-space: nowrap;
  }
  #redSpan {
    flex-grow: 1;
  } 
 
 Preference -> Flexbox, then Float.

#### 2.
Provide HTML and CSS that shows <input type='radio'/> radio buttons in 3 states: unchecked, checked, and disabled. The radio buttons should have a custom style (not the browser default style), as follows:
- 14 px diameter outer circle with background #ffffff, border color #aaabac
- when checked, 6px diameter inner circle with background #1e8bd1
- when disabled, outer circle has background #f0f0f0

See the "radio-buttons.png" image for an example
#### Sol2.
#### HTML =>

 <div>
  <input type="radio" id="checked" name="radio-group" checked>
  <label for="checked">Checked</label>
  <input type="radio" id="unchecked" name="radio-group">
  <label for="unchecked">Unchecked</label>
  <input type="radio" id="disabled-input" name="radio-group" disabled>
  <label for="disabled-input">Disabled</label>
</div>
#### CSS =>

div label {
   font-family: Verdana, Arial, Helvetica, sans-serif;
}
input {
  position: absolute;
  left: -9999px; 
}
label {
  position: relative;
  padding: 0 15px 0 25px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}
label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #aaabac;
  border-radius: 100%;
  background: #fff;
}
label:after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: #1e8bd1;
  top: 6px;
  left: 6px;
  border-radius: 100%;
}
input:not(:checked) + label:after {
  opacity: 0;
}

input:checked + label:after {
  opacity: 1;
}

input:disabled + label:before {
  background: #f0f0f0;
}

### React Questions

#### 1.
Given the following React component:
```
const List = props => {
    return (
        <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>
    );
};
```
#### Sol 1.
const List = props => {
  var items = props.data.map((item) =>
    <li onClick={props.selectItem}>{item}</li>
 );
  return (<ul>{items}</ul>);
};

P.S. :- I am not familiar with React so after reading up online, one of the way we could solve this is mentioned above.

Provide a modified version which is able to accepts these properties:
```
List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    selectItem: PropTypes.func,
};
```

The modified List component should display each props.data array element as a li within the ul (remove the hardcoded li elements from the above example).

The List component should also respond to click events on li elements by calling props.selectItem(), passing in the text content of the clicked list element.
