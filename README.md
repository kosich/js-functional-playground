# js-functional-playground

tests with functional paradigm aspects of ES

## Currying

### Simple currying
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
    var cMulty = curry( multy , { lengthBased : false } );
    // ... ergo evaluate only after call with empty args
    console.log( cMulty( 0.5 )( 12 )( 6, 0.25 )() ); // = 8
```

## Memoization

To be covered with tests and described...
