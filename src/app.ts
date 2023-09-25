import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { usersRoutes } from './routes/users-routes'

export const app = fastify()

app.register(usersRoutes, {
  prefix: 'users',
})