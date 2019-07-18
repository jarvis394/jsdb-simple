const { Database } = require('../src')
const db = new Database('unlinkTest')

test('should get objects', () => {
  db.set('somekey', { foo: 'bar' })
  expect(db.unlink()).toBeTruthy()
})
