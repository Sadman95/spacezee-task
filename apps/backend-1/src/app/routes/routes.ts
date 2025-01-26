import { UserRoutes } from '@modules/user/user.routes'
import { Router } from 'express'

export type IRoute = {
  path: string
  router: Router
}

export const routes: IRoute[] = [
  {
    path: '/user',
    router: UserRoutes,
  }
]
