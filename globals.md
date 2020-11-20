**[collection - v0.3.1](README.md)**

> Globals

# collection - v0.3.1

## Index

### Interfaces

* [IGenericRecord](interfaces/igenericrecord.md)
* [IIterator](interfaces/iiterator.md)

### Type aliases

* [Collection](globals.md#collection)
* [CollectionData](globals.md#collectiondata)
* [CollectionEntry](globals.md#collectionentry)
* [CollectionEntryMap](globals.md#collectionentrymap)
* [FindPredicate](globals.md#findpredicate)
* [ID](globals.md#id)
* [IdOf](globals.md#idof)
* [Iterable](globals.md#iterable)
* [IterateCallback](globals.md#iteratecallback)
* [KeyOf](globals.md#keyof)
* [ReduceCallback](globals.md#reducecallback)
* [Ref](globals.md#ref)
* [RefForCollection](globals.md#refforcollection)
* [SearchCompare](globals.md#searchcompare)
* [SortCompare](globals.md#sortcompare)
* [UnionToIntersection](globals.md#uniontointersection)

### Functions

* [append](globals.md#append)
* [append.one](globals.md#append.one)
* [at](globals.md#at)
* [clone](globals.md#clone)
* [clone.deep](globals.md#clone.deep)
* [concat](globals.md#concat)
* [create](globals.md#create)
* [expand](globals.md#expand)
* [filter](globals.md#filter)
* [find](globals.md#find)
* [find.index](globals.md#find.index)
* [forEach](globals.md#foreach)
* [getList](globals.md#getlist)
* [getOrder](globals.md#getorder)
* [insert](globals.md#insert)
* [insert.at](globals.md#insert.at)
* [insert.one](globals.md#insert.one)
* [insert.one.at](globals.md#insert.one.at)
* [iterate](globals.md#iterate)
* [join](globals.md#join)
* [length](globals.md#length)
* [map](globals.md#map)
* [move](globals.md#move)
* [move.at](globals.md#move.at)
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
* [swap.at.with](globals.md#swap.at.with)
* [swap.at.with.index](globals.md#swap.at.with.index)
* [swap.with](globals.md#swap.with)
* [swap.with.index](globals.md#swap.with.index)
* [update](globals.md#update)

## Type aliases

### Collection

Ƭ  **Collection**\<T>: Record\<IGenericRecord[\"id\"], T>

*Defined in [types.ts:10](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L10)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | IGenericRecord |

___

### CollectionData

Ƭ  **CollectionData**\<T>: { keys: T[]  }

*Defined in [types.ts:8](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L8)*

#### Type parameters:

Name |
------ |
`T` |

#### Type declaration:

Name | Type |
------ | ------ |
`keys` | T[] |

___

### CollectionEntry

Ƭ  **CollectionEntry**\<C>: C \| C[]

*Defined in [types.ts:75](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L75)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`C` | [Collection](globals.md#collection) | Collection |

___

### CollectionEntryMap

Ƭ  **CollectionEntryMap**\<C>: Record\<string, [CollectionEntry](globals.md#collectionentry)\<C>>

*Defined in [types.ts:77](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L77)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`C` | [Collection](globals.md#collection) | Collection |

___

### FindPredicate

Ƭ  **FindPredicate**\<T>: (record: T) => boolean

*Defined in [types.ts:25](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L25)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

___

### ID

Ƭ  **ID**: string \| number

*Defined in [types.ts:2](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L2)*

___

### IdOf

Ƭ  **IdOf**\<T>: T *extends* { id: *infer* I  } ? I : never

*Defined in [types.ts:27](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L27)*

#### Type parameters:

Name |
------ |
`T` |

___

### Iterable

Ƭ  **Iterable**\<T>: { [Symbol.iterator]: () => [IIterator](interfaces/iiterator.md)\<T> ; length: number  }

*Defined in [iterate.ts:8](https://github.com/zimmed/collection/blob/2d256cd/src/iterate.ts#L8)*

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

Ƭ  **IterateCallback**\<T, A>: (record: T, i: number, ids: Array\<[IdOf](globals.md#idof)\<T>>) => A

*Defined in [types.ts:19](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L19)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | - |
`A` | - | any |

___

### KeyOf

Ƭ  **KeyOf**\<C>: C *extends* { [key:string]: any;  } ? string : C *extends* { [key:number]: { id: number  };  } ? number : never

*Defined in [types.ts:29](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L29)*

#### Type parameters:

Name | Type |
------ | ------ |
`C` | [Collection](globals.md#collection) |

___

### ReduceCallback

Ƭ  **ReduceCallback**\<T, A>: (accum: A, record: T, i: number, ids: Array\<[IdOf](globals.md#idof)\<T>>) => A

*Defined in [types.ts:12](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L12)*

#### Type parameters:

Name | Type | Default |
------ | ------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) | - |
`A` | - | any |

___

### Ref

Ƭ  **Ref**\<N, T>: T *extends* { id: *infer* I  } ? { id: I ; name: N  } : never

*Defined in [types.ts:35](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L35)*

#### Type parameters:

Name | Type |
------ | ------ |
`N` | string |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

___

### RefForCollection

Ƭ  **RefForCollection**\<N, C>: C *extends* Collection\<*infer* T> ? Ref\<N, T> : never

*Defined in [types.ts:37](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L37)*

#### Type parameters:

Name | Type |
------ | ------ |
`N` | string |
`C` | - |

___

### SearchCompare

Ƭ  **SearchCompare**\<T>: (record: T) => 0 \| 1 \| -1

*Defined in [types.ts:23](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L23)*

#### Type parameters:

Name |
------ |
`T` |

___

### SortCompare

Ƭ  **SortCompare**\<T>: (a: T, b: T) => 0 \| 1 \| -1

*Defined in [types.ts:21](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L21)*

#### Type parameters:

Name |
------ |
`T` |

___

### UnionToIntersection

Ƭ  **UnionToIntersection**\<U>: U *extends* any ? (k: U) => void : never *extends* (k: *infer* I) => void ? I : never

*Defined in [types.ts:39](https://github.com/zimmed/collection/blob/2d256cd/src/types.ts#L39)*

#### Type parameters:

Name |
------ |
`U` |

## Functions

### append

▸ **append**\<T>(`collection`: [Collection](globals.md#collection)\<T>, ...`records`: T[]): [Collection](globals.md#collection)\<T>

*Defined in [append.ts:17](https://github.com/zimmed/collection/blob/2d256cd/src/append.ts#L17)*

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

*Defined in [append.ts:37](https://github.com/zimmed/collection/blob/2d256cd/src/append.ts#L37)*

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

*Defined in [at.ts:13](https://github.com/zimmed/collection/blob/2d256cd/src/at.ts#L13)*

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

*Defined in [clone.ts:17](https://github.com/zimmed/collection/blob/2d256cd/src/clone.ts#L17)*

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

*Defined in [clone.ts:30](https://github.com/zimmed/collection/blob/2d256cd/src/clone.ts#L30)*

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

*Defined in [concat.ts:15](https://github.com/zimmed/collection/blob/2d256cd/src/concat.ts#L15)*

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

▸ **create**\<T>(`initial?`: [Collection](globals.md#collection)\<T> \| T[]): [Collection](globals.md#collection)\<T>

*Defined in [create.ts:13](https://github.com/zimmed/collection/blob/2d256cd/src/create.ts#L13)*

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
`initial?` | [Collection](globals.md#collection)\<T> \| T[] |

**Returns:** [Collection](globals.md#collection)\<T>

___

### expand

▸ **expand**\<T, M>(`base`: [Collection](globals.md#collection)\<T>, `collections`: M): [Collection](globals.md#collection)\<Obj\<{ id: T[\"id\"]  } & TransformTypes\<T, GetTypeMap\<*typeof* collections>>>>

*Defined in [expand.ts:30](https://github.com/zimmed/collection/blob/2d256cd/src/expand.ts#L30)*

Updates the collection by expanding ID references with their collection records.

Note: Because this method mutates the records themselves, it can track records that have already
been expanded. Thus, unlike `Collection.join`, `Collection.expand` can be used with circular
references, safely.

**`example`** 
```typescript
const ays = Collection.create([{ id: 'foo', bees: ['a'], cee: 1 }, { id: 'bar', bees: ['a', 'b'], cee: 2 }]);
const bees = Collection.create([{ id: 'a', value: 10, cee: 3 }, { id: 'b', value: 20, cee: 3 }, { id: 'c', value: 40, cee: 3 }]);
const cees = Collection.create([{ id: 1 }, { id: 2 }, { id: 3 }]);

const expanded = Collection.expand(ays, { bees: [bees], cee: cees });
console.log(expanded === ays); //-> true
console.log(expanded); //-> {
//   id: 'bar',
//   bees: [{ id: 'a', value: 10, cee: { id: 3 } }, { id: 'b', value: 20, cee: { id: 3 } }],
//   cee: { id: 2 } },
// }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |
`M` | [CollectionEntryMap](globals.md#collectionentrymap) |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`base` | [Collection](globals.md#collection)\<T> | The collection to expand |
`collections` | M | A map of property names to their associated collection (see README.md for more info) |

**Returns:** [Collection](globals.md#collection)\<Obj\<{ id: T[\"id\"]  } & TransformTypes\<T, GetTypeMap\<*typeof* collections>>>>

The original (now expanded) Collection.

___

### filter

▸ **filter**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [IterateCallback](globals.md#iteratecallback)\<T, boolean>): T[]

*Defined in [filter.ts:17](https://github.com/zimmed/collection/blob/2d256cd/src/filter.ts#L17)*

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

*Defined in [find.ts:13](https://github.com/zimmed/collection/blob/2d256cd/src/find.ts#L13)*

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

*Defined in [find.ts:35](https://github.com/zimmed/collection/blob/2d256cd/src/find.ts#L35)*

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

*Defined in [forEach.ts:15](https://github.com/zimmed/collection/blob/2d256cd/src/forEach.ts#L15)*

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

### getList

▸ **getList**\<T>(`collection`: [Collection](globals.md#collection)\<T>): T[]

*Defined in [getList.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/getList.ts#L14)*

Get the order of collection IDs.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);

 Collection.getList(collection); //-> [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |

**Returns:** T[]

___

### getOrder

▸ **getOrder**\<T>(`collection`: [Collection](globals.md#collection)\<T>): Array\<keyof *typeof* collection>

*Defined in [getOrder.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/getOrder.ts#L14)*

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

### insert

▸ **insert**\<T>(`collection`: [Collection](globals.md#collection)\<T>, ...`records`: T[]): [Collection](globals.md#collection)\<T>

*Defined in [insert.ts:16](https://github.com/zimmed/collection/blob/2d256cd/src/insert.ts#L16)*

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

*Defined in [insert.ts:53](https://github.com/zimmed/collection/blob/2d256cd/src/insert.ts#L53)*

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

*Defined in [insert.ts:36](https://github.com/zimmed/collection/blob/2d256cd/src/insert.ts#L36)*

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

*Defined in [insert.ts:84](https://github.com/zimmed/collection/blob/2d256cd/src/insert.ts#L84)*

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

*Defined in [iterate.ts:26](https://github.com/zimmed/collection/blob/2d256cd/src/iterate.ts#L26)*

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

### join

▸ **join**\<T, M>(`base`: [Collection](globals.md#collection)\<T>, `collections`: M): TransformTypes\<T, GetTypeMap\<*typeof* collections>>[]

*Defined in [join.ts:28](https://github.com/zimmed/collection/blob/2d256cd/src/join.ts#L28)*

Returns array of collection records with id refs replaced by the actual records.

Note: This function does not check for recursive structures and will attempt to
resolve references until it hits a process memory overflow, so use it with caution.

**`example`** 
```typescript
const ays = Collection.create([{ id: 'foo', bees: ['a'], cee: 1 }, { id: 'bar', bees: ['a', 'b'], cee: 2 }]);
const bees = Collection.create([{ id: 'a', value: 10, cee: 3 }, { id: 'b', value: 20, cee: 3 }, { id: 'c', value: 40, cee: 3 }]);
const cees = Collection.create([{ id: 1 }, { id: 2 }, { id: 3 }]);

const joinedAys = Collection.join(ays, { bees: [bees], cee: cees });
console.log(joinedAys[1]); //-> {
//   id: 'bar',
//   bees: [{ id: 'a', value: 10, cee: { id: 3 } }, { id: 'b', value: 20, cee: { id: 3 } }],
//   cee: { id: 2 } },
// }
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |
`M` | [CollectionEntryMap](globals.md#collectionentrymap) |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`base` | [Collection](globals.md#collection)\<T> | The collection records to expand |
`collections` | M | A map of property names to their associated collection (see README.md for more info) |

**Returns:** TransformTypes\<T, GetTypeMap\<*typeof* collections>>[]

Ordered array of joined records

___

### length

▸ **length**\<T>(`collection`: [Collection](globals.md#collection)\<T>): number

*Defined in [length.ts:13](https://github.com/zimmed/collection/blob/2d256cd/src/length.ts#L13)*

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

*Defined in [map.ts:17](https://github.com/zimmed/collection/blob/2d256cd/src/map.ts#L17)*

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

### move

▸ **move**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `id`: T[\"id\"], `index`: number): [Collection](globals.md#collection)\<T>

*Defined in [move.ts:21](https://github.com/zimmed/collection/blob/2d256cd/src/move.ts#L21)*

Pick record by id and insert it into the index provided.

Note: Because the function squashes the empty space left by the pick, if the specified index is greater than the starting index,
the final index of the record will be the specified index - 1.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', num: 1 }, { id: 'bar', num: 5 }, { id: 'baz', num: 10 }]);

 Collection.move(collection, 'foo', 2);
 console.log(Collection.getList(collection)); //-> [{ id: 'bar', num: 5 }, { id: 'foo', num: 1 }, { id: 'baz', num: 10 }]
 Collection.move(collection, 'baz', 1);
 console.log(Collection.getList(collection)); //-> [{ id: 'bar', num: 5 }, { id: 'baz', num: 10 }, { id: 'foo', num: 1 }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`id` | T[\"id\"] |
`index` | number |

**Returns:** [Collection](globals.md#collection)\<T>

___

### move.at

▸ **moveAt**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `from`: number, `to`: number): [Collection](globals.md#collection)\<T>

*Defined in [move.ts:34](https://github.com/zimmed/collection/blob/2d256cd/src/move.ts#L34)*

Same as `move` but moves record at first index to second index.

**`name`** move.at

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`from` | number |
`to` | number |

**Returns:** [Collection](globals.md#collection)\<T>

___

### pop

▸ **pop**\<T>(`collection`: [Collection](globals.md#collection)\<T>): T \| undefined

*Defined in [pop.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/pop.ts#L14)*

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

*Defined in [reduce.ts:17](https://github.com/zimmed/collection/blob/2d256cd/src/reduce.ts#L17)*

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

*Defined in [remove.ts:15](https://github.com/zimmed/collection/blob/2d256cd/src/remove.ts#L15)*

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

*Defined in [remove.ts:101](https://github.com/zimmed/collection/blob/2d256cd/src/remove.ts#L101)*

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

*Defined in [remove.ts:69](https://github.com/zimmed/collection/blob/2d256cd/src/remove.ts#L69)*

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

*Defined in [remove.ts:40](https://github.com/zimmed/collection/blob/2d256cd/src/remove.ts#L40)*

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

*Defined in [reverse.ts:7](https://github.com/zimmed/collection/blob/2d256cd/src/reverse.ts#L7)*

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

*Defined in [search.ts:20](https://github.com/zimmed/collection/blob/2d256cd/src/search.ts#L20)*

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

*Defined in [search.ts:44](https://github.com/zimmed/collection/blob/2d256cd/src/search.ts#L44)*

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

▸ **setOrder**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `keys`: Array\<keyof *typeof* collection>): *typeof* collection

*Defined in [setOrder.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/setOrder.ts#L14)*

Set the order of the collection from the specified array of IDs.

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]);

 Collection.setOrder(collection, ['baz', 'bar', 'foo']);
 console.log(Array.from(Collection.iterate(collection))); //-> [{ id: 'baz' }, { id: 'bar' }, { id: 'foo' }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`keys` | Array\<keyof *typeof* collection> |

**Returns:** *typeof* collection

___

### shift

▸ **shift**\<T>(`collection`: [Collection](globals.md#collection)\<T>): T \| undefined

*Defined in [shift.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/shift.ts#L14)*

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

*Defined in [slice.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/slice.ts#L14)*

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

*Defined in [sort.ts:15](https://github.com/zimmed/collection/blob/2d256cd/src/sort.ts#L15)*

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

*Defined in [sortedInsert.ts:22](https://github.com/zimmed/collection/blob/2d256cd/src/sortedInsert.ts#L22)*

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

▸ **sortedInsertOne**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `record`: T, `compare?`: [SortCompare](globals.md#sortcompare)\<T>): [Collection](globals.md#collection)\<T>

*Defined in [sortedInsert.ts:44](https://github.com/zimmed/collection/blob/2d256cd/src/sortedInsert.ts#L44)*

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

*Defined in [splice.ts:14](https://github.com/zimmed/collection/blob/2d256cd/src/splice.ts#L14)*

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

### swap.at.with

▸ **swapAt**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `x`: number, `b`: T[\"id\"]): [Collection](globals.md#collection)\<T>

*Defined in [swap.ts:68](https://github.com/zimmed/collection/blob/2d256cd/src/swap.ts#L68)*

Same as `swap` but swaps record at given index with provided ID

**`name`** swap.at.with

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`x` | number |
`b` | T[\"id\"] |

**Returns:** [Collection](globals.md#collection)\<T>

___

### swap.at.with.index

▸ **swapAtIndex**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `x`: number, `y`: number): [Collection](globals.md#collection)\<T>

*Defined in [swap.ts:87](https://github.com/zimmed/collection/blob/2d256cd/src/swap.ts#L87)*

Same as `swap` but swaps record at given index with provided ID

**`name`** swap.at.with.index

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`x` | number |
`y` | number |

**Returns:** [Collection](globals.md#collection)\<T>

___

### swap.with

▸ **swap**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `a`: T[\"id\"], `b`: T[\"id\"]): [Collection](globals.md#collection)\<T>

*Defined in [swap.ts:23](https://github.com/zimmed/collection/blob/2d256cd/src/swap.ts#L23)*

Pick record by id and insert it into the index provided.

Note: Because the function squashes the empty space left by the pick, if the specified index is greater than the starting index,
the final index of the record will be the specified index - 1.

**`name`** swap.with

**`example`** 
```typescript
 const collection = Collection.create([{ id: 'foo', num: 1 }, { id: 'bar', num: 5 }, { id: 'baz', num: 10 }]);

 Collection.move(collection, 'foo', 2);
 console.log(Collection.getList(collection)); //-> [{ id: 'bar', num: 5 }, { id: 'foo', num: 1 }, { id: 'baz', num: 10 }]
 Collection.move(collection, 'baz', 1);
 console.log(Collection.getList(collection)); //-> [{ id: 'bar', num: 5 }, { id: 'baz', num: 10 }, { id: 'foo', num: 1 }]
```

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`a` | T[\"id\"] |
`b` | T[\"id\"] |

**Returns:** [Collection](globals.md#collection)\<T>

___

### swap.with.index

▸ **swapIndex**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `a`: T[\"id\"], `y`: number): [Collection](globals.md#collection)\<T>

*Defined in [swap.ts:47](https://github.com/zimmed/collection/blob/2d256cd/src/swap.ts#L47)*

Same as `swap` but swaps record with provided index

**`name`** swap.with.index

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [IGenericRecord](interfaces/igenericrecord.md) |

#### Parameters:

Name | Type |
------ | ------ |
`collection` | [Collection](globals.md#collection)\<T> |
`a` | T[\"id\"] |
`y` | number |

**Returns:** [Collection](globals.md#collection)\<T>

___

### update

▸ **update**\<T>(`collection`: [Collection](globals.md#collection)\<T>, `callback`: [IterateCallback](globals.md#iteratecallback)\<T, Partial\<T> \| undefined>): *typeof* collection

*Defined in [update.ts:18](https://github.com/zimmed/collection/blob/2d256cd/src/update.ts#L18)*

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
`callback` | [IterateCallback](globals.md#iteratecallback)\<T, Partial\<T> \| undefined> |

**Returns:** *typeof* collection
