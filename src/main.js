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

    testObject.some = c.curry( function(a, b, c ){
        return this.p + a + b + c;
    });

    var mid = testObject.some(1, 2);
    var result = mid(3);

    console.log( result );

})();
