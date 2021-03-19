import express, { Request, Response } from 'express'
import next from 'next'
import graphQLServer from './graphql/graphQLServer'
import './MongoDB'
import { MyRoutes } from './routes'
import findAllInvoices from './routes/script'
import { Services } from './services'

// const server = http.createServer(app)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use('/graphql', graphQLServer)
  app.use(express.json())

  app.use('/findAllInvoices', findAllInvoices)
  app.use('/services', Services)
  app.use('/apiCustom', MyRoutes)

  app.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  app.listen(3000, (err?: Error) => {
    if (err) throw err
    console.log(`> Ready on localhost:${3000} - env ${process.env.NODE_ENV}`)
  })
})
