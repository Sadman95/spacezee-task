import { IGenericErrorMessage } from '@interfaces/error.interface'
import mongoose from 'mongoose'

const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: 'Invalid Id',
    },
  ]
  const statusCode = 400

  return {
    statusCode,
    message: 'Cast error',
    errorMessages: errors,
  }
}

export default handleCastError
