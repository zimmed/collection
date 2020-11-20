# @zimmed/collection

![Jest Branch Coverage](test/badge-branches.svg)
![Jest Function Coverage](test/badge-functions.svg)
![Jest Line Coverage](test/badge-lines.svg)
![Jest Statement Coverage](test/badge-statements.svg)

## About

Simple library for maintaining a collection of objects optimized for both
array-like iteration as well as direct lookup by a unique `id` property.

## Caveats

- Collection is currently mutable. There are plans to add secondary immutable
  collection library in the future.

- Records must have a unique `id` property that is either a `number` or a `string`.

## Installation

First, edit existing or create new `.npmrc` file in your project root, and add:

`@zimmed:registry=https://npm.pkg.github.com`

Then you can use:

`$ npm i --save @zimmed/collection`

## Usage (typescript)

### Basic

```typescript
import * as Collection from '@zimmed/collection';
import { v4 } from 'uuid';

interface Record {
  id: string;
  foo: number;
  bar: string;
}

function createRecord({ id = v4(), foo = 0, bar = '' }: Partial<Record> = {}): Record {
  return { id, foo, bar };
}

const records = Array(1000)
  .fill(0)
  .map((_, i) => createRecord({ foo: i }));
const collection = Collection.create(records);

console.log(collection); //-> { "89333e79-3257-44ce-a32a-23ec902190e4": { id: "89333e79-3257-44ce-a32a-23ec902190e4", foo: 0, bar: '' }, ... }
```

### Collections as Objects

Collection objects are really just plain objects with IDs mapped to records, and can be used the same way.

```typescript
console.log(collectionAsMap['89333e79-3257-44ce-a32a-23ec902190e4']); //-> { id: "89333e79-3257-44ce-a32a-23ec902190e4", foo: 0, bar: '' }
```

### Collections as Arrays

```typescript
console.log(collectionAsMap.at(collection, 0)); //-> { id: "89333e79-3257-44ce-a32a-23ec902190e4", foo: 0, bar: '' }
```

Collection maps have special, secret instance data that allows them to be used like arrays without
expensive `Object.keys/entries/values` calls each time you want to iterate. Additionally, the
extended array behavior maintains explicit ordering which will not be reflected if `Object.keys`
is called on the collection object. Instead, you should use the provided Collection methods.

If you want to change the collection's iteration order, you may want to use the following methods:

```typescript
Collection.sort(collection, (a, b) => (a.foo < b.foo ? -1 : a.foo > b.foo ? 1 : 0)); // Sort collection order by `foo` prop
const order = Collection.getOrder(collection); // Provides ordered array of collection keys.
Collection.reverse(collection); // Reverse order
Collection.setOrder(collection, order); // Restore previous order
Collection.getList(collection); // Get all records as an ordered array (alias: toArray)
```

`getOrder` and `setOrder` can thus be used to save and restore the order to a collection between runtimes if needed.
However, it would be better to save the state as an array in that case (`getList`).

Here are some functions that can help you maintain the desired order of your
collection.

```typescript
// Add records to the end of the ordered list (compare to array.push)
//  (This is also the function to use if you don't care about the order, as it is the fastest)
//  Alias: push, append, add
Collection.enqueue(
  collection,
  createRecord({ foo: -1, bar: 'new record' }),
  createRecord({ foo: -2, bar: 'another record' })
);
// If only adding one record at a time and seeking small performance gains, use:
Collection.enqueue.one(collection, createRecord({ foo: 500 }));
// Most functions that allow one or more records as arguments also have a similar `.one` function exposed that is slightly more performant for single records.

// Insert records at the front of the ordered list (compare to array.unshift)
//  Alias: unshift
Collection.insert(collection, createRecord());
// Insert record at specified index (shifts current index and siblings to the right)
Collection.insert.at(collection, 100, createRecord());

// If maintaining a sorted list, you can increase performance by using an insertion-sort (O(log n)):
Collection.sortedInsert(collection, createRecord(), createRecord(), compareFunction);

// Pop and return record from end of ordered list (array.pop)
Collection.pop(collection);
// Remove and return record from front of ordered list (compare to array.shift)
//  Alias: shift
Collection.dequeue(collection);
// Remove and return record at specified index
Collection.remove.at(collection, 42);

// Find index of record that matches search predicate (O(n))
const index = Collection.find.index(collection, (record) => record.foo === 500);
// Find index in sorted collection record using compare method (O(log n))
const index2 = Collection.search.index(collection, (record) => (record.foo > 500 ? -1 : record.foo < 500 ? 1 : 0));
// Find record in sorted collection using compare method (O(log n))
const record = Collection.search(collection, (record) => (record.foo > 500 ? -1 : record.foo < 500 ? 1 : 0));
```

Record-adding functions will update existing records (matching IDs) without
changing their position in the ordered array.

### Un-Ordered Collections

If the order of the records don't matter as much, you may prefer these
functions for managing your collection:

```typescript
// Add records
Collection.add(collection, createRecord(), createRecord());
// Remove records
Collection.remove(collection, record1.id, record2.id);
Collection.remove.by(collection, (record) => record.foo > 0);
// Find record that matches search predicate
const record = Collection.find(collection, (record) => record.foo === 500);
```

### Collection Iteration

There are several options for iterating over collections of records, all of
which do so with respect to the record order.

```typescript
for (const record of Collection.iterate(collection)) {
  // ...
}
Collection.forEach(collection, (record) => {
  // ...
});
// Or, if you prefer (for some bizarre reason)
for (let i = 0, l = Collection.length(collection); i < l; i++) {
  const record = Collection.at(collection, i);
  // ...
}
```

