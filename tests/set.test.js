const { Database } = require('../src')
const db = new Database('test')

test('should set objects', () => {
  db.set('somekeyWithObject', { foo: 'bar' })
  expect(db.get('somekeyWithObject')).toEqual({ foo: 'bar' })
})

test('should set numbers', () => {
  db.set('somekeyWithNumber', 10)
  expect(db.get('somekeyWithNumber')).toBe(10)
})

test('should set strings', () => {
  db.set('somekeyWithString', 'somestring')
  expect(db.get('somekeyWithString')).toBe('somestring')
})

test('should set arrays', () => {
  db.set('somekeyWithArray', ['$'])
  expect(db.get('somekeyWithArray')).toEqual(['$'])
})

db.deleteAll()
