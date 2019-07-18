const { Database } = require('../src')
const db = new Database('test')

test('should delete records', () => {
  db.set('somekeyAsd', { foo: 'bar' })
  db.set('somekey1', { foo1: 'bar1' })
  db.set('somekey2', { foo2: 'bar2' })
  db.delete('somekeyAsd')
  expect(db.get('somekeyAsd')).toBeNull()
})

test('should delete many records', () => {
  db.set('somekeyAsd', { foo: 'bar' })
  db.set('somekey1', { foo1: 'bar1' })
  db.set('somekey2', { foo2: 'bar2' })
  db.deleteMany(['somekey1', 'somekey2'])
  expect(db.getAll()).toEqual([
    {
      field: 'somekeyAsd',
      value: { 
        foo: 'bar' 
      }
    }
  ])
})

db.deleteAll()
