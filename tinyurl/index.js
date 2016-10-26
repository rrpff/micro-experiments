const { send, json, createError } = require('micro')
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

  const link = getLink(req.url.slice(1))

  if (link === undefined) {
    throw createError(404, 'That link does not exist')
  }

  res.writeHead(301, { Location: link.location })
  res.end()
}
