import { HttpStatus } from "http-status"
import { IMeta } from "./meta.interface"

export type IGenericResponse<T> = {
  statusCode: HttpStatus
  success: boolean
  meta?: IMeta
  data?: T
  links?: { [key: string]: string }
}
