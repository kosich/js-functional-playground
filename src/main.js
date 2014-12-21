;(function(){
    'use strict';

    var curry = require('./currying/curry.js').curry,
    // var curry = require('./currying/simple-curry.js').curry,
        tf = require ('./test-functions.js');

    var testObject = { p : 4 };
    var c = {
        curry : curry,
        FAKE : true
    };

    testObject.some = c.curry.call(testObject, function(a, b, c ){
        return this.p + a + b + c;
    });

    var mid = testObject.some(1, 2);
    var result = mid(3);

    console.log( result );

    var cMultyBy2 = curry( tf.multy , { lengthBased : false } )(2);
    console.log( cMultyBy2( 5 )( 2 )(  ) );
})();
