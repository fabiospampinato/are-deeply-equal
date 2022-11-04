
/* HELPERS */

const {is, keys, prototype} = Object;
const {hasOwnProperty, valueOf} = prototype;
const {isView} = ArrayBuffer;
const Node = globalThis.Node;

/* MAIN */

const areDeeplyEqualInner = ( a: any, b: any, _compareMap: Map<unknown, unknown> ): boolean => {

  if ( is ( a, b ) ) return true;

  if ( typeof a === 'object' && typeof b === 'object' && a !== null && b !== null ) {

    const {constructor} = a;

    if ( constructor !== b.constructor ) return false;

    if ( _compareMap.get ( a ) === b ) return true;

    _compareMap.set ( a, b );

    if ( constructor === Array ) {

      const length = a.length;

      if ( length !== b.length ) return false;

      for ( let i = length - 1; i >= 0; i-- ) {

        if ( !areDeeplyEqualInner ( a[i], b[i], _compareMap ) ) return false;

      }

      return true;

    } else if ( constructor === Map ) {

      if ( a.size !== b.size ) return false;

      for ( const [key, valueA] of a.entries () ) {

        const valueB = b.get ( key );

        if ( !areDeeplyEqualInner ( valueA, valueB, _compareMap ) ) return false;

        if ( valueB === undefined && !b.has ( key ) ) return false;

      }

      return true;

    } else if ( constructor === Set ) {

      if ( a.size !== b.size ) return false;

      for ( const [valueA] of a.entries () ) {

        if ( !b.has ( valueA ) ) return false;

      }

      return true;

    } else if ( constructor === Date ) {

      return is ( a.getTime (), b.getTime () );

    } else if ( constructor === RegExp ) {

      return a.flags === b.flags && a.source === b.source;

    } else if ( constructor === ArrayBuffer || isView ( a ) ) {

      if ( constructor === ArrayBuffer ) {

        a = new Uint8Array ( a );
        b = new Uint8Array ( b );

      }

      const length = a.length;

      if ( length !== b.length ) return false;

      for ( let i = length - 1; i >= 0; i-- ) {

        if ( a[i] !== b[i] ) return false;

      }

      return true;

    } else if ( constructor === Promise || constructor === WeakMap || constructor === WeakSet || constructor === Node ) {

      return false;

    } else if ( a.valueOf !== valueOf ) {

      return areDeeplyEqualInner ( a.valueOf (), b.valueOf (), _compareMap );

    } else {

      const properties = keys ( a );
      const length = properties.length;

      if ( length !== keys ( b ).length ) return false;

      for ( let i = length - 1; i >= 0; i-- ) {

        const property = properties[i];
        const valueA = a[property];
        const valueB = b[property];

        if ( !areDeeplyEqualInner ( valueA, valueB, _compareMap ) ) return false;

        if ( valueB === undefined && !hasOwnProperty.call ( b, property ) ) return false;

      }

      return true;

    }

  }

  return false;

};

const areDeeplyEqual = ( a: unknown, b: unknown ): boolean => {

  return areDeeplyEqualInner ( a, b, new Map () );

};

/* EXPORT */

export default areDeeplyEqual;
