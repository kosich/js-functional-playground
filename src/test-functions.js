;(function(){
    'use strict';
    module.exports = {
        add : function add(a, b, c){
            return a + b + c;
        },

        summ : function summ(){
            return Array.prototype.reduce.call(arguments, function(a, b){
                return a + b;
            }, 0);
        },

        multy : function multy( initial ){
            var args = Array.prototype.splice.call(arguments, 1);
            return args.reduce( function( a, b ){
                return a * b;
            }, initial || 0);
        }
    };
})();
