const path = require('path')
const SQLite = require('better-sqlite3')
const fs = require('fs')

const { database } = require('../defaults')
const utils = require('../utils')

class Database {
  constructor(name = database.name, options = {}) {
    this.name = name

    // Merge options with defaults
    this.options = utils.mergeObjects(options, database.options)

    // Validate every field in options object
    utils.validateFields(this.options, database.options)

    const { temporary: memory, readFile: fileMustExist, timeout } = this.options
    const dbpath = path.resolve(process.cwd(), this.options.path)

    // Check if path exists
    if (!fs.existsSync(dbpath)) fs.mkdirSync(dbpath)

    // Create sql database file
    this.db = new SQLite(`${dbpath}${path.sep}${this.name}.sqlite`, {
      memory,
      fileMustExist,
      timeout
    })

    // Create table
    this._init()
  }

  _init() {
    return this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${
          this.name
        } (field TEXT PRIMARY KEY, value TEXT)`
      )
      .run()
  }

  set(field, value) {
    this._init()

    value = JSON.stringify(value)

    this.db
      .prepare(
        `INSERT OR REPLACE INTO ${this.name} (field, value) VALUES (?, ?)`
      )
      .run(field, value)

    return this
  }

  setMany(records) {
    this._init()

    const execute = this.db.transaction(records => {
      if (typeof records !== 'object') {
        throw new Error(
          'Provide an array of records with following structure: ' +
            '{ field: String, value: Any }, when using Database.setMany()'
        )
      }

      for (const { field, value } of records) {
        this.set(field, value)
      }
    })

    execute(records)

    return this
  }

  get(field) {
    this._init()

    const data = this.db
      .prepare(`SELECT * FROM ${this.name} WHERE field = (?)`)
      .get(field)

    if (!data) return null

    let { value } = data

    value = JSON.parse(value)

    return value
  }

  getAll() {
    this._init()

    const isObject = value => value && typeof value === 'object' && value.constructor === Object;  
    const parse = obj => JSON.parse(obj)
    const deepParse = obj => {
      for (const key in obj) {
        try { 
          obj[key] = parse(obj[key]) 
          if (isObject(obj[key])) obj[key] = deepParse(obj[key])
        } catch (e) {}
      }
      
      return obj
    }

    let data = this.db
      .prepare(`SELECT * FROM ${this.name} WHERE field IS NOT NULL`)
      .all()

    data = data.map(({ field, value }) => {
      value = parse(value)
      if (isObject(value)) value = deepParse(value)

      return {
        field, 
        value
      }
    })

    return data
  }

  find(query) {
    this._init()

    if (typeof query !== 'string') {
      throw new Error('Query must be a type String')
    }

    const data = this.db
      .prepare(`SELECT * FROM ${this.name} WHERE field LIKE (?)`)
      .all([`${query}%`])

    return data
  }

  has(field) {
    return !!this.get(field)
  }

  delete(field) {
    this._init()

    this.db.prepare(`DELETE FROM ${this.name} WHERE field = (?)`).run(field)

    return this
  }

  deleteMany(records) {
    this._init()

    const execute = this.db.transaction(records => {
      if (typeof records !== 'object') {
        throw new Error(
          'Provide an array of records with following structure: ' +
            'field: String, when using Database.deleteMany()'
        )
      }

      for (const record of records) {
        this.delete(record)
      }
    })

    execute(records)

    return this
  }

  deleteAll() {
    this._init()

    this.db.prepare(`DELETE FROM '${this.name}'`).run()

    return this
  }
}

module.exports = Database
