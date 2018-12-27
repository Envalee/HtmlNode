# HtmlNode [ JavaScript HTML Creator ] - Version 0.1

A simple way to create HtmlElements / HtmlNodes with JavaScript

## Installation

Just grab the htmlnode.js and include it in your project.
Of course you can use the htmlnode.min.js as well.

```html
<!-- Load HtmlNodes -->
<script type="text/javascript" src="htmlnode.js"></script>
```

## Features

<!--<img src="https://github.com/Envalee/js-tools/blob/master/img/overview.svg" alt="logo" width="920">-->

* Create complex HTML structures in a easy way
* Use a definition to create a HTML object and callbacks after creating or rendering
* Create blueprints with predefinied functions on several events for the object ( onclick , mouseover , ... )

## Usage

To use the HtmlNode just include the library in your project and use the `new HtmlNode()` constructor in your code to
create a new object.

#### Examples

```javascript
// Exmaple for simple Span in Div
var node = new HtmlNode({
  tag : 'div',
  childs: [
    {
      tag: 'span',
      content: 'Hello World!'
    }
  ]
});
// Render the node to the body
node.render('body');

```

## Documentation
https://github.com/Envalee/HtmlNode/wiki
