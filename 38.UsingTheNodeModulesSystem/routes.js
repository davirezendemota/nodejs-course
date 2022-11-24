const fs = require('fs')

const requestHandler = (req, res) => {

  const { url, method } = req

  if (url === '/') {

    res.write('<html>')
    res.write('<head><title>Enter Message</title><link rel="icon" href="data:,"></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
    res.write('</html>')

    return res.end()
  }
  if (url === '/message' && method === 'POST') {

    const body = []

    req.on('data', chunk => {
      console.log(chunk)
      body.push(chunk)
    })

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]

      fs.writeFile('message.txt', message, (err) => {

        res.statusCode = 302
        res.setHeader('Location', '/')

        return res.end()
      })

    })
  }

  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My first page</title><link rel="icon" href="data:,"></head>')
  res.write('<body><h1>Hello World</h1></body>')
  res.write('</html>')
  res.end()
}


// ANOTHER WAY
// module.exports = { 
//   handler: requestHandler,
//   someText: "Some hard coded test"
// }

// ANOTHER WAY
// module.exports.handler = requestHandler
// module.exports.someText = "Some hard coded test" 

// ANOTHER WAY
// exports.handler = requestHandler
// exports.someText = "Some hard coded test" 

module.exports = requestHandler