# Build a React Remote Auto complete Text Box Component from Scratch

In some situation you need to create an autocomplete feature for your visitor in your web application. It helps you to search from a remote database and also fills up every dependent element when corresponding value has been selected.  For example you might want to fill up code for your item, unit, rate when it's name has been selected from the autocomplete list and it also avoids unnecessary spelling mistakes. 

In this tutorial we are going to build a React auto complete component from scratch.

We will use fetch API to use our autocomplete feature. You can also use an array for your web application.

The code for this project is available on github as well as on [Codepen](https://codepen.io/regexp/full/RwPNaLe).

![](https://raw.githubusercontent.com/surajitbasak109/react-autocomplete-textbox/master/public/img/reactjs-autocomplete-textbox.gif)


![](https://raw.githubusercontent.com/surajitbasak109/react-autocomplete-textbox/master/public/img/react-autocomplete-textbox-2.gif)

We are going to use some dependencies for for this project. 

- json-server: To make our json database as our fake API
- concurrently: To run multiple application at one command

So, at first open your terminal and enter the following command. Remember you need latest version of nodejs. Current nodejs version is: 13.5.0 when I am writing this tutorial.

```bash
npx create-react-app react-autocomplete
```

> `npx` on the first line is not a typo — it’s a [package runner tool that comes with npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

It will take couple of minutes depending on your Internet speed. 

When it's done change directory to react-autocomplete 

```bash
cd react-autocomplete
```

Now if you run `npm start` it will open your current project in your default browser.

So, before moving ahead we need to install two more dependencies in our project directory.

## Installing `json-server`

To install json-server globally we can use following command:

```bash
npm i -g json-server
```

Here `i` is short form of `install`. 

You can learn more about it from [here](https://www.npmjs.com/package/json-server).

## Intalling `Concurrently` 

To install concurrently globally enter following command in your command prompt/terminal/console.

```bash
npm i -g concurrently
```

We can use concurrently to run multiple commands. Another option would be to just run all commands in separate terminals. If you got tired of opening multiple terminal windows then **concurrently** is made for you.

For example enter following command in your terminal after installing `json-server` and `concurrently`:

**Note:** Before using json-server we need to create a `db.json` file and add code available from [here](https://raw.githubusercontent.com/surajitbasak109/realworld-react-invoice/master/db.json).

```bash
concurrently "json-server --watch db.json --port 3004" "npm start"
```

Output has been given below:

```bash

C:\Users\Techcet.Techcet-PC\Development>cd react-autocomplete

C:\Users\Techcet.Techcet-PC\Development\react-autocomplete>concurrently "json-server --watch db.json --port 3004" "npm start"
[0]
[0]   \{^_^}/ hi!
[0]
[0]   Loading db.json
[0]   Done
[0]
[0]   Resources
[0]   http://localhost:3004/items
[0]
[0]   Home
[0]   http://localhost:3004
[0]
[0]   Type s + enter at any time to create a snapshot of the database
[0]   Watching...
[0]
[1]
[1] > react-autocomplete@0.1.0 start C:\Users\Techcet.Techcet-PC\Development\react-autocomplete
[1] > react-scripts start
[1]
[1] i ｢wds｣: Project is running at http://192.168.0.102/
[1] i ｢wds｣: webpack output is served from /
[1] i ｢wds｣: Content not from webpack is served from C:\Users\Techcet.Techcet-PC\Development\react-autocomplete\public
[1] i ｢wds｣: 404s will fallback to /index.html
[1] Starting the development server...
[1]
[1] Compiled successfully!
[1]
[1] You can now view react-autocomplete in the browser.
[1]
[1]   Local:            http://localhost:3000/
[1]   On Your Network:  http://192.168.0.102:3000/
[1]
[1] Note that the development build is not optimized.
[1] To create a production build, use npm run build.
[1]

```

Now open your browser and go to the http://localhost:3004/items and it will display:

```json
[
  {
    "code": "001",
    "name": "Pan Cake",
    "unit": "Pcs",
    "rate": "50.00"
  },
  {
    "code": "002",
    "name": "Chicken Pattise",
    "unit": "Pcs",
    "rate": "30.00"
  },
    ...
]
```

## Adding `dev` command in `package.json`

So, to run two commands alongside we need to open our `package.json` file inside our root directory. Then add this in `scripts` object property:

```json
"dev": "concurrently \"react-scripts start\" \"json-server --watch db.json --port 3004\""
```

After updating this scripts object, it will look like this:

```json
...
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "concurrently \"react-scripts start\" \"json-server --watch db.json --port 3004\""
  },
...
```

Now open this project in your favorite text editor like sublime text or visual studio code. For this tutorial I am going to use Visual studio code.

## Adding ES7 React extension in Visual Studio Code

We need an extension to create our class based or functional component, so for this press `ctrl+shift+x` and type ES7 React and hit enter From the result you will find `ES7 React/Redux/GraphQL/React-Native snippets`, install it.

## Removing some files

React comes with some boilerplate we are not going to use in this project, so remove some of them like favicon, logo192.png, logo512.png, manifest.json, robots.txt in public folder. App.test.js, logo.svg, serviceWorker.js and setupTests.js in src folder. 

## Add HTML markup

Now open index.html file inside the public folder and add following markup:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Autocomplete Example</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

</head>

<body>

  <div id="root"></div>
    
</body>

</html>
```

Here we are going to use bootstrap 4 framework for this project. Because I am not going to use default css for styling. And it would be a lengthy process for this tutorial.

## Changing Index file

Now open index.js file and add following codes:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

## Adding some styles

Add following css styles in your App.css file:

```css
body {
  font-family: "Century Gothic",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

.form-group {
  position: relative;
}

.custom-input {
  border: 0;
  border-bottom: 1px solid #b9b9b9;
}

.custom-input:focus {
  outline: none;
  box-shadow: none;
}
```

## Creating class based component

Now we need to work on our App.js file. At first we are going to make a class based component in our App.js file. So open up App.js file inside our src folder and add following codes:

```jsx
import React from "react";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchItems: []
        };
    }
    
    render() {
        return(<div className="container mt-3">Hello from app</div>)
    }
}
```

Now navigate to your command prompt/Console/Terminal and enter `npm run dev`. It will run two commands first it will initiate our json server with http://localhost:3004 address and serves react application at http://localhost:3000.

So, open your default browser and go to http://localhost:3000. You will see `Hello from app` displayed in our browser.

## Adding required properties to component state

So, switch to editor and change component state:

```js
this.state = {
    item: {
        code: "",
        name: "",
        unit: "",
        rate: ""
    },
    searchItems: []
};
```

Here you can see we have assigned an item object with code, name, unit and rate properties with empty values. This properties we are going to add as a value in our four input elements.

Now inside the render function/method we need to use object destructuring to create variables from item object:

```js
const { searchItems, item } = this.state;
const { code, name, unit, rate } = item;
```

As you can see at first we are going to extract searchItems array and item object from `this.state` and after that we have access to the item object as variable. So we can extract all variables we have in item object (e.g. code, name, unit, rate).

## Adding input elements

Then after that we are going to add some input elements in render function as follow:

```jsx
return (
    <div className="container mt-3">
        <h1 className="h2 text-center">Autocomplete Example</h1>
        <div className="form-group">
            <label htmlFor="autocomplete">Item Name</label>
            <input
                type="text"
                id="autocomplete"
                value={name}
                className="custom-input form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="code">Code</label>
            <input
                type="text"
                name="code"
                id="code"
                value={code}
                readOnly
                className="custom-input form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <input
                type="text"
                name="unit"
                id="unit"
                value={unit}
                readOnly
                className="custom-input form-control"
                />
        </div>
        <div className="form-group">
            <label htmlFor="rate">Rate</label>
            <input
                type="text"
                name="rate"
                id="rate"
                value={rate}
                readOnly
                className="custom-input form-control"
                />
        </div>
    </div>
);
```

## Creating `autocomplete` method

Now we need to create a `autocomplete` method after the `constructor` method:

```js
constructor(props){
    // ... more code ...
}
autocomplete(evt) {
    let text = evt.target.value;
    fetch(`http://localhost:3004/items?name_like=${text}&_limit=6`)
        .then(res => res.json())
        .then(data => {
        this.setState({ searchItems: data });
    });
}
```

This autocomplete method accepts input event as an argument. Then we need to assign text variable with `event.target.value` as a value. 

Then we are going to use fetch API(ES6+) and it accepts first parameter as a request info. If you remember, we already established our json server with http://localhost:3004 and it has an items array. And we are going to use two GET parameters:

first one is name_like and second one is _limit. `json-server` has some cool features you can get familiar with, so to know more you can have a look from [here](https://www.npmjs.com/package/json-server#paginate)

We used backtick(`) to use template string which gives us to write javascript expression inside the string like ${text}.

So, after that we get response as a promise and we need to return the response as json format. And after that we can use then method and inside the function we can add data to the `searchItems` property inside the `this.state` object with `this.setState` method.

`console.log` is very useful when building an web application. So, if you want to debug your code inside the `autocomplete` method use `console.log` to see what is happening when we are trying to fetch from our json api. To see if our `searchItems` object is changing or not we can use:

```js
autocomplete(evt) {
    let text = evt.target.value;
    // ... more code ...
    console.log(this.state.searchItems);
}
```

Now, we need to bind `this` keyword to our `autocomplete` method. So, to do that we have two options.

**Option One:** we can bind `this` when we are calling this method to `onChange` event listener of input element:

```jsx
{// ... more code ...}
<input
    type="text"
    id="autocomplete"
    onChange={this.autocomplete.bind(this)}
    onKeyUp={this.hanldeKeyup}
    onKeyDown={this.hanldeKeydown}
    value={name}
    className="custom-input form-control"
    />
{// ... more code ...}
```

**Option Two:** We can bind `this` to autocomplete in our constructor method:

```js
constructor(props) {
    super(props);
    // ... more code ...
    this.autocomplete = this.autocomplete.bind(this);
}
```

I will use second option. So write above code in your constructor method. 

Now we need to call this `autocomplete` method with `onChange` event listener of our first input element:

```jsx
<label htmlFor="autocomplete">Item Name</label>
<input
    type="text"
    id="autocomplete"
    onChange={this.autocomplete}
    value={name}
    className="custom-input form-control"
    />
```

Now go back to your browser, open Developer tool by pressing `F12` or `ctrl+shift+I`. Click to `Console` tab and type something inside the first input element e.g. `p`.

![](https://raw.githubusercontent.com/surajitbasak109/react-autocomplete-textbox/master/public/img/console_tab_1.jpg)

It's showing all items which has `p` in every item name.

## Creating a functional component

Now it is the time to render this items as a `ul` list. So, for this we need to create a functional component. In our `src` folder we need to create a `components` directory and inside the directory we need to create `SearchItemsList.js` file.

Now type `rafce` inside the `SearchItemsList.js` and hit enter. It will create a functional component so that we don't need to write every single code it requires to write for the first time.

Inside our return keyword we can write `<div>hello from search item list</div>`. It will look this:

```jsx
import React from 'react'

const SearchItemsList = () => {
  return (
    <div>
      hello from search item list
    </div>
  )
}

export default SearchItemsList
```

We will work on it soon. So go back to `App.js` file. Import `searchItems` file and add following codes after the first input element:

```js
import SearchItemsList from "./components/SearchItemsList";
```



```jsx
<input
    type="text"
    id="autocomplete"
    onChange={this.autocomplete}
/>
{searchItems.length > 0 && (
    <SearchItemsList
        searchItems={searchItems}
    />
)}
```

The good thing in react is we can use expressions like above in our code as react uses jsx. **JSX** is a preprocessor step that adds XML syntax to JavaScript. In our above code we are checking if `searchItems` is empty or not with length property and if it is not empty then we are going to use `SearchItemsList` component. We can add `searchItems` props to our `searchItemsList` component. 

Now go back to `SearchItemsList.js` file and add following codes:

```jsx
const SearchItemsList = ({
  searchItems,
}) => {
  return (
    <ul className="list-group">
      {searchItems.map((item, idx) => (
        <li
          className="list-group-item"
          key={idx}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchItemsList;

```

Inside the functional parameter we are de-sctructring searchItems variable from the props. You can also pass `props` as a parameter and get searchItems later before return statement. But most of the time I use this technique whenever I need to get `props` values from the child component.

Then after that create an unordered list with the class name `list-group`. Inside the list we used ES6 map function to iterate over the search items and return a list item with the class name `list-group-item` and a key with `idx`. Then inside the list element we are getting `item.name`

> **Keys** help **React** identify which items have changed (added/removed/re-ordered). To give a unique identity to every element inside the array, a **key** is required.

Now go to the browser, type `p` inside the first input field it will render our list group items as expected. But it is not going to remove when we press escape button or when focus has changed. We need to fix it.

## Creating `handleKeyup` method

Create a method called `handleKeyup` right after the autocomplete method with `evt` parameter passed to it:

```js
autocomplete(evt) {
    // ... more code ...
}
hanldeKeyup(evt) {
    // event code 27 means escape key
    if (evt.keyCode === 27) {
        this.setState({ searchItems: [] });
        return false;
    }
}
```

If `Esc` key has been pressed then we are going to make our searchItems to an empty array. So that our list group item will be not shown.

Now bind `this` to our `handleKeyup` method inside constructor method:

```js
constructor(props) {
    super(props);
    this.state = {
      // ... more code ...
    };
    this.autocomplete = this.autocomplete.bind(this);
    this.hanldeKeyup = this.hanldeKeyup.bind(this);
}
```

And call `handleKeyup` method in our first input field with `onKeyUp` event listener:

```jsx
<label htmlFor="autocomplete">Item Name</label>
<input
    type="text"
    id="autocomplete"
    onChange={this.autocomplete}
    onKeyUp={this.hanldeKeyup}
    value={name}
    className="custom-input form-control"
    />
```

Now go back to the browser, type something inside the first input element. When item list appears press the escape button and you will see that unordered list has gone!

Now we need to make a way to select items list whenever user presses up or down arrow key from the input fields. Now it is going to be little bit complex. So, inside the state object create a property called `cursor` and set it's value to 0.

```js
constructor(props) {
    super(props);
    this.state = {
        item: {
            // ... more code ...
        },
        cursor: 0,
      // ... more code ...
    };
    // ... more code ...
 }
```

## Creating `hanldeKeydown` method

And create a `hanldeKeydown` after the `handleKeyup` method and add following codes:

```js
hanldeKeyup(evt) {
	//...more code...
}

hanldeKeydown(evt) {
  const { cursor, searchItems } = this.state;
  // arrow up/down button should select next/previous list element
  if (evt.keyCode === 38 && cursor > 0) {
    this.setState(prevState => ({
      cursor: prevState.cursor - 1
    }));
  } else if (evt.keyCode === 40 && cursor < searchItems.length - 1) {
    this.setState(prevState => ({
      cursor: prevState.cursor + 1
    }));
  }
}
```

First we are extracting `cursor` and `searchItems` variables from the component state. Then we are checking if corresponding key value from the input event then also checking for the first if block that cursor is bigger than zero. And inside the second if block we are checking if event keycode is 40 (Down arrow key) and cursor is less than the length of searchItems array minus one. Then we are setting the cursor property of previous state to +1 or -1.

Again we need to bind `this` to our **handleKeydown** method, so do that:

```js
constructor(props) {
  super(props);
  this.state = {
    item: {
        //...more code...
    },
    cursor: 0,
    // ...more code...
  };
  // ...more code...
  this.hanldeKeydown = this.hanldeKeydown.bind(this);
}
```

And add this method to our first input element with `onKeyDown` event listener, like this:

```jsx
<label htmlFor="autocomplete">Item Name</label>
<input
    type="text"
    id="autocomplete"
    onChange={this.autocomplete}
    onKeyUp={this.hanldeKeyup}
    onKeyDown={this.hanldeKeydown}
    value={name}
    className="custom-input form-control"
    />
```

Everything goes really well here. So, now we need to change our `SearchItemsList` component.

Now in our App.js file add `cursor` to the curly brace where we are destructuring `this.state` inside the render method. Like below:

```js
render() {
    const { searchItems, cursor, item } = this.state;
    // ... more code ...
}
```



Then find the `SearchItemsList` component we are calling in `App.js` file and add following:

```jsx
{searchItems.length > 0 && (
    <SearchItemsList
        searchItems={searchItems}
        cursor={cursor} />
  )}
```



Go back to `SearchItemsList.js` file and change them:

1) Destructure `cursor` from the `props`:

```js
import React from "react";

const SearchItemsList = ({ searchItems, cursor }) => {
    // ... more code ...
}
```



2) Change className attribute:

```jsx
<ul className="list-group">
  {searchItems.map((item, idx) => (
    <li
      className={cursor === idx ? "active list-group-item" : "list-group-item"}
      key={idx}
    >
      {item.name}
    </li>
  ))}
</ul>;

```

We are using a ternary operator operator inside the curly brace of className attribute. If index of the `searchItems` array matches with cursor then we are adding `active` class else not.

Now go back to the browser type `p` inside the first element and press up or down arrow key to see if you see any changes or not. The list items are changing it's color to blue whenever we are pressing up or down arrow key.

Now we need to add a functionality whenever use presses enter key it will set it's item name, code, unit, rate based on the index position of the `searchItems`. So, add below code inside the `handleKeydown` method:

```js
hanldeKeydown(evt) {
  const { cursor, searchItems } = this.state;
  // ... more code ...
  if (evt.keyCode === 13) {
    let currentItem = searchItems[cursor];
    if (currentItem !== undefined) {
      const { name, code, rate, unit } = currentItem;
      this.setState({ item: { name, code, rate, unit }, searchItems: [] });
    }
  }
}
```

We know the cursor value is changing and we are accessing that index item from the `searchItems` array and also we are checking if current item is undefined or not. Then we are again destructuring name, code, rate, unit variables from the current items array. Then we are calling `setState` method and set the item object with name, code, rate, unit. We are also making the `searchItems` to an empty array so that it will not show the list item when we have item values. As we have already added value with item name in our first element the value also fills out there.

Last thing we can use another event code that is whenever user presses a `backspace` key it will remove remove all item name, code, rate and unit properties. So, do this inside our `handleKeydown` method:

```js
hanldeKeydown(evt) {
  // ... more code ...
  if (evt.keyCode === 8) {
    this.setState({ item: { name: "", code: "", rate: "", unit: "" } });
  }
}
```

## Creating `selectItem` method

Now we need to add another method for the click event. So, for that create another method called `selectItem` after the `handleKeydown` method and add following codes:

```js
hanldeKeydown(evt) {
  // ... more code ...
}
selectItem(id) {
  const { searchItems } = this.state;
  let selectedItem = searchItems.find(item => item.code === id);
  const { code, name, unit, rate } = selectedItem;
  this.setState({ item: { code, name, unit, rate }, searchItems: [] });
}
```

Here we have passed id parameter in our `selecteItem` method, then we are extracting the `searchItems` variable from the component state. And after that we are assigning `selectedItem` with the ES6 `find` method. We would also use `filter` method, but it would create an array. But we need to access only one object from t he `searchitems` array. Then after that we are extracting code, name, unit and rate from the `selectedItem` object and then assigning item object with the corresponding code, name, unit and rate values. Then we are emptying the `searchItems` array.

Now bind `this` to our `selectItem` method inside the `constructor` method like this:

```js
this.selectItem = this.selectItem.bind(this);
```

Then inside the render function of `App.js` file search for the `SearchItemsList` component we are calling and add `selectItem={this.selectItem}` as an attribute:

```jsx
{searchItems.length > 0 && (
    <SearchItemsList
        searchItems={searchItems}
        cursor={cursor}
        selectItem={this.selectItem}
        />
)}
```

Then go back to `SearchItemsList.js` file and add `selectItem` inside the curly brace where we are destructuring `searchItems` and `cursor` variables from the props as below:

```js
import React from "react";

const SearchItemsList = ({ searchItems, cursor, selectItem }) => {
	// ... more code ...   
}
```

And add this code: `onClick={() => selectItem(item.code)}`:

```jsx
<ul className="list-group">
  {searchItems.map((item, idx) => (
    <li
      className={cursor === idx ? "active list-group-item" : "list-group-item"}
      key={idx}
      onClick={() => selectItem(item.code)}
    >
      {item.name}
    </li>
  ))}
</ul>;
```

## Creating `handleChange` method

Now last thing we need to make another method `handleChange` for our rest three input elements, so create it and add following codes:

```js
handleChange(evt) {
  this.setState({ item: { [evt.target.name]: evt.target.value } });
}
```

Inside the constructor method bind `this` to our `handleChange` method:

```js
this.handleChange = this.handleChange.bind(this);
```

Then add `onChange={this.handleChange}` on every input elements except first input element which has an id `autocomplete`:

```jsx
<div className="form-group">
    <label htmlFor="code">Code</label>
    <input
        type="text"
        name="code"
        id="code"
        value={code}
        onChange={this.handleChange}
        readOnly
        className="custom-input form-control"
        />
</div>
<div className="form-group">
    <label htmlFor="unit">Unit</label>
    <input
        type="text"
        name="unit"
        id="unit"
        value={unit}
        onChange={this.handleChange}
        readOnly
        className="custom-input form-control"
        />
</div>
<div className="form-group">
    <label htmlFor="rate">Rate</label>
    <input
        type="text"
        name="rate"
        id="rate"
        value={rate}
        onChange={this.handleChange}
        readOnly
        className="custom-input form-control"
        />
</div>
```

So, go to your browser, enter something inside the autocomplete input element and select any item from the items list. It will fill up every input fields.

## Complete Code:

### index.js

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

### App.js

```jsx
import React from "react";
import "./App.css";
import SearchItemsList from "./components/SearchItemsList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        code: "",
        name: "",
        unit: "",
        rate: ""
      },
      cursor: 0,
      searchItems: []
    };
    this.autocomplete = this.autocomplete.bind(this);
    this.hanldeKeyup = this.hanldeKeyup.bind(this);
    this.hanldeKeydown = this.hanldeKeydown.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  autocomplete(evt) {
    let text = evt.target.value;
    fetch(`http://localhost:3004/items?name_like=${text}&_limit=6`)
      .then(res => res.json())
      .then(data => {
        this.setState({ searchItems: data });
      });
    console.log(this.state.searchItems);
  }

  hanldeKeyup(evt) {
    if (evt.keyCode === 27) {
      this.setState({ searchItems: [] });
      return false;
    }
  }

  hanldeKeydown(evt) {
    const { cursor, searchItems } = this.state;
    // arrow up/down button should select next/previous list element
    console.log(evt.keyCode);
    if (evt.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (evt.keyCode === 40 && cursor < searchItems.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
    if (evt.keyCode === 13) {
      let currentItem = searchItems[cursor];
      if (currentItem !== undefined) {
        const { name, code, rate, unit } = currentItem;
        this.setState({ item: { name, code, rate, unit }, searchItems: [] });
      }
    }
    if (evt.keyCode === 8) {
      this.setState({ item: { name: "", code: "", rate: "", unit: "" } });
    }
  }

  selectItem(id) {
    const { searchItems } = this.state;
    let selectedItem = searchItems.find(item => item.code === id);
    const { code, name, unit, rate } = selectedItem;
    this.setState({ item: { code, name, unit, rate }, searchItems: [] });
  }

  handleChange(evt) {
    this.setState({ item: { [evt.target.name]: evt.target.value } });
  }

  render() {
    const { searchItems, cursor, item } = this.state;
    const { code, name, unit, rate } = item;
    return (
      <div className="container mt-3">
        <h1 className="h2 text-center">Autocomplete Example</h1>
        <div className="form-group">
          <label htmlFor="autocomplete">Item Name</label>
          <input
            type="text"
            id="autocomplete"
            onChange={this.autocomplete}
            onKeyUp={this.hanldeKeyup}
            onKeyDown={this.hanldeKeydown}
            value={name}
            className="custom-input form-control"
          />
          {searchItems.length > 0 && (
            <SearchItemsList
              searchItems={searchItems}
              cursor={cursor}
              selectItem={this.selectItem}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={this.handleChange}
            readOnly
            className="custom-input form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={unit}
            onChange={this.handleChange}
            readOnly
            className="custom-input form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate</label>
          <input
            type="text"
            name="rate"
            id="rate"
            value={rate}
            onChange={this.handleChange}
            readOnly
            className="custom-input form-control"
          />
        </div>
      </div>
    );
  }
}

export default App;
```

### SearchItemsList.js

```jsx
import React from "react";

const SearchItemsList = ({ searchItems, cursor, selectItem }) => {
  return (
    <ul className="list-group">
      {searchItems.map((item, idx) => (
        <li
          className={
            cursor === idx ? "active list-group-item" : "list-group-item"
          }
          key={idx}
          onClick={() => selectItem(item.code)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchItemsList;
```

