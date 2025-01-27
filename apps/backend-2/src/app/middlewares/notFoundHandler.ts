import sendResponse from '@shared/sendResponse'
import { Request, Response } from 'express'
import httpStatus from 'http-status'

const notFoundHandler = (req: Request, res: Response) => {
  return sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'Resource not found',
  })
}

export default notFoundHandler
