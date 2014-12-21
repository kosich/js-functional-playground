;(function(){
    'use strict';

    module.exports = {


        curry : function ( fn ){

            return function curred(){
                var args = Array.prototype.splice.call(arguments, 0);

                if (args.length === fn.length){
                    return fn.apply(undefined, args);
                } else {
                    return function(){
                        return curred.apply(undefined, args.concat(Array.prototype.splice.call(arguments, 0)));
                    };
                }
            };
        }


    };
})();
