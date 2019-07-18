const { Database } = require('../src')
const db = new Database('test')
const value = Math.random()

test('should get objects', () => {
  db.set('somekey', { foo: 'bar' })
  expect(db.get('somekey')).toEqual({ foo: 'bar' })
})

test('should get numbers', () => {
  db.set('somenum', 10)
  expect(db.get('somenum')).toBe(10)
})

test('should get floats', () => {
  db.set('somefloat', value)
  expect(db.get('somefloat')).toBe(value)
})

test('should get strings', () => {
  db.set('somestring', 'foo')
  expect(db.get('somestring')).toBe('foo')
})

db.deleteAll()
