---

title: ES6 syntactic sugar you should begin using today
name: es6-syntactic-sugar-you-should-begin-using-today
author: Sebastian Misch
tldr:
  ES6 aka ECMAScript2015 is the next generation of Javascript.
  Node 5 as well as newer versions of browsers like Chrome, Firefox and even Edge
  support it - or support subsets of ES6. With the help of transpilers like
  Babel you can use it today. 
layout: article

---

> ES6 aka ECMAScript2015 is the next generation of Javascript.
> Node 5 as well as newer versions of browsers like Chrome, Firefox and even Edge
> support it - or support subsets of ES6. With the help of transpilers like
> *Babel* you can use it today. 
> This cheatsheet is a subset of the easiest and most useful features of ES6.
>
> Why should you use ES6? Because it's easy and make's your everyday coding
> more fun.

## Arrow functions
```javascript
// ES5
[ 1, 2, 3, 4, 5 ].filter(function(x) { return x % 2 === 0; })
// [ 2, 4 ]


// ES6
[ 1, 2, 3, 4, 5 ].filter((x) => { return x % 2 === 0; })
// [ 2, 4 ]

[ 1, 2, 3, 4, 5 ].filter(x => { return x % 2 === 0; })
// [ 2, 4 ]

[ 1, 2, 3, 4, 5 ].filter(x => x % 2 === 0)
// [ 2, 4 ]
```


## Template strings
```javascript
// ES5
'Hello, my name is ' + name + '!'
// Hello my name is Paul!
'Hello, my name is ' + name + '!\nI live in Berlin.'


// ES6
`Hello, my name is ${name}!`
// Hello my name is Paul!

`Hello, my name is ${name}!
I live in Berlin.`
// Hello my name is Paul!
// I live in Berlin.
```

## Nifty String shorthand methods
```javascript
// ES5
'Hello Paul!'.indexOf('Paul') > -1
// true


// ES6
'Hello Paul!'.includes("Paul")
// true


// ES5
var i, s = '';
for (i = 0; i < 3; ++i) {
  s = s + 'Hello!';
}
// s = 'Hello!Hello!Hello!'


// ES6
let s = 'Hello!'.repeat(3);
// s = 'Hello!Hello!Hello!'
```


## Array love
```javascript

[ 0, 0, 0, 0, 0, 0 ].fill(42, 3)
// [ 0, 0, 0, 42, 42, 42 ]

[ 1, 2, 4, 8, 16 ].find(x => x > 2)
// 4

[ 1, 2, 4, 8, 16 ].findIndex(x => x > 2)
// 2

[ 1, 2, 4, 8, 16 ].copyWithin(3, 0)
// [ 1, 2, 4, 1, 2]
```

## Promises!
```javascript
// ES6
function waitOneSecond() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    });
}

waitOneSecond().then(() => {
    console.log('Hello after one second!');
});
// Promise { <pending> }
// Outputs 'Hello...' after one second asynchronously
```

## Destructuring
```javascript
// ES6
var [odd, even, , four] = [ 1, 2, 3, 4 ];
// odd = 1
// even = 2
// four = 4

function hello({name: x}) {
  console.log(`Hello, my name is ${x}!`);
}
hello({age: 26, name: 'Paul'});
// Hello, my name is Paul!
```


## Defaulting
```javascript
// ES6
function iLike(what = 'cats') {
  console.log(`I like ${what}!`);
}
iLike('ES6');
// I like ES6!
iLike();
// I like cats!
```


## Rest parameters
```javascript
// ES6
function countParameters(first, ...allOthers) {
  console.log(1 + allOthers.length);
}
countParameters(1, 2, 3, 4);
// 4
```


## Spread parameters
```javascript
// ES6
function firstThree(first, second, third) {
  console.log(first, second, third);
}
firstThree(...[1, 2, 3, 4]);
// 1 2 3
```


## Scoping with let and const
```javascript
// ES5
var foo = 1;
// foo = 1


// ES6
let foo = 1;
// foo = 1

const bar = { name: 'Paul' };
// bar = { name: 'Paul' }

bar = { other: 'stuff' };
// error

bar.name = 'Felix';
// bar = { name: 'Felix' }


// ES5
(function scope() {
  console.log(a);
  var a = 1;
})()
// undefined


// ES6
(function scope() {
  console.log(a);
  let a = 2;
})()
// ReferenceError
```

