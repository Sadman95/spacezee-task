import { Server } from 'http'
import config from './config'
import app from './app'
import { logger } from '@shared/logger'
import { DB } from '@utils/DB'

//handle Uncaught exceptions
process.on('uncaughtException', error => {
  logger.error(error)
  // console.error(error)
  process.exit(1)
})

let server: Server

async function bootsrap() {
  const db_uri = config.db.uri
  try {
    await DB.connect(db_uri as string, { dbName: config.db.name })
    // logger.info(`DATABASE CONNECTION SUCCESSFUL`)
    console.log(`DATABASE CONNECTION SUCCESSFUL`)
    server = app.listen(config.port, () => {
      // logger.info(
      //   `backend-1 server listening on port ${config.port}`
      // )
      console.log(`backend-1 server listening on port ${config.port}`)
    })
  } catch (e) {
    logger.error(e)
    console.error(e)
  }

  //handle Unhandledrejection: Gracefully off the server
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        logger.error(error)
        // console.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootsrap()

//SIGTERM detection
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  // console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
