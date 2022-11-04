
/* IMPORT */

import benchmark from 'benchloop';
import areDeeplyEqual from '../dist/index.js';

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 5_000,
  log: 'compact'
});

benchmark ({
  name: 'regular primitives',
  fn: () => {

    areDeeplyEqual ( null, null );
    areDeeplyEqual ( undefined, undefined );
    areDeeplyEqual ( 'foo', 'foo' );
    areDeeplyEqual ( 123, 123 );
    areDeeplyEqual ( true, true );
    areDeeplyEqual ( false, false );
    areDeeplyEqual ( Symbol.for ( 'foo' ), Symbol.for ( 'foo' ) );
    areDeeplyEqual ( 123n, 123n );

    areDeeplyEqual ( null, undefined );
    areDeeplyEqual ( 'foo', 'bar' );
    areDeeplyEqual ( 123, -123 );
    areDeeplyEqual ( true, false );
    areDeeplyEqual ( false, 0 );
    areDeeplyEqual ( Symbol (), Symbol () );
    areDeeplyEqual ( 123n, -123n );

  }
});

benchmark ({
  name: 'special primitives',
  fn: () => {

    areDeeplyEqual ( NaN, NaN );
    areDeeplyEqual ( Infinity, Infinity );
    areDeeplyEqual ( -Infinity, -Infinity );
    areDeeplyEqual ( 0, 0 );
    areDeeplyEqual ( -0, -0 );

    areDeeplyEqual ( NaN, Infinity );
    areDeeplyEqual ( Infinity, -Infinity );
    areDeeplyEqual ( 0, -0 );

  }
});

benchmark ({
  name: 'boxed primitives',
  fn: () => {

    areDeeplyEqual ( Object ( 'foo' ), Object ( 'foo' ) );
    areDeeplyEqual ( Object ( 123 ), Object ( 123 ) );
    areDeeplyEqual ( Object ( true ), Object ( true ) );
    areDeeplyEqual ( Object ( 123n ), Object ( 123n ) );

    areDeeplyEqual ( Object ( 'foo' ), Object ( 'bar' ) );
    areDeeplyEqual ( Object ( 123 ), Object ( -123 ) );
    areDeeplyEqual ( Object ( true ), Object ( false ) );
    areDeeplyEqual ( Object ( false ), Object ( 0 ) );
    areDeeplyEqual ( Object ( 123n ), Object ( -123n ) );

  }
});

benchmark ({
  name: 'arrays',
  fn: () => {

    areDeeplyEqual ( [], [] );
    areDeeplyEqual ( [123, 'foo', true], [123, 'foo', true] );
    areDeeplyEqual ( [[[123]]], [[[123]]] );

    areDeeplyEqual ( [undefined], [] );
    areDeeplyEqual ( [], [undefined] );
    areDeeplyEqual ( ['foo'], [] );
    areDeeplyEqual ( [], ['foo'] );
    areDeeplyEqual ( [[[123]]], [[[124]]] );

  }
});

benchmark ({
  name: 'array buffers',
  fn: () => {

    areDeeplyEqual ( new Uint8Array ().buffer, new Uint8Array ().buffer );
    areDeeplyEqual ( new Uint8Array ([ 1, 2, 3 ]).buffer, new Uint8Array ([ 1, 2, 3 ]).buffer );

    areDeeplyEqual ( new Uint8Array ([ 1 ]).buffer, new Uint8Array ().buffer );
    areDeeplyEqual ( new Uint8Array ().buffer, new Uint8Array ([ 1 ]).buffer );
    areDeeplyEqual ( new Uint8Array ([ 1 ]).buffer, new Uint8Array ([ 2 ]).buffer );

  }
});

benchmark ({
  name: 'errors',
  fn: () => {

    areDeeplyEqual ( new Error (), new Error () );
    areDeeplyEqual ( new Error ( 'foo' ), new Error ( 'foo' ) );
    areDeeplyEqual ( new SyntaxError (), new SyntaxError () );
    areDeeplyEqual ( new SyntaxError ( 'foo' ), new SyntaxError ( 'foo' ) );

    areDeeplyEqual ( new Error (), new SyntaxError () );
    areDeeplyEqual ( new Error ( 'foo' ), new SyntaxError ( 'foo' ) );

  }
});

benchmark ({
  name: 'objects',
  fn: () => {

    areDeeplyEqual ( {}, {} );
    areDeeplyEqual ( { foo: 123, bar: 'foo' }, { foo: 123, bar: 'foo' } );
    areDeeplyEqual ( { bar: 'foo', foo: 123 }, { bar: 'foo', foo: 123 } );
    areDeeplyEqual ( { foo: { bar: { baz: 123 } } }, { foo: { bar: { baz: 123 } } } );

    areDeeplyEqual ( { value: undefined }, {} );
    areDeeplyEqual ( {}, { value: undefined } );
    areDeeplyEqual ( { value: 123 }, {} );
    areDeeplyEqual ( {}, { value: 123 } );
    areDeeplyEqual ( { foo: 123, bar: 'foo' }, { foo: 124, bar: 'foo' } );

  }
});

benchmark ({
  name: 'dates',
  fn: () => {

    const timestamp = Date.now ();

    areDeeplyEqual ( new Date ( -1 ), new Date ( -1 ) );
    areDeeplyEqual ( new Date ( timestamp ), new Date ( timestamp ) );

    areDeeplyEqual ( new Date ( timestamp ), new Date ( timestamp + 1 ) );

  }
});

