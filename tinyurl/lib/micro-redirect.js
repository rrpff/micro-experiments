module.exports = function redirect (res, statusCode, location) {
  res.writeHead(statusCode, { Location: location })
  res.end()
}
