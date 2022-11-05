
/* IMPORT */

import {describe} from 'fava';
import areDeeplyEqual from '../dist/index.js';

/* MAIN */

describe ( 'Are Deeply Equal', it => {

  it ( 'supports regular primitives', t => {

    t.true ( areDeeplyEqual ( null, null ) );
    t.true ( areDeeplyEqual ( undefined, undefined ) );
    t.true ( areDeeplyEqual ( 'foo', 'foo' ) );
    t.true ( areDeeplyEqual ( 123, 123 ) );
    t.true ( areDeeplyEqual ( true, true ) );
    t.true ( areDeeplyEqual ( false, false ) );
    t.true ( areDeeplyEqual ( Symbol.for ( 'foo' ), Symbol.for ( 'foo' ) ) );
    t.true ( areDeeplyEqual ( 123n, 123n ) );

    t.false ( areDeeplyEqual ( null, undefined ) );
    t.false ( areDeeplyEqual ( 'foo', 'bar' ) );
    t.false ( areDeeplyEqual ( 123, -123 ) );
    t.false ( areDeeplyEqual ( true, false ) );
    t.false ( areDeeplyEqual ( false, 0 ) );
    t.false ( areDeeplyEqual ( Symbol (), Symbol () ) );
    t.false ( areDeeplyEqual ( 123n, -123n ) );

  });

  it ( 'supports special primitives', t => {

    t.true ( areDeeplyEqual ( NaN, NaN ) );
    t.true ( areDeeplyEqual ( Infinity, Infinity ) );
    t.true ( areDeeplyEqual ( -Infinity, -Infinity ) );
    t.true ( areDeeplyEqual ( 0, 0 ) );
    t.true ( areDeeplyEqual ( -0, -0 ) );

    t.false ( areDeeplyEqual ( NaN, Infinity ) );
    t.false ( areDeeplyEqual ( Infinity, -Infinity ) );
    t.false ( areDeeplyEqual ( 0, -0 ) );

  });

  it ( 'supports boxed primitives', t => {

    t.true ( areDeeplyEqual ( Object ( 'foo' ), Object ( 'foo' ) ) );
    t.true ( areDeeplyEqual ( Object ( 123 ), Object ( 123 ) ) );
    t.true ( areDeeplyEqual ( Object ( true ), Object ( true ) ) );
    t.true ( areDeeplyEqual ( Object ( 123n ), Object ( 123n ) ) );

    t.false ( areDeeplyEqual ( Object ( 'foo' ), Object ( 'bar' ) ) );
    t.false ( areDeeplyEqual ( Object ( 123 ), Object ( -123 ) ) );
    t.false ( areDeeplyEqual ( Object ( true ), Object ( false ) ) );
    t.false ( areDeeplyEqual ( Object ( false ), Object ( 0 ) ) );
    t.false ( areDeeplyEqual ( Object ( 123n ), Object ( -123n ) ) );

  });

  it ( 'supports arrays', t => {

    t.true ( areDeeplyEqual ( [], [] ) );
    t.true ( areDeeplyEqual ( [123, 'foo', true], [123, 'foo', true] ) );
    t.true ( areDeeplyEqual ( [[[123]]], [[[123]]] ) );

    t.false ( areDeeplyEqual ( [], {} ) );
    t.false ( areDeeplyEqual ( [undefined], [] ) );
    t.false ( areDeeplyEqual ( [], [undefined] ) );
    t.false ( areDeeplyEqual ( ['foo'], [] ) );
    t.false ( areDeeplyEqual ( [], ['foo'] ) );
    t.false ( areDeeplyEqual ( [[[123]]], [[[124]]] ) );

  });

  it ( 'supports array buffers', t => {

    t.true ( areDeeplyEqual ( new Uint8Array ().buffer, new Uint8Array ().buffer ) );
    t.true ( areDeeplyEqual ( new Uint8Array ([ 1, 2, 3 ]).buffer, new Uint8Array ([ 1, 2, 3 ]).buffer ) );

    t.false ( areDeeplyEqual ( new Uint8Array ([ 1 ]).buffer, new Uint8Array ().buffer ) );
    t.false ( areDeeplyEqual ( new Uint8Array ().buffer, new Uint8Array ([ 1 ]).buffer ) );
    t.false ( areDeeplyEqual ( new Uint8Array ([ 1 ]).buffer, new Uint8Array ([ 2 ]).buffer ) );

  });

  it ( 'supports errors', t => {

    t.true ( areDeeplyEqual ( new Error (), new Error () ) );
    t.true ( areDeeplyEqual ( new Error ( 'foo' ), new Error ( 'foo' ) ) );
    t.true ( areDeeplyEqual ( new SyntaxError (), new SyntaxError () ) );
    t.true ( areDeeplyEqual ( new SyntaxError ( 'foo' ), new SyntaxError ( 'foo' ) ) );

    t.false ( areDeeplyEqual ( new Error (), new SyntaxError () ) );
    t.false ( areDeeplyEqual ( new Error ( 'foo' ), new SyntaxError ( 'foo' ) ) );

  });

  it ( 'supports objects', t => {

    const symbol = Symbol ();

    t.true ( areDeeplyEqual ( {}, {} ) );
    t.true ( areDeeplyEqual ( { foo: 123, bar: 'foo' }, { foo: 123, bar: 'foo' } ) );
    t.true ( areDeeplyEqual ( { bar: 'foo', foo: 123 }, { bar: 'foo', foo: 123 } ) );
    t.true ( areDeeplyEqual ( { foo: { bar: { baz: 123 } } }, { foo: { bar: { baz: 123 } } } ) );
    t.true ( areDeeplyEqual ( { [symbol]: 123 }, { [symbol]: 123 } ) );

    t.false ( areDeeplyEqual ( {}, [] ) );
    t.false ( areDeeplyEqual ( { value: undefined }, {} ) );
    t.false ( areDeeplyEqual ( {}, { value: undefined } ) );
    t.false ( areDeeplyEqual ( { value: 123 }, {} ) );
    t.false ( areDeeplyEqual ( {}, { value: 123 } ) );
    t.false ( areDeeplyEqual ( { foo: 123, bar: 'foo' }, { foo: 124, bar: 'foo' } ) );
    t.false ( areDeeplyEqual ( { [symbol]: 123 }, { [symbol]: 125 } ) );
    t.false ( areDeeplyEqual ( { [Symbol ()]: 123 }, { [Symbol ()]: 123 } ) );

  });

  it ( 'supports dates', t => {

    const timestamp = Date.now ();

    t.true ( areDeeplyEqual ( new Date ( -1 ), new Date ( -1 ) ) );
    t.true ( areDeeplyEqual ( new Date ( Infinity ), new Date ( Infinity ) ) );
    t.true ( areDeeplyEqual ( new Date ( timestamp ), new Date ( timestamp ) ) );

    t.false ( areDeeplyEqual ( new Date ( timestamp ), new Date ( timestamp + 1 ) ) );

  });

  it.todo ( 'supports nodes' );

  it ( 'supports maps', t => {

    t.true ( areDeeplyEqual ( new Map (), new Map () ) );
    t.true ( areDeeplyEqual ( new Map ([ ['foo', 123], ['bar', true] ]), new Map ([ ['foo', 123], ['bar', true] ]) ) );
    t.true ( areDeeplyEqual ( new Map ([ ['bar', true], ['foo', 123] ]), new Map ([ ['foo', 123], ['bar', true] ]) ) );

    t.false ( areDeeplyEqual ( new Map ([ ['foo', undefined] ]), new Map () ) );
    t.false ( areDeeplyEqual ( new Map (), new Map ([ ['foo', undefined] ]) ) );
    t.false ( areDeeplyEqual ( new Map ([ ['foo', 123] ]), new Map () ) );
    t.false ( areDeeplyEqual ( new Map (), new Map ([ ['foo', 123] ]) ) );
    t.false ( areDeeplyEqual ( new Map ([ ['foo', 123], ['bar', true] ]), new Map ([ ['foo', 124], ['bar', true] ]) ) );

  });

  it ( 'supports weakmaps', t => {

    const weakmap = new WeakMap ();

    t.true ( areDeeplyEqual ( weakmap, weakmap ) );

    t.false ( areDeeplyEqual ( new WeakMap (), new WeakMap () ) );

  });

  it ( 'supports sets', t => {

    t.true ( areDeeplyEqual ( new Set (), new Set () ) );
    t.true ( areDeeplyEqual ( new Set ([ 'foo', 'bar' ]), new Set ([ 'foo', 'bar' ]) ) );
    t.true ( areDeeplyEqual ( new Set ([ 'foo', 'bar' ]), new Set ([ 'bar', 'foo' ]) ) );
    t.true ( areDeeplyEqual ( new Set ([ {} ]), new Set ([ {} ]) ) );
    t.true ( areDeeplyEqual ( new Set ([ {}, {} ]), new Set ([ {}, {} ]) ) );
    t.true ( areDeeplyEqual ( new Set ([ new Set (), new Set () ]), new Set ([ new Set (), new Set () ]) ) );

    t.false ( areDeeplyEqual ( new Set ([ undefined ]), new Set () ) );
    t.false ( areDeeplyEqual ( new Set (), new Set ([ undefined ]) ) );
    t.false ( areDeeplyEqual ( new Set ([ 'foo' ]), new Set () ) );
    t.false ( areDeeplyEqual ( new Set (), new Set ([ 'foo' ]) ) );
    t.false ( areDeeplyEqual ( new Set ([ 'foo' ]), new Set ([ 'bar' ]) ) );
    t.false ( areDeeplyEqual ( new Set ([ {}, 123 ]), new Set ([ {}, 124 ]) ) );
    t.false ( areDeeplyEqual ( new Set ([ {}, { value: 123 } ]), new Set ([ {}, { value: 124 } ]) ) );

  });

  it ( 'supports weaksets', t => {

    const weakset = new WeakSet ();

    t.true ( areDeeplyEqual ( weakset, weakset ) );

    t.false ( areDeeplyEqual ( new WeakSet (), new WeakSet () ) );

  });

  it ( 'supports promises', t => {

    const promise = Promise.resolve ();

    t.true ( areDeeplyEqual ( promise, promise ) );

    t.false ( areDeeplyEqual ( Promise.resolve (), Promise.resolve () ) );

  });

  it ( 'supports regexes', t => {

    t.true ( areDeeplyEqual ( new RegExp ( 'foo', 'ig' ), new RegExp ( 'foo', 'ig' ) ) );

    t.false ( areDeeplyEqual ( new RegExp ( 'foo', 'ig' ), new RegExp ( '', 'ig' ) ) );
    t.false ( areDeeplyEqual ( new RegExp ( 'foo', 'ig' ), new RegExp ( 'foo', '' ) ) );
    t.false ( areDeeplyEqual ( new RegExp ( '', 'ig' ), new RegExp ( 'foo', 'ig' ) ) );
    t.false ( areDeeplyEqual ( new RegExp ( 'foo', '' ), new RegExp ( 'foo', 'ig' ) ) );

  });

  it ( 'supports typed arrays', t => {

    for ( const TypedArray of [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array] ) {

      t.true ( areDeeplyEqual ( new TypedArray (), new TypedArray () ) );
      t.true ( areDeeplyEqual ( new TypedArray ([ 1, 2, 3 ]), new TypedArray ([ 1, 2, 3 ]) ) );

      t.false ( areDeeplyEqual ( new TypedArray ([ 1 ]), new TypedArray () ) );
      t.false ( areDeeplyEqual ( new TypedArray (), new TypedArray ([ 1 ]) ) );
      t.false ( areDeeplyEqual ( new TypedArray ([ 1 ]), new TypedArray ([ 2 ]) ) );

    }

    for ( const TypedArray of [BigInt64Array, BigUint64Array] ) {

      t.true ( areDeeplyEqual ( new TypedArray (), new TypedArray () ) );
      t.true ( areDeeplyEqual ( new TypedArray ([ 1n, 2n, 3n ]), new TypedArray ([ 1n, 2n, 3n ]) ) );

      t.false ( areDeeplyEqual ( new TypedArray ([ 1n ]), new TypedArray () ) );
      t.false ( areDeeplyEqual ( new TypedArray (), new TypedArray ([ 1n ]) ) );
      t.false ( areDeeplyEqual ( new TypedArray ([ 1n ]), new TypedArray ([ 2n ]) ) );

    }

  });

  it ( 'supports custom classes', t => {

    class Foo {
      constructor ( value ) {
        this.value = value;
      }
    };

    const foo = new Foo ( 1 );

    t.true ( areDeeplyEqual ( foo, foo ) );
    t.true ( areDeeplyEqual ( new Foo (), new Foo () ) );

    t.false ( areDeeplyEqual ( new Foo ( 1 ), new Foo ( 2 ) ) );

  });

  it ( 'supports custom valueOf functions', t => {

    t.true ( areDeeplyEqual ( { valueOf: () => ({ value: 1 }) }, { valueOf: () => ({ value: 1 }) } ) );

    t.false ( areDeeplyEqual ( { valueOf: () => ({ value: 1 }) }, { valueOf: () => ({ value: 2 }) } ) );

  });

  it ( 'supports circular structures', t => {

    const circular1 = {};
    const circular2 = {};

    circular1.circular = circular1;
    circular2.circular = circular2;

    t.true ( areDeeplyEqual ( circular1, circular2 ) );

  });

});
