;(function(){
    'use strict';

    var assert = require('assert'),
        curry  = require('../../src/currying/curry.js').curry,
        simpleCurry  = require('../../src/currying/simple-curry.js').curry,
        tf     = require ('../../src/test-functions.js');

    var add    = tf.add,
        summ   = tf.summ,
        multy  = tf.multy;

    var simpleCurryTest = function(prefix, curry){

        it(prefix + ': add to two precurred', function(){
            var addTwo = curry(add)(2);
            assert.equal(6, addTwo(3, 1));
            assert.equal(4, addTwo(1, 1));
            assert.equal(0, addTwo(-1, -1));
        });

        it(prefix + ': real currying -- i.e. one by one calling', function(){
            var _add = curry(add);
            assert.equal(9  , _add(3)(3)(3));
            assert.equal(111, _add(10)(100)(1));
        });

        it(prefix + ': partical application', function(){
            var _add = curry(add);
            assert.equal(111, _add(10, 100)(1));
            assert.equal(1  , _add(1)(-1, 1));
        });
    };

    describe('Curry', function(){

        simpleCurryTest('simple', simpleCurry);

        simpleCurryTest('complex', curry);

        it('infinit arguments', function(){
            var _summ = curry( summ );
            assert.equal(4, _summ( 4 )());
            assert.equal(4, _summ( 1 )( 1, 0, 1 )( 0 )( 1 )( 0 )());
        });

        it('infinit args, but function has length > 0', function(){
            var _multy = curry( multy, { lengthBased : false });
            assert.equal( true, typeof _multy( 4 ) === 'function' );
            assert.equal(4, _multy( 4 )());
            assert.equal(4, _multy( 2 )( 2, 1 )());
        });

        it('`this` passing through', function(){
            var entity = {
                value : 2,
                method : function(a, b, c){
                    return this.value + a + b + c;
                }
            };
            var _addWithThisInitial = curry.call(entity, entity.method);
            assert.equal(8, _addWithThisInitial(1, 2)(3) );
        });

        // TODO: check working with valueOf && with `this`
        it('`valueOf` using', function(){
            var _multy = curry( multy, { lengthBased : false });
            assert.equal(6, _multy( 2 )( 2 ) + 2);
        });

        it('`valueOf` with `this`', function(){
            var entity = {
                value : 2.5,
                method : function(){
                    return Array.prototype.reduce.call(arguments, function(a, b){
                        return a + b;
                    }, this.value);
                }
            };
            var _addWithThisInitial = curry.call(entity, entity.method, { lengthBased : false });
            assert.equal(42, _addWithThisInitial( 21 )( 20, -3 ) + 1.5);
        });

    });


})();
