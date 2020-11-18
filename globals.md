**[collection - v0.1.0](README.md)**

> Globals

# collection - v0.1.0

## Index

### Interfaces

* [IGenericRecord](interfaces/igenericrecord.md)
* [IIterator](interfaces/iiterator.md)

### Type aliases

* [Collection](globals.md#collection)
* [CollectionArray](globals.md#collectionarray)
* [CollectionData](globals.md#collectiondata)
* [CollectionMap](globals.md#collectionmap)
* [FindPredicate](globals.md#findpredicate)
* [ID](globals.md#id)
* [Iterable](globals.md#iterable)
* [IterateCallback](globals.md#iteratecallback)
* [KeyOf](globals.md#keyof)
* [ReduceCallback](globals.md#reducecallback)
* [SearchCompare](globals.md#searchcompare)
* [SortCompare](globals.md#sortcompare)
* [UpdateCallback](globals.md#updatecallback)

### Functions

* [append](globals.md#append)
* [append.one](globals.md#append.one)
* [at](globals.md#at)
* [clone](globals.md#clone)
* [clone.deep](globals.md#clone.deep)
* [concat](globals.md#concat)
* [create](globals.md#create)
* [filter](globals.md#filter)
* [find](globals.md#find)
* [find.index](globals.md#find.index)
* [forEach](globals.md#foreach)
* [insert](globals.md#insert)
* [insert.at](globals.md#insert.at)
* [insert.one](globals.md#insert.one)
* [insert.one.at](globals.md#insert.one.at)
* [iterate](globals.md#iterate)
* [length](globals.md#length)
* [map](globals.md#map)
* [pop](globals.md#pop)
* [reduce](globals.md#reduce)
* [remove](globals.md#remove)
* [remove.at](globals.md#remove.at)
* [remove.by](globals.md#remove.by)
* [remove.one](globals.md#remove.one)
* [reverse](globals.md#reverse)
* [search](globals.md#search)
* [search.index](globals.md#search.index)
* [setOrder](globals.md#setorder)
* [shift](globals.md#shift)
* [slice](globals.md#slice)
* [sort](globals.md#sort)
* [sortedInsert](globals.md#sortedinsert)
* [sortedInsert.one](globals.md#sortedinsert.one)
* [splice](globals.md#splice)
* [update](globals.md#update)

## Type aliases

### Collection

Ƭ  **Collection**\<T>: [CollectionMap](globals.md#collectionmap)\<T>

*Defined in [types.ts:13](https://github.com/zimmed/collection/blob/master/src/types.ts#L13)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | IGenericRecord |

___

### CollectionArray

Ƭ  **CollectionArray**\<T>: Array\<T>

*Defined in [types.ts:11](https://github.com/zimmed/collection/blob/master/src/types.ts#L11)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | IGenericRecord |

___

### CollectionData

Ƭ  **CollectionData**\<T>: { keys: T[]  }

*Defined in [types.ts:7](https://github.com/zimmed/collection/blob/master/src/types.ts#L7)*

#### Type parameters:

Name | Default |
------ | ------ |
`T` | ID |

#### Type declaration:

Name | Type |
------ | ------ |
`keys` | T[] |

___

### CollectionMap

Ƭ  **CollectionMap**\<T>: Record\<string, T>

*Defined in [types.ts:9](https://github.com/zimmed/collection/blob/master/src/types.ts#L9)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | IGenericRecord |

___

### FindPredicate

Ƭ  **FindPredicate**\<T>: (record: T) => boolean

*Defined in [types.ts:26](https://github.com/zimmed/collection/blob/master/src/types.ts#L26)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

___

### ID

Ƭ  **ID**: string \| number

*Defined in [types.ts:1](https://github.com/zimmed/collection/blob/master/src/types.ts#L1)*

___

### Iterable

Ƭ  **Iterable**\<T>: { [Symbol.iterator]: () => [IIterator](interfaces/iiterator.md)\<T> ; length: number  }

*Defined in [iterate.ts:8](https://github.com/zimmed/collection/blob/master/src/iterate.ts#L8)*

#### Type parameters:

Name |
------ |
`T` |

#### Type declaration:

Name | Type |
------ | ------ |
`[Symbol.iterator]` | () => [IIterator](interfaces/iiterator.md)\<T> |
`length` | number |

___

### IterateCallback

Ƭ  **IterateCallback**\<T, A>: (record: T, i: number, ids: Array\<[KeyOf](globals.md#keyof)\<[Collection](globals.md#collection)\<T>>>) => A

*Defined in [types.ts:28](https://github.com/zimmed/collection/blob/master/src/types.ts#L28)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | - |
`A` | - | any |

___

### KeyOf

Ƭ  **KeyOf**\<C>: C *extends* { [key:string]: any;  } ? string : C *extends* { [key:number]: { id: number  };  } ? number : never

*Defined in [types.ts:34](https://github.com/zimmed/collection/blob/master/src/types.ts#L34)*

#### Type parameters:

Name | Type |
------ | ------ |
`C` | [Collection](globals.md#collection) |

___

### ReduceCallback

Ƭ  **ReduceCallback**\<T, A>: (accum: A, record: T, i: number, ids: Array\<[KeyOf](globals.md#keyof)\<[Collection](globals.md#collection)\<T>>>) => A

*Defined in [types.ts:19](https://github.com/zimmed/collection/blob/master/src/types.ts#L19)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | - |
`A` | - | any |

___

### SearchCompare

Ƭ  **SearchCompare**\<T>: (record: T) => 0 \| 1 \| -1

*Defined in [types.ts:17](https://github.com/zimmed/collection/blob/master/src/types.ts#L17)*

#### Type parameters:

Name |
------ |
`T` |

___

### SortCompare

Ƭ  **SortCompare**\<T>: (a: T, b: T) => 0 \| 1 \| -1

*Defined in [types.ts:15](https://github.com/zimmed/collection/blob/master/src/types.ts#L15)*

#### Type parameters:

Name |
------ |
`T` |

___

### UpdateCallback

Ƭ  **UpdateCallback**\<T>: (record: T, i: number, ids: string[]) => Partial\<T> \| undefined

*Defined in [update.ts:4](https://github.com/zimmed/collection/blob/master/src/update.ts#L4)*

#### Type parameters:

Name |
------ |
`T` |

## Functions

### append

▸ **append**\<T>(`collection`: [Collection](globals.md#collection)\<T>, ...`records`: T[]): [Collection](globals.md#collection)\<T>

*Defined in [append.ts:17](https://github.com/zimmed/collection/blob/master/src/append.ts#L17)*

Push records to the end of the collection.

**`example`** 
```typescript
 const collection = Collection.create();

 console.log(Collection.length(collection)) //-> 0
 Collection.append(collection, { id: 'foobar', foo: 5 }, { id: 'bazbaz', foo: 10 });
 console.log(collection); //-> { foobar: { id: 'foobar', foo: 5 }, bazbaz: { id: 'bazbaz', foo: 10 } }
 console.log(Collection.length(collection)) //-> 2
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`...records` | T[] |

**Returns:** [Collection](globals.md#collection)\<T>

___

### append.one

▸ **appendOne**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `record`: T): [Collection](globals.md#collection)\<T>

*Defined in [append.ts:37](https://github.com/zimmed/collection/blob/master/src/append.ts#L37)*

Same as `append` but performance-optimized for single record pushing.

**`name`** append.one

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`record` | T |

**Returns:** [Collection](globals.md#collection)\<T>

___

### at

▸ **at**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `index`: number): T \| undefined

*Defined in [at.ts:13](https://github.com/zimmed/collection/blob/master/src/at.ts#L13)*

Get the record at the specified ordered index.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'baz' }, { id: 'bar' }]);

 console.log(Collection.at(collection, 1)); //-> { id: 'baz' }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`index` | number |

**Returns:** T \| undefined

___

### clone

▸ **clone**\<T>(`col`: [Collection](globals.md#collection)\<T>): [Collection](globals.md#collection)\<T>

*Defined in [clone.ts:17](https://github.com/zimmed/collection/blob/master/src/clone.ts#L17)*

Clone an existing collection

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 const copy = Collection.clone(collection);
 const deep = Collection.clone.deep(collection);

 console.log(collection.baz === copy.baz); //-> true
 console.log(collection.baz === deep.baz); //-> false
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`col` | [Collection](globals.md#collection)\<T> |

**Returns:** [Collection](globals.md#collection)\<T>

___

### clone.deep

▸ **cloneDeep**\<T>(`col`: [Collection](globals.md#collection)\<T>): [Collection](globals.md#collection)\<T>

*Defined in [clone.ts:30](https://github.com/zimmed/collection/blob/master/src/clone.ts#L30)*

Clone an existing collection as well as the records.

**`name`** clone.deep

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`col` | [Collection](globals.md#collection)\<T> |

**Returns:** [Collection](globals.md#collection)\<T>

___

### concat

▸ **concat**\<T>(`col1`: [Collection](globals.md#collection)\<T>, `col2`: [Collection](globals.md#collection)\<T>): [Collection](globals.md#collection)\<T>

*Defined in [concat.ts:15](https://github.com/zimmed/collection/blob/master/src/concat.ts#L15)*

Concatenate two collections into a new, combined collection.

**`example`** 
```typescript
 const a = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);
 const b = Collection.create([{ id: 'bar', data: 17 }, { id: 'foo', data: 25 }]);
 const c = Collection.concat(a, b);

 console.log(Array.from(Collection.iterate(c))); //-> [{ id: 'foo', data: 25 }, { id: 'baz', data: 0 }, { id: 'bar', data: 17 }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`col1` | [Collection](globals.md#collection)\<T> |
`col2` | [Collection](globals.md#collection)\<T> |

**Returns:** [Collection](globals.md#collection)\<T>

___

### create

▸ **create**\<T>(`initial?`: [CollectionMap](globals.md#collectionmap)\<T> \| [CollectionArray](globals.md#collectionarray)\<T>): [Collection](globals.md#collection)\<T>

*Defined in [create.ts:13](https://github.com/zimmed/collection/blob/master/src/create.ts#L13)*

Create a new collection from an id map (object), an array of objects, or an existing collection.

**`example`** 
```typescript
 console.log(Collection.create()) //-> {}
 console.log(Collection.create([{ id: 'foo' }, { id: 'bar' }])); //-> { foo: { id: 'foo' }, bar: { id: 'bar' } }
 console.log(Collection.create({ foo: { id: 'foo' }, bar: { id: 'bar' } })); //-> { foo: { id: 'foo' }, bar: { id: 'bar' } }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`initial?` | [CollectionMap](globals.md#collectionmap)\<T> \| [CollectionArray](globals.md#collectionarray)\<T> |

**Returns:** [Collection](globals.md#collection)\<T>

___

### filter

▸ **filter**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [IterateCallback](globals.md#iteratecallback)\<T, boolean>): T[]

*Defined in [filter.ts:17](https://github.com/zimmed/collection/blob/master/src/filter.ts#L17)*

Filter records in collection and return new array.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 const filtered = Collection.filter(collection, (record, i, ids) => {
   ...
   return record.v > 100;
 });

 console.log(filtered); //-> [{ id: 'bar', v: 200 }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`callback` | [IterateCallback](globals.md#iteratecallback)\<T, boolean> |

**Returns:** T[]

___

### find

▸ **find**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `predicate`: [FindPredicate](globals.md#findpredicate)\<T>): T \| undefined

*Defined in [find.ts:13](https://github.com/zimmed/collection/blob/master/src/find.ts#L13)*

Find record that matches given predicate.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);

 console.log(Collection.find(collection, record => record.v > 0)); //-> { id: 'baz', v: 5 }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`predicate` | [FindPredicate](globals.md#findpredicate)\<T> |

**Returns:** T \| undefined

___

### find.index

▸ **findIndex**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `predicate`: [FindPredicate](globals.md#findpredicate)\<T>): number

*Defined in [find.ts:35](https://github.com/zimmed/collection/blob/master/src/find.ts#L35)*

Find ordered index for record that matches given predicate.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);

 console.log(Collection.find.index(collection, record => record.v > 0)); //-> 1
```

**`name`** find.index

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`predicate` | [FindPredicate](globals.md#findpredicate)\<T> |

**Returns:** number

___

### forEach

▸ **forEach**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [IterateCallback](globals.md#iteratecallback)\<T, void>): void

*Defined in [forEach.ts:15](https://github.com/zimmed/collection/blob/master/src/forEach.ts#L15)*

Iterate over collection items using forEach syntax.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);

 Collection.forEach(collection, (record, i, ids) => {
   ...
 });
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`callback` | [IterateCallback](globals.md#iteratecallback)\<T, void> |

**Returns:** void

___

### insert

▸ **insert**\<T>(`collection`: [Collection](globals.md#collection)\<T>, ...`records`: T[]): [Collection](globals.md#collection)\<T>

*Defined in [insert.ts:16](https://github.com/zimmed/collection/blob/master/src/insert.ts#L16)*

Insert record into the front of the order.

**`example`** 
```typescript
 const collection = Collection.create([{id: 'foo'}]);

 Collection.insert(Collection, { id: 'bar' }, { id: 'baz' });
 console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'bar' }, { id: 'baz' }, { id: 'foo' }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`...records` | T[] |

**Returns:** [Collection](globals.md#collection)\<T>

___

### insert.at

▸ **insertAt**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `index`: number, ...`records`: T[]): [Collection](globals.md#collection)\<T>

*Defined in [insert.ts:57](https://github.com/zimmed/collection/blob/master/src/insert.ts#L57)*

Insert record into the ordered collection at the specified index

**`example`** 
```typescript
 const collection = Collection.create([{id: 'foo'}, {id: 'spam'}]);

 Collection.insertAt(Collection, 1, { id: 'bar' }, { id: 'baz' });
 console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }, { id: 'spam' }]
```

**`name`** insert.at

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`index` | number |
`...records` | T[] |

**Returns:** [Collection](globals.md#collection)\<T>

___

### insert.one

▸ **insertOne**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `record`: T): [Collection](globals.md#collection)\<T>

*Defined in [insert.ts:36](https://github.com/zimmed/collection/blob/master/src/insert.ts#L36)*

Same as `insert` but optimized for single record insertion.

**`name`** insert.one

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`record` | T |

**Returns:** [Collection](globals.md#collection)\<T>

___

### insert.one.at

▸ **insertOneAt**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `index`: number, `record`: T): [Collection](globals.md#collection)\<T>

*Defined in [insert.ts:72](https://github.com/zimmed/collection/blob/master/src/insert.ts#L72)*

Same as `insert.at` but optimized for single record insertion.

**`name`** insert.one.at

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`index` | number |
`record` | T |

**Returns:** [Collection](globals.md#collection)\<T>

___

### iterate

▸ **iterate**\<T>(`collection`: [Collection](globals.md#collection)\<T>): [Iterable](globals.md#iterable)\<T>

*Defined in [iterate.ts:26](https://github.com/zimmed/collection/blob/master/src/iterate.ts#L26)*

Get an iterator for the ordered collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);
 const recordArray = Array.from(Collection.iterate(collection));

 // Or
 for (const record of Collection.iterate(collection)) {
     ...
 }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** [Iterable](globals.md#iterable)\<T>

___

### length

▸ **length**\<T>(`collection`: [Collection](globals.md#collection)\<T>): number

*Defined in [length.ts:13](https://github.com/zimmed/collection/blob/master/src/length.ts#L13)*

Get the number of items in the collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);

 Collection.length(collection); //-> 3
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** number

___

### map

▸ **map**\<T, A>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [IterateCallback](globals.md#iteratecallback)\<T, A>): A[]

*Defined in [map.ts:17](https://github.com/zimmed/collection/blob/master/src/map.ts#L17)*

Map over records in collection and return new array.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 const recordValues = Collection.map(collection, (record, i, ids) => {
   ...
   return record.v;
 });

 console.log(recordValues); //-> [100, 200, 3.14]
```

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | - |
`A` | - | any |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`callback` | [IterateCallback](globals.md#iteratecallback)\<T, A> |

**Returns:** A[]

___

### pop

▸ **pop**\<T>(`collection`: [Collection](globals.md#collection)\<T>): T \| undefined

*Defined in [pop.ts:14](https://github.com/zimmed/collection/blob/master/src/pop.ts#L14)*

Pop the last ordered record from the collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);

 console.log(Collection.pop(collection)); //-> { id: 'baz', data: 0 }
 console.log(collection); //-> { foo: { id: 'foo', data: 5 } }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** T \| undefined

___

### reduce

▸ **reduce**\<T, A>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [ReduceCallback](globals.md#reducecallback)\<T, A>, `initialValue`: A): A

*Defined in [reduce.ts:17](https://github.com/zimmed/collection/blob/master/src/reduce.ts#L17)*

Reduce records in collection

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);
 const total = Collection.reduce(collection, (accum, record, i, ids) => {
   ...
   return accum + record.v;
 }, 0);

 console.log(total); //-> 303.14
```

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | - |
`A` | - | any |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`callback` | [ReduceCallback](globals.md#reducecallback)\<T, A> |
`initialValue` | A |

**Returns:** A

___

### remove

▸ **remove**\<T>(`collection`: [Collection](globals.md#collection)\<T>, ...`recordIds`: Array\<keyof *typeof* collection>): T[]

*Defined in [remove.ts:15](https://github.com/zimmed/collection/blob/master/src/remove.ts#L15)*

Remove the specified IDs from the collection and return the associated records.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'baz' }, { id: 'bar' }]);

 console.log(Collection.remove(collection, 'foo', 'bar')); //-> [{ id: 'foo' }, { id: 'bar' }]
 console.log(collection); //-> { baz: { id: 'baz' } }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`...recordIds` | Array\<keyof *typeof* collection> |

**Returns:** T[]

___

### remove.at

▸ **removeAt**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `index`: number): T \| undefined

*Defined in [remove.ts:101](https://github.com/zimmed/collection/blob/master/src/remove.ts#L101)*

Remove the record at the specified ordered index and return it.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'baz' }, { id: 'bar' }]);

 console.log(Collection.remove.at(collection, 1)); //-> { id: 'baz' }
 console.log(collection); //-> { foo: { id: 'foo' }, bar: { id: 'bar' } }
```

**`name`** remove.at

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`index` | number |

**Returns:** T \| undefined

___

### remove.by

▸ **removeBy**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `predicate`: [FindPredicate](globals.md#findpredicate)\<T>): T[]

*Defined in [remove.ts:69](https://github.com/zimmed/collection/blob/master/src/remove.ts#L69)*

Remove the matching records from the collection and return them.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: 1 }, { id: 'baz', v: 2 }, { id: 'bar', v: 3 }]);

 console.log(Collection.remove.by(collection, r => r.v > 1)); //-> [{ id: 'baz', v: 2 }, { id: 'bar', v: 3 }]
 console.log(collection); //-> { foo: { id: 'foo', v: 1 } }
```

**`name`** remove.by

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`predicate` | [FindPredicate](globals.md#findpredicate)\<T> |

**Returns:** T[]

___

### remove.one

▸ **removeOne**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `recordId`: keyof *typeof* collection): undefined \| T

*Defined in [remove.ts:40](https://github.com/zimmed/collection/blob/master/src/remove.ts#L40)*

Same as `remove` but optimized to handle a single record ID at a time.

**`name`** remove.one

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`recordId` | keyof *typeof* collection |

**Returns:** undefined \| T

___

### reverse

▸ **reverse**\<T>(`collection`: [Collection](globals.md#collection)\<T>): *typeof* collection

*Defined in [reverse.ts:7](https://github.com/zimmed/collection/blob/master/src/reverse.ts#L7)*

Reverse the order of collection IDs.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** *typeof* collection

___

### search

▸ **search**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `compare`: [SearchCompare](globals.md#searchcompare)\<T>): T \| undefined

*Defined in [search.ts:20](https://github.com/zimmed/collection/blob/master/src/search.ts#L20)*

Find record that matches given compare method
 Rather than searching in O(n) time using `find`, if the collection is already sorted, you can use
 this method to search in O(log n) time.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);

 console.log(Collection.search(collection, record => record.v < 5 ? 1 : record.v > 5 ? -1 : 0)); //-> { id: 'baz', v: 5 }
 // Note that looking for a non-specific match isn't gauranteed to find the first value that matches from the left,
 //  Although it will always return the same record for the same ordered collection.
 console.log(Collection.search(collection, record => record.v < 0 ? 1 : 0)); //-> { id: 'baz', v: 5 } | { id: 'bar', v: 10 }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`compare` | [SearchCompare](globals.md#searchcompare)\<T> |

**Returns:** T \| undefined

___

### search.index

▸ **searchIndex**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `compare`: [SearchCompare](globals.md#searchcompare)\<T>): number

*Defined in [search.ts:44](https://github.com/zimmed/collection/blob/master/src/search.ts#L44)*

Find ordered index for record that matches given compare method.
 Like search, works in O(log n) time, but is not gauranteed to find the first match from the left if a non-specific
 match is provided.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: -1 }, { id: 'baz', v: 5 }, { id: 'bar', v: 10 }]);

 console.log(Collection.search.index(collection, record => record.v < 5 ? 1 : record.v > 5 ? -1 : 0)); //-> 1
```

**`name`** search.index

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`compare` | [SearchCompare](globals.md#searchcompare)\<T> |

**Returns:** number

___

### setOrder

▸ **setOrder**\<T>(`collection`: [Collection](globals.md#collection)\<T>): Array\<keyof *typeof* collection>

*Defined in [getOrder.ts:13](https://github.com/zimmed/collection/blob/master/src/getOrder.ts#L13)*

Get the order of collection IDs.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);

 Collection.getOrder(collection); //-> ['foo', 'bar', 'baz'];
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** Array\<keyof *typeof* collection>

___

### shift

▸ **shift**\<T>(`collection`: [Collection](globals.md#collection)\<T>): T \| undefined

*Defined in [shift.ts:14](https://github.com/zimmed/collection/blob/master/src/shift.ts#L14)*

Shift/dequeue the first ordered record from the collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);

 console.log(Collection.shift(collection)); //-> { id: 'foo', data: 5 }
 console.log(collection); //-> { baz: { id: 'baz', data: 0 } }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** T \| undefined

___

### slice

▸ **slice**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `start?`: number, `end?`: undefined \| number): T[]

*Defined in [slice.ts:14](https://github.com/zimmed/collection/blob/master/src/slice.ts#L14)*

Concatenate two collections into a new, combined collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);

 console.log(Collection.slice(collection, 1, 1)); //-> [{ id: 'baz', data: 0 }]
 console.log(collection); //-> { foo: { id: 'foo', data: 5 }, baz: { id: 'baz', data: 0 } }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> | - |
`start` | number | 0 |
`end?` | undefined \| number | - |

**Returns:** T[]

___

### sort

▸ **sort**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `compare?`: undefined \| (a: T, b: T) => 0 \| -1 \| 1): *typeof* collection

*Defined in [sort.ts:15](https://github.com/zimmed/collection/blob/master/src/sort.ts#L15)*

Sort the order of records in the collection with the specified compare function.
If no compare function specified, will sort by ID in ascending alphabetical order.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', num: 7 }, { id: 'bar', num: 10 }, { id: 'baz', num: 1 }]);

 Collection.sort(collection, (a, b) => a.num < b.num ? -1 : a.num > b.num ? 1 : 0);
 console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'baz', num: 1 }, { id: 'foo', num: 7 }, { id: 'bar', num: 10 }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`compare?` | undefined \| (a: T, b: T) => 0 \| -1 \| 1 |

**Returns:** *typeof* collection

___

### sortedInsert

▸ **sortedInsert**\<T>(`collection`: [Collection](globals.md#collection)\<T>, ...`args`: Array\<T \| [SortCompare](globals.md#sortcompare)\<T>>): [Collection](globals.md#collection)\<T>

*Defined in [sortedInsert.ts:22](https://github.com/zimmed/collection/blob/master/src/sortedInsert.ts#L22)*

Insertion sort: insert record into sorted order using the specified compare function, or the default, alphabetical ID sort.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', num: 1 }, { id: 'bar', num: 5 }, { id: 'baz', num: 10 }]);

 Collection.sortInsert(collection, { id: 'eggs', num: 11 }, { id: 'spam', num: 2.3 }, (a, b) => a.num > b.num ? -1 : a.num < b.num ? 1 : 0);
 console.log(Array.from(Collection.iterate(collection))); //-> [
   { id: 'baz', num: 1 },
   { id: 'spam', num: 2.3 },
   { id: 'foo', num: 7 },
   { id: 'bar', num: 10 },
   { id: 'eggs', num: 11 },
 ]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`...args` | Array\<T \| [SortCompare](globals.md#sortcompare)\<T>> |

**Returns:** [Collection](globals.md#collection)\<T>

___

### sortedInsert.one

▸ **one**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `record`: T, `compare?`: [SortCompare](globals.md#sortcompare)\<T>): [Collection](globals.md#collection)\<T>

*Defined in [sortedInsert.ts:44](https://github.com/zimmed/collection/blob/master/src/sortedInsert.ts#L44)*

Same as `sortInsert` but optimized for inserting one record at a time.

**`name`** sortedInsert.one

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`record` | T |
`compare?` | [SortCompare](globals.md#sortcompare)\<T> |

**Returns:** [Collection](globals.md#collection)\<T>

___

### splice

▸ **splice**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `start?`: number, `count?`: undefined \| number): T[]

*Defined in [splice.ts:14](https://github.com/zimmed/collection/blob/master/src/splice.ts#L14)*

Concatenate two collections into a new, combined collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', data: 5 }, { id: 'baz', data: 0 }]);

 console.log(Collection.splice(collection, 1, 1)); //-> [{ id: 'baz', data: 0 }]
 console.log(collection); //-> { foo: { id: 'foo', data: 5 } }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> | - |
`start` | number | 0 |
`count?` | undefined \| number | - |

**Returns:** T[]

___

### update

▸ **update**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [UpdateCallback](globals.md#updatecallback)\<T>): *typeof* collection

*Defined in [update.ts:20](https://github.com/zimmed/collection/blob/master/src/update.ts#L20)*

Map over and update records in collection.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', v: 100 }, { id: 'bar', v: 200 }, { id: 'baz', v: 3.14 }]);

 Collection.update(collection, (record, i, ids) => {
   ...
   { v: record.v * 10 };
 });

 console.log(collection.baz.v); //-> 31.4
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`callback` | [UpdateCallback](globals.md#updatecallback)\<T> |

**Returns:** *typeof* collection