There are also standard functional array methods that use the same, familiar
callback signatures.

```typescript
const zeroFoo = Collection.reduce(
  collection,
  (total, record) => total - record.foo
  Collection.reduce.right(collection, (total, record) => total + record.foo, 0)
);
const bars = Collection.map(collection, record => record.bar);
const negativeRecords = Collection.filter(collection, record => record.foo < 0);

// An additional method is also provided that works like `map` but return values are applied to the
//  current record.
Collection.update(collection, record => ({ foo: record.foo * 10 })); // functional syntax
Collection.update(collection, record => {
  // imperative syntax
  record.bar = 'ayyyy';
  return record;
});
```

_Note: Keep in mind that the third argument of the functional callback that
normally returns the entire array, here provides only the array of `id`s._

### More Fun

```typescript
// Concatenate two collections of the same type into a new collection
const newCollection = Collection.concat(collectionA, collectionB);

// Get record count in collection
const count = Collection.length(collection);

// Create copy of collection (does not clone individual records)
const copy = Collection.clone(collection);

// Create copy of collection with deep copies of individual records
const deepCopy = Collection.clone.deep(collection);

// Get a slice of the ordered collection
const slice = Collection.slice(collection, 0, 5); // First 5 ordered records

// Splice an area of the ordered collection
const splice = Collection.splice(collection, 0, 5); // Removes the first 5 records from the collection and returns them

// Get collection as ordered array of records
//   Alias: toArray
const records = Collection.getList(collection);

// Move record to position
Collection.move(collection, 'key1', 3);
Collection.move.at(collection, 5, 0);

// Swap two ordered records
Collection.swap(collection, 'key1', 'key2');
Collection.swap.with.index(collection, 'key1', 5);
Collection.swap.at.with.index(collection, 3, 1);
```

### Join / Expand Collections by ID References

Perform SQL-like joins between collections with `join` function. Returns an
array of expanded records from the provided collection. The second argument
is a map of property names to their associated collection.

#### Notes

- Properties that hold arrays of record IDs need to be mapped in the second
  argument as a tuple as shown in the example. This is a temporary fix to get
  proper typescript inferrence, but an alternate solution is in the works.
- The property name map can have duplicate collections mapped to different
  property names, such as: `{ char: characters, character: characters, characters: [characters] }`
  Which will dereference `char` and `character` prop names to their associated
  `Character` record, and dereference an array of IDs to `Character`s for the
  `characters` property name.

```typescript
// Setup
const chapters = Collection.create([
  { id: 'ch1', characters: [1, 2], scene: 's1' },
  { id: 'ch2', characters: [1, 3, 9], scene: 's3' },
  { id: 'ch3', characters: [1, 2, 3], scene: 's4' },
]);
const characters = Collection.create([
  { id: 1, name: 'Booger' },
  { id: 2, name: 'Elephump' },
  { id: 3, name: 'Kingmeister' },
]);
const scenes = Collection.create([
  { id: 's1', name: 'Hot Springs' },
  { id: 's2', name: "Dragon's Lair" },
  { id: 's3', name: 'The White House' },
  { id: 's4', name: 'Prison' },
]);
const books = Collection.create([
  { id: 'book1', name: 'Extended Edition', chapters: ['ch1', 'ch2', 'ch3', 'ch10'] },
  { id: 'book2', name: 'Abridged Version', chapters: ['ch1', 'ch3'] },
]);
```

```typescript
const expandedBooks = Collection.join(books, {
  chapters: [chapters],
  characters: [characters],
  scene: scenes,
});

console.log(expandedBooks[0]);
/**
 * {
 *  id: 'book1',
 *  name: 'Extended Edition',
 *  chapters: [
 *    {
 *      id: 'ch1',
 *      scene: { id: 's1', name: 'Hot Springs' },
 *      characters: [
 *        { id: 1, name: 'Booger' },
 *        { id: 2, name: 'Elephump' },
 *      ],
 *    },
 *    {
 *      id: 'ch2',
 *      scene: { id: 's3', name: 'The White House' },
 *      characters: [
 *        { id: 1, name: 'Booger' },
 *        { id: 3, name: 'Kingmeister' },
 *        undefined,
 *      ],
 *    },
 *    {
 *      id: 'ch3',
 *      scene: { id: 's4', name: 'Prison' },
 *      characters: [
 *        { id: 1, name: 'Booger' },
 *        { id: 2, name: 'Elephump' },
 *        { id: 3, name: 'Kingmeister' },
 *      ],
 *    },
 *    undefined,
 *  ]
 * }
 */
```

If you don't mind mutating your original collection and want to optimize memory-usage,
the `expand` function will be available to use in place of `join`.

```typescript
// Given the same setup above
Collection.expand(books, {
  chapters: [chapters],
  characters: [characters],
  scene: scenes,
});

console.log(books.book1.scene); //-> { id: 's1', name: 'Hot Springs' }
```

Because `expand` mutates the original records, it can also be safely used to dereference
circular dependencies (unlike `join`). However, if using typescript, you will need to
do it two calls to avoid circular type dependency issues:

```typescript
Collection.expand(
  Collection.expand(books, {
    chapters: [chapters],
    characters: [characters],
    scene: scenes,
  }),
  { books: [books] }
);
```

## Docs

You can check out the generated API docs [here](globals.md)

## License: MIT

Copyright 2020 zimmed.io

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation file (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
