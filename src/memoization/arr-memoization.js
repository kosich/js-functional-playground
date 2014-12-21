// Simple array-based implementation of memoization
// TODO: moveout tests
// TODO: make a module out of this
// TODO: exception handling
;(function(){
    'use strict';
    /* jshint validthis : true */

    var m = function(fn){
        var memoizedArr = [],
            noArgsResult = {};

        return function(){
            //in case if we get no args
            if ( arguments.length === 0 ){
                return memoizeNoArgs.call(this, noArgsResult, fn);
            }

            //convert args to array and memoize
            var args = Array.prototype.splice.call(arguments, 0);
            return memoize.call(this, memoizedArr, fn, args);
        };
    };

    function memoizeNoArgs(noArgsResult, fn){
        if (noArgsResult.hasOwnProperty('value'))
            return noArgsResult.value;
        else
            return (noArgsResult.value = fn.call(this));
    }

    // memoRize the result
    function memorize(memoizedArr, fn, args){
        var result = fn.apply(this, args);
        console.log('first time remembering res ', result, ' for ', args);
        args.push( result ); 
        memoizedArr.push( args );
        return result;
    }

    function memoize(memoizedArr, fn, args){

        if (!memoizedArr.find)
            console.warn('looks like `find` is not well implemented yet');

        var res = memoizedArr.find(function(el){
            return compareArray(el, args);
        });

        if ( !res )
            // no such calculation has been called
            return memorize( memoizedArr, fn, args );
        else
            // return calculation result, which is held in last arr item
            return res[ res.length-1 ];

    }

    function compareArray(memoizedArr, argsArray){
        if (memoizedArr === argsArray)
            return true;

        var len;
        if ((len = memoizedArr.length - 1 ) !== argsArray.length)
            return false;

        for( var i=0; i<len; i++ )
            if (memoizedArr[i] !== argsArray[i])
                return false;

        return true;
    }


    return m;
})();
