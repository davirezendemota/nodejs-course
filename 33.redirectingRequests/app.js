const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/') {

    res.write('<html>')
    res.write('<head><title>Enter Message</title><link rel="icon" href="data:,"></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>')

    return res.end()
  }
  if (url === '/message' && method === 'POST') {

    fs.writeFileSync('message.txt', 'DUMMY')
    res.statusCode = 302
    res.setHeader('Location', '/')

    return res.end()
  }
  console.log(url, method)
  //console.log(req)
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My first page</title><link rel="icon" href="data:,"></head>')
  res.write('<body><h1>Hello World</h1></body>')
  res.write('</html>')
  res.end()
})

server.listen(3000)