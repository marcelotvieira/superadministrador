/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export class ApiError extends Error {
  public message: string
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super()
    this.message = message
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }

  static handler(error: Error, _req: Request, res: Response, _next: NextFunction) {
    let status = 400
    let message = 'Unhandled Error'
    if (error instanceof ApiError) {
      message = 'Error'
      status = error.statusCode
    }
    return res.status(status).json({
      message,
      error: error.name,
      details: error.message
    })
  }

  static notFound(message: string) {
    throw new ApiError(message, StatusCodes.NOT_FOUND)
  }

  static unauthorized(message: string) {
    throw new ApiError(message, StatusCodes.UNAUTHORIZED)
  }
    
  static unprocessable(message: string) {
    throw new ApiError(message, StatusCodes.UNPROCESSABLE_ENTITY)
  }
    
  static badRequest(message: string) {
    throw new ApiError(message, StatusCodes.BAD_REQUEST)
  }
}