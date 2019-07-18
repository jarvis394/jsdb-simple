const { Database } = require('../src')
const db = new Database('test')

test('should get objects', () => {
  db.set('somekey', { foo: 'bar' })
  expect(db.has('somekey')).toBeTruthy()
})

test('should get objects', () => {
  db.set('somekey', { foo: 'bar' })
  expect(db.has('123')).toBeFalsy()
})

db.deleteAll()
