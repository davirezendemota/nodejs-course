const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {

  const { url, method } = req

  if (url === '/') {
    res.write(`
    <html>
      <head>
        <title>Home</title>
        <link rel="icon" href="data:,">
      </head>
      <body>
        <h1>Hello my friend!</h1>
        <form action="/create-user" method="POST">
          <input type="text" name="username" placeholder="Username">
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
    `)

    return res.end()
  }
  if (url === '/users') {
    res.write(`
    <html>
      <head>
        <title>Users</title>
        <link rel="icon" href="data:,">
      </head>
      <body>
        <ul>
          <li>Davi</li>
          <li>João</li>
          <li>Bernardo</li>
          <li>José</li>
          <li>Lucas</li>
          <li>Luiz</li>
        </ul>
      </body>
    </html>
    `)

    return res.end()
  }
  if(url === '/create-user' && method === 'POST'){

    const body = []

    req.on('data', chunk => {
      body.push(chunk)
    })

    req.on('end', () => {

      const parsedBody = Buffer.concat(body).toString()

      console.log(parsedBody)
    })

    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  }

})

server.listen(port)