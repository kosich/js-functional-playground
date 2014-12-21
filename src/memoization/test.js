;(function(){
    'use strict';

    function plus(a, b, c){
        console.log('computing a:', a, ' plus b:', b, ' plus c', c);
        return a + b;
    }

    function multi(a, b){
        console.log('computing a:', a, ' multi b:', b);
        return a*b;
    }

    function some(a){
        if ( a )
            return Math.pow(a, 2);

        console.log('GOSH, FOFF');
        return 42;
    }

    var mPlus = memoize(plus),
        mMulti = memoize(multi),
        mSome = memoize(some);

    console.log('mPlus');
    console.log(mPlus(1, 2, 3));
    console.log(mPlus(1, 2, 4));
    console.log(mPlus(1, 2, 3));
    console.log(mPlus(1, 2, 4));

    console.log('some');
    console.log(mSome());
    console.log(mSome());

    var args = [
        [1,2],
        [2,3],
        [2,3],
        [3,3],
        [1,3],
        [2,3],
        [2,2],
        [1,3],
        [2,2],
        [2,502],
        [101,3],
        [2,3],
    ];

    var res = 'error';
    args.forEach(function(el){
        res = mMulti.apply(null, el);
        console.log('multi ', el, res);
    });

})();
