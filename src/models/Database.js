const path = require('path')
const SQLite = require('better-sqlite3')
const fs = require('fs')

const { database } = require('../defaults')
const utils = require('../utils')

class Database {
  /**
   * Database class
   * @class
   * @param {String} name Table's name
   * @param {Object} options Database init options
   */
  constructor(name = database.name, options = {}) {
    this.name = name

    // Merge options with defaults
    this.options = utils.mergeObjects(options, database.options)

    // Validate every field in options object
    utils.validateFields(this.options, database.options)

    const { temporary: memory, readFile: fileMustExist, timeout } = this.options
    this.dbpath = path.resolve(process.cwd(), this.options.path)

    // Check if path exists
    if (!fs.existsSync(this.dbpath)) try { fs.mkdirSync(this.dbpath) } catch (e) {}

    // Create sql database file
    this.db = new SQLite(`${this.dbpath}${path.sep}${this.name}.sqlite`, {
      memory,
      fileMustExist,
      timeout
    })

    // Create table
    this._init()
  }

  /**
   * Initializes database's table
   * @private
   * @returns {Boolean}
   */
  _init() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${
          this.name
        } (id TEXT PRIMARY KEY, value TEXT)`
      )
      .run()

    return true
  }

  /**
   * Set record by given ID
   * @param {String} id Record ID
   * @param {Any} value Value to set
   * @returns {Database}
   */
  set(id, value) {
    this._init()

    value = JSON.stringify(value)

    this.db
      .prepare(
        `INSERT OR REPLACE INTO ${this.name} (id, value) VALUES (?, ?)`
      )
      .run(id, value)

    return this
  }

  /**
   * Set many records to the table
   * @param {Array} records Set of records
   * @returns {Database}
   */
  setMany(records) {
    this._init()

    const execute = this.db.transaction(records => {
      if (typeof records !== 'object') {
        throw new Error(
          'Provide an array of records with following structure: ' +
            '{ id: String, value: Any }, when using Database.setMany()'
        )
      }

      for (const { id, value } of records) {
        this.set(id, value)
      }
    })

    execute(records)

    return this
  }

  /**
   * Get record by ID
   * @param {String} id Records's ID
   * @returns {Any}
   */
  get(id) {
    this._init()

    const data = this.db
      .prepare(`SELECT * FROM ${this.name} WHERE id = (?)`)
      .get(id)

    if (!data) return null

    let { value } = data

    value = JSON.parse(value)

    return value
  }

  /**
   * Get all records
   * @returns {Object}
   */
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
      .prepare(`SELECT * FROM ${this.name} WHERE id IS NOT NULL`)
      .all()

    data = data.map(({ id, value }) => {
      value = parse(value)
      if (isObject(value)) value = deepParse(value)

      return {
        id, 
        value
      }
    })

    return data
  }

  /**
   * Find record by ID using query
   * @param {String} query Query that is used to find IDs
   * @returns {Object}
   */
  find(query) {
    this._init()

    if (typeof query !== 'string') {
      throw new Error('Query must be a type String')
    }

    const data = this.db
      .prepare(`SELECT * FROM ${this.name} WHERE id LIKE (?)`)
      .all([`${query}%`])

    return data
  }

  /**
   * Check if table has a record
   * @param {String} id Record's ID
   * @returns {Boolean}
   */
  has(id) {
    return !!this.get(id)
  }

  /**
   * Delete record by ID
   * @param {String} id Record's ID
   * @returns {Boolean}
   */
  delete(id) {
    this._init()

    this.db.prepare(`DELETE FROM ${this.name} WHERE id = (?)`).run(id)

    return this
  }

  /**
   * Delete many records from the table
   * @param {Array} records Set of records
   * @returns {Database}
   */
  deleteMany(records) {
    this._init()

    const execute = this.db.transaction(records => {
      if (typeof records !== 'object') {
        throw new Error(
          'Provide an array of records with following structure: ' +
            'id: String, when using Database.deleteMany()'
        )
      }

      for (const record of records) {
        this.delete(record)
      }
    })

    execute(records)

    return this
  }

  /**
   * Deletes every record in table
   * @returns {Database}
   */
  deleteAll() {
    this._init()

    this.db.prepare(`DELETE FROM '${this.name}'`).run()

    return this
  }

  /**
   * Deletes table's file
   * @returns {Boolean}
   */
  unlink() {
    fs.unlink(`${dbpath}${path.sep}${this.name}.sqlite`, e => {
      throw new Error(e)
    })

    return true
  }
}

module.exports = Database
