const { resolve } = require('url')
const { join } = require('path')
const low = require('lowdb')
const uuid = require('uuid')

const HOST = 'http://localhost:3000'
const DB_PATH = join(__dirname, '../db.json')

const db = low(DB_PATH, { writeOnChange: true })
db.defaults({ links: [] }).value()

const redirectURL = slug => resolve(HOST, slug)

exports.getAllLinks = function () {
  const links = db.get('links').value()
  return links.map(link => Object.assign({}, link, { redirectURL: redirectURL(link.slug) }))
}

exports.getLink = function (slug) {
  return db.get('links').find({ slug }).value()
}

exports.addLink = function (location) {
  return db.get('links').push({ slug: uuid(), location }).value()
}
