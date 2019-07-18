const { Database } = require('../src')
const db = new Database('test')

const data = [
  {
    field: 'many1',
    value: { foo: 'bar1' }
  },
  {
    field: 'many2',
    value: { foo: 'bar2' }
  },
  {
    field: 'many3',
    value: { foo: 'bar3' }
  }
]

test('should set many', () => {
  db.setMany(data)
  expect(db.get('many2')).toEqual({ foo: 'bar2' })
})

db.deleteAll()