benchmark ({
  name: 'maps',
  fn: () => {

    areDeeplyEqual ( new Map (), new Map () );
    areDeeplyEqual ( new Map ([ ['foo', 123], ['bar', true] ]), new Map ([ ['foo', 123], ['bar', true] ]) );
    areDeeplyEqual ( new Map ([ ['bar', true], ['foo', 123] ]), new Map ([ ['foo', 123], ['bar', true] ]) );

    areDeeplyEqual ( new Map ([ ['foo', undefined] ]), new Map () );
    areDeeplyEqual ( new Map (), new Map ([ ['foo', undefined] ]) );
    areDeeplyEqual ( new Map ([ ['foo', 123] ]), new Map () );
    areDeeplyEqual ( new Map (), new Map ([ ['foo', 123] ]) );
    areDeeplyEqual ( new Map ([ ['foo', 123], ['bar', true] ]), new Map ([ ['foo', 124], ['bar', true] ]) );

  }
});

benchmark ({
  name: 'weakmaps',
  fn: () => {

    const weakmap = new WeakMap ();

    areDeeplyEqual ( weakmap, weakmap );

    areDeeplyEqual ( new WeakMap (), new WeakMap () );

  }
});

benchmark ({
  name: 'sets',
  fn: () => {

    areDeeplyEqual ( new Set (), new Set () );
    areDeeplyEqual ( new Set ([ 'foo', 'bar' ]), new Set ([ 'foo', 'bar' ]) );
    areDeeplyEqual ( new Set ([ 'foo', 'bar' ]), new Set ([ 'bar', 'foo' ]) );

    areDeeplyEqual ( new Set ([ undefined ]), new Set () );
    areDeeplyEqual ( new Set (), new Set ([ undefined ]) );
    areDeeplyEqual ( new Set ([ 'foo' ]), new Set () );
    areDeeplyEqual ( new Set (), new Set ([ 'foo' ]) );
    areDeeplyEqual ( new Set ([ 'foo' ]), new Set ([ 'bar' ]) );

  }
});

benchmark ({
  name: 'weaksets',
  fn: () => {

    const weakset = new WeakSet ();

    areDeeplyEqual ( weakset, weakset );

    areDeeplyEqual ( new WeakSet (), new WeakSet () );

  }
});

benchmark ({
  name: 'supports promises',
  fn: () => {

    const promise = Promise.resolve ();

    areDeeplyEqual ( promise, promise );

    areDeeplyEqual ( Promise.resolve (), Promise.resolve () );

  }
});

benchmark ({
  name: 'supports regexes',
  fn: () => {

    areDeeplyEqual ( new RegExp ( 'foo', 'ig' ), new RegExp ( 'foo', 'ig' ) );

    areDeeplyEqual ( new RegExp ( 'foo', 'ig' ), new RegExp ( '', 'ig' ) );
    areDeeplyEqual ( new RegExp ( 'foo', 'ig' ), new RegExp ( 'foo', '' ) );
    areDeeplyEqual ( new RegExp ( '', 'ig' ), new RegExp ( 'foo', 'ig' ) );
    areDeeplyEqual ( new RegExp ( 'foo', '' ), new RegExp ( 'foo', 'ig' ) );

  }
});

benchmark ({
  name: 'supports typed arrays',
  fn: () => {

    for ( const TypedArray of [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array] ) {

      areDeeplyEqual ( new TypedArray (), new TypedArray () );
      areDeeplyEqual ( new TypedArray ([ 1, 2, 3 ]), new TypedArray ([ 1, 2, 3 ]) );

      areDeeplyEqual ( new TypedArray ([ 1 ]), new TypedArray () );
      areDeeplyEqual ( new TypedArray (), new TypedArray ([ 1 ]) );
      areDeeplyEqual ( new TypedArray ([ 1 ]), new TypedArray ([ 2 ]) );

    }

    for ( const TypedArray of [BigInt64Array, BigUint64Array] ) {

      areDeeplyEqual ( new TypedArray (), new TypedArray () );
      areDeeplyEqual ( new TypedArray ([ 1n, 2n, 3n ]), new TypedArray ([ 1n, 2n, 3n ]) );

      areDeeplyEqual ( new TypedArray ([ 1n ]), new TypedArray () );
      areDeeplyEqual ( new TypedArray (), new TypedArray ([ 1n ]) );
      areDeeplyEqual ( new TypedArray ([ 1n ]), new TypedArray ([ 2n ]) );

    }

  }
});

benchmark ({
  name: 'custom classes',
  fn: () => {

    class Foo {
      constructor ( value ) {
        this.value = value;
      }
    };

    const foo = new Foo ( 1 );

    areDeeplyEqual ( foo, foo );
    areDeeplyEqual ( new Foo (), new Foo () );

    areDeeplyEqual ( new Foo ( 1 ), new Foo ( 2 ) );

  }
});

benchmark ({
  name: 'valueOf',
  fn: () => {

    areDeeplyEqual ( { valueOf: () => ({ value: 1 }) }, { valueOf: () => ({ value: 1 }) } );

    areDeeplyEqual ( { valueOf: () => ({ value: 1 }) }, { valueOf: () => ({ value: 2 }) } );

  }
});

benchmark ({
  name: 'circular structures',
  fn: () => {

    const circular1 = {};
    const circular2 = {};

    circular1.circular = circular1;
    circular2.circular = circular2;

    areDeeplyEqual ( circular1, circular2 );

  }
});

benchmark.summary ();
