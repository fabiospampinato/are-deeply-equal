# Are Deeply Equal

Check if two values are deeply equal to each other.

It supports comparing primitives, `Array`, `Map`, `Set`, `Date`, `RegExp`, `ArrayBuffer`, `DataView`, `Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`, `BigInt64Array`, `BigUint64Array`, `Promise`, `WeakMap`, `WeakSet`, `Node`, plain objects, objects with a custom `valueOf` function, and other classes (which are treated like plain objects).

## Install

```sh
npm install are-deeply-equal
```

## Usage

```ts
import areDeeplyEqual from 'are-deeply-equal';

// Let's compare two values for deep equality

areDeeplyEqual ( [123, { value: 'foo' }], [123, { value: 'foo' }] ); // => true
areDeeplyEqual ( [true], [false] ); // => false
```

## License

MIT © Fabio Spampinato
