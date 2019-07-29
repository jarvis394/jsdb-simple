# jsdb-simple

#### Just a simple key-value database on `better-sqlite3`

# Example

```js
const { Database } = require('jsdb-simple')
const db = new Database()

/* Setting any data */
db.set('foo', 'bar')
db.set('user', {
  name: 'John',
  age: 21,
  gender: 'male'
})

/* Getting data from DB */
console.log(db.get('foo'))
// > baz (String)

console.log(db.get('user').age)
// > 21 (Number)

/* Deleting data */
db.delete('foo')
console.log(db.get('foo'))
// > null

// Delete DB file, default is `data/main.sqlite`
db.unlink()
```

# API

<a name="Database"></a>

## Database

**Kind**: global class

- [Database](#Database)
  - [new Database(name, options)](#new_Database_new)
  - [.set(id, value)](#Database+set) ⇒ [<code>Database</code>](#Database)
  - [.setMany(records)](#Database+setMany) ⇒ [<code>Database</code>](#Database)
  - [.get(id)](#Database+get) ⇒ <code>Any</code>
  - [.getAll()](#Database+getAll) ⇒ <code>Object</code>
  - [.find(query)](#Database+find) ⇒ <code>Object</code>
  - [.has(id)](#Database+has) ⇒ <code>Boolean</code>
  - [.delete(id)](#Database+delete) ⇒ <code>Boolean</code>
  - [.deleteMany(records)](#Database+deleteMany) ⇒ [<code>Database</code>](#Database)
  - [.deleteAll()](#Database+deleteAll) ⇒ [<code>Database</code>](#Database)
  - [.unlink()](#Database+unlink) ⇒ <code>Boolean</code>

<a name="new_Database_new"></a>

### new Database(name, options)

Database class

| Param   | Type                | Description           |
| ------- | ------------------- | --------------------- |
| name    | <code>String</code> | Table's name          |
| options | <code>Object</code> | Database init options |

<a name="Database+set"></a>

### database.set(id, value) ⇒ [<code>Database</code>](#Database)

Set record by given ID

**Kind**: instance method of [<code>Database</code>](#Database)

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| id    | <code>String</code> | Record ID    |
| value | <code>Any</code>    | Value to set |

<a name="Database+setMany"></a>

### database.setMany(records) ⇒ [<code>Database</code>](#Database)

Set many records to the table

**Kind**: instance method of [<code>Database</code>](#Database)

| Param   | Type               | Description    |
| ------- | ------------------ | -------------- |
| records | <code>Array</code> | Set of records |

<a name="Database+get"></a>

### database.get(id) ⇒ <code>Any</code>

Get record by ID

**Kind**: instance method of [<code>Database</code>](#Database)

| Param | Type                | Description  |
| ----- | ------------------- | ------------ |
| id    | <code>String</code> | Records's ID |

<a name="Database+getAll"></a>

### database.getAll() ⇒ <code>Object</code>

Get all records

**Kind**: instance method of [<code>Database</code>](#Database)
<a name="Database+find"></a>

### database.find(query) ⇒ <code>Object</code>

Find record by ID using query

**Kind**: instance method of [<code>Database</code>](#Database)

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| query | <code>String</code> | Query that is used to find IDs |

<a name="Database+has"></a>

### database.has(id) ⇒ <code>Boolean</code>

Check if table has a record

**Kind**: instance method of [<code>Database</code>](#Database)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| id    | <code>String</code> | Record's ID |

<a name="Database+delete"></a>

### database.delete(id) ⇒ <code>Boolean</code>

Delete record by ID

**Kind**: instance method of [<code>Database</code>](#Database)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| id    | <code>String</code> | Record's ID |

<a name="Database+deleteMany"></a>

### database.deleteMany(records) ⇒ [<code>Database</code>](#Database)

Delete many records from the table

**Kind**: instance method of [<code>Database</code>](#Database)

| Param   | Type               | Description    |
| ------- | ------------------ | -------------- |
| records | <code>Array</code> | Set of records |

<a name="Database+deleteAll"></a>

### database.deleteAll() ⇒ [<code>Database</code>](#Database)

Deletes every record in table

**Kind**: instance method of [<code>Database</code>](#Database)
<a name="Database+unlink"></a>

### database.unlink() ⇒ <code>Boolean</code>

Deletes table's file

**Kind**: instance method of [<code>Database</code>](#Database)
