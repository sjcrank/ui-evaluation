# UI Developer Technical Evaluation

Help us evaluate your ability to contribute to the development of the Mist web-based front end.

You may not be familiar with some of the concepts required for this evaluation (Github usage, React.js framework, etc) - feel free to use online resources to learn & discover the best way to answer each question. We do request that you not ask other people to answer the questions for you.

### How to Submit the Evaluation

Please fork this repository, add your answers directly in this README file, include any separate source files needed, and submit a pull request when you are done.

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

Usage example:
```
convertObject({ a: 'hello', b: 'Everyone', c: 53, d: ' ', e: null });
// returns [ '53', 'Everyone', 'hello' ]
```

Answer 1:
function convertObject(obj) {
  var result = [];

  for(var prop in obj) {
    if(obj.hasOwnProperty(prop) && obj[prop] !== null && /\S/.test(obj[prop])) {
      if(typeof obj[prop] === 'number'){
          obj[prop] = obj[prop].toString();
        }
      result.push(obj[prop])
    }
  }

  return result.sort(function(a,b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if( a == b) return 0;
    return a < b ? -1 : 1;
  });
}



#### 2.
Implement a JavaScript function "makeResilient()" with this functionality:
- accepts a single parameter "view" which is a plain JavaScript object having various properties, including a function "view.render()" which may take any number of parameters
- returns an object that has the same properties as "view", except that its "render()" calls "view.render()" inside a try/catch block and writes any caught errors to the console

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
Answer 2:
function makeResilient(view) {
  var modifiedView = {};

  for(var prop in view) {
    if(view.hasOwnProperty(prop) && prop !== 'render') {
      modifiedView[prop] = view[prop];
    }
  }

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


#### 3.
Summarize the differences between using Promises and Callbacks for asynchronous code (calling REST APIs is a common asynchronous task). What are some considerations that are relevant in determining which approach is most appropriate for a given situation?

As an example, the SuperAgent library (http://visionmedia.github.io/superagent/#request-basics) provides support for both approaches, .then() for Promises or .end() for Callbacks.

Answer 3:
The main difference between a Promise and a Callback is the syntax. Callbacks are just functions passed to another functions for later execution. Promises internally use callbacks to resolve/reject. So Promise is just something that is simpler to write and understand to do similar asynchronous tasks. Callbacks create something called the Callback Hell when there are a lot of dependent asynchronous tasks to be done. It becomes untidy and difficult to understand. This is where Promises excel. They have a very clean and easy to read syntax. They can be essentialy chained one after the other with interdependent tasks. Promises can only be used for asynchronous purposes, whereas Callbacks can be used for both synchronous and asynchronous. A promise is fulfilled only once for a task whereas Callbacks can be called multiple times. Another advantage of Promise is its methods. then() gives a very logical way of waiting for a Promise to return and the Promise has inbuilt error handling method wher we can reject and pass on the error to the Promise invocation. In a Callback this has to be done manually and in a series of callbacks it becomes difficult to know the error throwing function.

For most of the scenarios in modern day, it is always better to use Promises for all asynchronous taks. Some scenarios where a callback might be better is something like a eventlistener, where you do a particular task on every occurence. Also some of the older browsers might not support Promises very well, there we might want to restict ourselves to Callbacks. This might not be a case going forward as all modern browsers have support for Promises.

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

Answer 1:
The following are some of the approaches where we can change the style of only the blue span:
1.) float: right;
2.) position: absolute; right: 8px;
3.) margin-left: calc(100% - 64px);

The best approach is the first one as float does the right align without any absolute values to be provided.
P.S. - There can be some more approaches if we are allowed to change styles of the other span and parent. Eg: text-align: right on the parent.


#### 2.
Provide HTML and CSS that shows <input type='radio'/> radio buttons in 3 states: unchecked, checked, and disabled. The radio buttons should have a custom style (not the browser default style), as follows:
- 14 px diameter outer circle with background #ffffff, border color #aaabac
- when checked, 6px diameter inner circle with background #1e8bd1
- when disabled, outer circle has background #f0f0f0

See the "radio-buttons.png" image for an example

Answer 2:

HTML
<div>
  <input type="radio" id="test1" name="radio-group" checked>
  <label for="test1">Checked</label>
  <input type="radio" id="test2" name="radio-group">
  <label for="test2">Unchecked</label>
  <input type="radio" id="test3" name="radio-group" disabled>
  <label for="test3">Disabled</label>
</div>

CSS
input {
  opacity: 0;
  display: inline-block;
}

label {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  display: inline-block;
  color: #666;
}

label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #aaabac;
  border-radius: 100%;
  background: #fff;
}

label:after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background: #1e8bd1;
  top: 5px;
  left: 5px;
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

Provide a modified version which is able to accepts these properties:
```
List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    selectItem: PropTypes.func,
};
```

The modified List component should display each props.data array element as a li within the ul (remove the hardcoded li elements from the above example).

The List component should also respond to click events on li elements by calling props.selectItem(), passing in the text content of the clicked list element.

Answer 1:
I am not familiar with React. But on some quick reading through the docs, the modified version could look like the following -

const List = props => {
  const items = props.data.map((item) =>
    <li onClick={props.selectItem}>{item}</li>
  );

  return (
      <ul>{items}</ul>
  );
};

P.S. - Here the selectItem function can access the text content by having an 'event' argument and calling the 'event.currentTarget.textContent'