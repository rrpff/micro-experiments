const { send, json, createError } = require('micro')
const redirect = require('./lib/micro-redirect')
const { getAllLinks, getLink, addLink } = require('./lib/links')

module.exports = async function (req, res) {
  if (req.method === 'POST') {
    const { location } = await json(req)
    return addLink(location)
  }

  if (req.method === 'GET' && req.url === '/') {
    return getAllLinks()
      .map(link => `> ${link.redirectURL} => ${link.location}`)
      .join('\n')
  }

  const slug = req.url.slice(1)
  const link = getLink(slug)

  if (link === undefined) {
    throw createError(404, `The link "${slug}" does not exist`)
  }

  redirect(res, 301, link.location)
}
