// Currying, with settings to handle both
// - simple predefined length functions
//  \which will return value when all arguments, declare in fn def, are passed\
// - complex function with optional amount of arguments

;(function(){
    'use strict';
    /* jshint validthis : true */

    var defaults = {
        // if one doesn't want fn to be executed
        // when passed amount of arguments equal to fn.length
        // e.g. function, that accepts one value,
        // and some optional amount of args `function( initial, ... )`
        lengthBased : true
    };

    module.exports = {


        curry : function ( fn, options ){

            // fulfill options with defaults
            options = options || {};

            Object.keys( defaults ).forEach(function(p){
                if (options[p] === undefined )
                    options[p] = defaults[p];
            });

            return (function curry(args){
                args = args || [];

                function curred(){
                    // client calling args
                    var callArguments = Array.prototype.splice.call(arguments, 0),
                        // args stack for all calls
                        argsStack = args.concat(callArguments);

                    if ( callArguments.length === 0 ||
                        options.lengthBased && argsStack.length === fn.length ){
                        // fn was called with no args
                        // or length-based evalutaion is on 
                        // and all arguments (according to fn.length) passed
                        // then evaluate
                        return fn.apply( this, argsStack );
                    } else {
                        // otherwise create new curry with args stack saved
                        return curry.call( this, argsStack );
                    }
                }

                var bindedCurred = curred.bind(this),
                    self = this;

                bindedCurred.valueOf = function(){
                    var res = curred.call(self);
                    return res;
                };

                return bindedCurred;
            }).call(this);


        }


    };

})();
