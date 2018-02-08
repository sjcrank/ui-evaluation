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

Answer:
Here is the solution, also added source files to **convertObject.js** file as part of the pull 
request
```
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
//prints to the console the following output [ '53', 'Everyone', 'hello' ]
```

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
Answer:
Here is the solution, also added source files to **makeResilient.js** file as part of the pull 
request
```
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
```
#### 3.
Summarize the differences between using Promises and Callbacks for asynchronous code (calling REST APIs is a common asynchronous task). What are some considerations that are relevant in determining which approach is most appropriate for a given situation?

As an example, the SuperAgent library (http://visionmedia.github.io/superagent/#request-basics) provides support for both approaches, .then() for Promises or .end() for Callbacks.

Answer:
```
1. Callbacks and promises both are used for asynchronous operations in javascript. Promises are not callbacks instead it returns a promise object and promises are easy to understand and maintain.
2. Callbacks becomes more complicated to handle when there are multiple/nested callback. Tough to handle errors, when any of the function fails or throws error.
3. Callbacks are usually passed as a function parameter which is intended to be called after completion of a task. 
4. Promises in javascript are objects. The two common methods in a promise object are "then" and "error". 
5. It is most appropriate to use promises when there are multiple asynchronous function calls to be executed. 
6. Promises gives the ability to write asynchronous code with flat indentation and a single exception channel, which makes easier to handle errors if any of the nested callback fails/throws error.
7. **Promises** functionality can also be achieved using **callbacks** but nesting callbacks inside another callback makes it difficult to propagate errors from the inner methods. This problem is often referred to as callback hell which results in spaghetti code also harder to debug. Promises provides an other method called as "Promise.all" which lets you execute multiple promise calls . Promises provide a better way of error handling. Errors can be caught in a chained method called Promise.error which can be part of the promise chain. In short a Promise is a syntactic improvement for callbacks.
```


### CSS Questions

#### 1.
Given the following structure:
```
<div style='border: 1px solid #000;'>
  <span style='width: 30px; background: #ff0000;'/>
  <span style='width: 30px; background: #0000ff;'/>
</div>
```
How many different ways can you style the blue span so that it is right-aligned within its parent div?

Which approach would you recommend?

Answer: 
Here is the solution, also added source files to **css_answer_1** directory as part of the pull 
request
```
<div style='border: 1px solid #000;'>
  <span id="redSpan" style='width: 30px; background: #ff0000;'> redSpan </span
  <span id="blueSpan" style='width: 30px; background: #0000ff;'/> blueSpan </span>
</div>

//1st Solution
div {
  position: relative;
}

#blueSpan {
  position: absolute;
  right:0px;
  padding-right:30px;
}

//2nd solution

#blueSpan {
float:right;
padding-right: 30px;
}

Element with **Position:absolute** will break the normal document flow and when regarding normal elements, absolute positioned element is completely ignored

Using **Float: right**, element is placed right to the parent div and it does not break the normal document flow. So, in this scenario, it is better to use **floats**.

```



#### 2.
Provide HTML and CSS that shows <input type='radio'/> radio buttons in 3 states: unchecked, checked, and disabled. The radio buttons should have a custom style (not the browser default style), as follows:
- 14 px diameter outer circle with background #ffffff, border color #aaabac
- when checked, 6px diameter inner circle with background #1e8bd1
- when disabled, outer circle has background #f0f0f0

See the "radio-buttons.png" image for an example

Answer:
Here is the solution, also added source files to **css_answer_2** directory as part of the pull 
request
CSS Code
```
body{
    background-color:white;
  }
  /* The container */
  .radContainer {
    display:inline-block;
    position: relative;
    padding-left: 18px;
    margin-left:10px;
    cursor: pointer;
    font-size: 14px;
  }
  
  /* hide the default radio button */
   input {
    display:none;
  }
  
  /* custom radio button */
  .radioButton {
      position: absolute;
      top: 0;
      left: 0;
      border:1px solid #aaabac;
      background-color: #fff;
      border-radius: 8px;
      height: 14px;
      width: 14px;
  }
  
  
  /* hide the inner circle when not checked */
  .radioButton:after {
      content: "";
      position: absolute;
      display: none;
  }
  
  /* Style the inner circle */
  .radContainer .radioButton:after {
       top: 4px;
      left: 4px;
      width: 6px;
      height: 6px;
      border-radius: 3px;
  }
  
  /* inner circle when checked */
  .radContainer input:checked ~ .radioButton:after {
      display: block;
      background-color: #1e8bd1;
  }
  
  /* inner circle when disabled */
  .radContainer input:disabled ~ .radioButton  {
      background-color: #f0f0f0;
      cursor:default;
      
  }
  /* change the label font for the disabled button*/
   .radContainer input:disabled ~ .radioButton + label
  {
      color:#C8C6C6;
  }
```
Here is the html code
```
<html>
    <headr>
        <link href="./radioButton.css" type="text/css" rel="stylesheet" />
    </head>
    <body>

        <label class="radContainer"> Checked
            <input type="radio" checked="checked" name="radio" id="checked"/>
            <span class="radioButton"></span>
          </label>
          
          <label class="radContainer"> Un Checked
            <input type="radio" name="radio" id="uncheck"/>
            <span class="radioButton"></span>
          </label>
          
          <label class="radContainer" >
            <input type="radio" name="radio" id="disabled" disabled>
            <span class="radioButton"></span>
            <label> Disabled</label>
          </label>
    </body>
</html>

```

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

Answer:
Here is the solution, also added source files to **react_answer_1** directory as part of the pull 
request

**Modified List Component**
```
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

const styles = {
  cursor:'pointer'
};

const selectedItem = (item) => {
  console.log(item);
};

const List = props => {
  return (
    <ul>
      {props.data.map((item, index)=>{
        return <li style={styles} key={index} onClick={()=>props.selectItem(item)}>{item}</li>;
      })}
    </ul>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  selectItem: PropTypes.func,
};

const items = ["hello", "world", "nograj"];

render(<List data={items} selectItem={(item) => selectedItem(item)}/>, document.getElementById('root'));
```
