import { ProfileRoutes } from '@modules/profile/profile.routes'
import { Router } from 'express'

export type IRoute = {
  path: string
  router: Router
}

export const routes: IRoute[] = [
  {
    path: '/profile',
    router: ProfileRoutes,
  },
];
