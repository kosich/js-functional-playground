// Object-based recursive memoization
// more scoping, compared to array-based arr-memoization.js
;(function(){
    'use strict';
    /* jshint validthis : true */

    var m = function(fn, equalilyFn){
        var fnStorage = [],
            noArgsResult = {};

        function hasNoArgRes (){
            return noArgsResult.hasOwnProperty('value');
        }

        return function(){
            if ( !arguments.length )
                return hasNoArgRes() && noArgsResult.value || memo(fn, null, 0), noArgsResult;

            return memoize( Array.prototype.splice.call(arguments, 0), 0, fnStorage );
        };

        function memoize(args, deph, storage){
            var keyValue = storage.find(function(el){
                return el.equal(args[deph], equalilyFn);
            });

            if ( !keyValue ){
                keyValue = new KeyValue(args[deph]);
                storage.push( keyValue );
            }

            //last key 
            if (deph === (args.length - 1)){
                if ( keyValue.hasValue ){
                    return keyValue.value;
                } else {
                    return memo(fn, args, keyValue);
                }
            }

            keyValue.storage = keyValue.storage || [];
            return memoize( args, deph+1, keyValue.storage );
        }

        function memo (fn, args, keyValue){
            keyValue.value = fn.apply( this, args );
            return  KeyValue.value;
        }
    };

    function KeyValue(key){
        this.key = key;
    }

    Object.defineProperty(KeyValue.prototype, 'hasValue', {
        get : function (){
            return this.hasOwnProperty('value');
        }
    });

    KeyValue.prototype.equal = function KeyValue_equal(otherKey, equalilyFn){
        if (this.key === otherKey) // I believe we must have here an strict comparision
            return true;

        if (typeof equalilyFn === 'function')
            return !!equalilyFn(this.key, otherKey);

        return false;
    };

    return m;

})();
