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

#### 3.
Summarize the differences between using Promises and Callbacks for asynchronous code (calling REST APIs is a common asynchronous task). What are some considerations that are relevant in determining which approach is most appropriate for a given situation?

As an example, the SuperAgent library (http://visionmedia.github.io/superagent/#request-basics) provides support for both approaches, .then() for Promises or .end() for Callbacks.

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


#### 2.
Provide HTML and CSS that shows <input type='radio'/> radio buttons in 3 states: unchecked, checked, and disabled. The radio buttons should have a custom style (not the browser default style), as follows:
- 14 px diameter outer circle with background #ffffff, border color #aaabac
- when checked, 6px diameter inner circle with background #1e8bd1
- when disabled, outer circle has background #f0f0f0

See the "radio-buttons.png" image for an example

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

