# js-functional-playground

tests with functional paradigm aspects of ES

## Currying

### Simple currying

This implementation of currying is pretty simple and will evaluate
passed function as soon as enough arguments passed (equal to <yourFunction>.length)

```javascript
    var curry = require('/src/currying/simple-curry.js').curry;

    // ...

    function add(a, b, c){
        return a + b + c;
    }

    // options : ignore the fn.length
    var cAdd = curry( add );
    // will evaluate when enought args passed
    console.log( cAdd( 28, 11 )( 3 ) ); // = 42
```

### Advanced currying

Advanced currying function provides additional option to accept
functions with no predefined number of arguments. So it wont be
called once passed enough arguments

```javascript
    var curry = require('/src/currying/curry.js').curry;
    
    // ...
    
    function multy( initial ){
        var args = Array.prototype.splice.call(arguments, 1);
        return args.reduce( function( a, b ){
            return a * b;
        }, initial || 0);
    }

    // curry fn, and set options : ignore the fn.length
    var cMultyBy2 = curry( multy , { lengthBased : false } )(2);
    // ... ergo evaluate only after call with empty args
    console.log( cMultyBy2( 5 )( 2 )(  ) ); // = 20
```

Also theres an option to deal with `this` in function body.
For this to happen one should call currying like follows:

```javascript
var entity = {
    value : 2,
    method : function(a, b, c){
        return this.value + a + b + c;
    }
};
var _addWithThis = curry.call(entity, entity.method);
assert.equal(8, _addWithThis(1, 2)(3) );
```

Also supports `valueOf` (even with `this`).

More to see in `/test/currying/curry-test.js`

## Memoization

To be covered with tests and described...
