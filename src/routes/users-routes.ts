import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";

export async function usersRoutes(app: FastifyInstance) {

    app.post('/', async (request, reply) => {
        const createUserBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
        })

        const { name, email } = createUserBodySchema.parse(request.body)

        const userExist = await knex('users').where({
            email
        }).first()

        if(userExist) {
            return reply.status(400).send({
                error: 'User exist!',
            })
        }

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()
      
            reply.cookie('sessionId', sessionId, {
              path: '/meals', // apenas as rotas /meals podem acessar ao cookie
              maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            })
          }

        await knex('users').insert({
            id: randomUUID(),
            name,
            email,
            session_id:sessionId,
        })

        return reply.status(201).send()
    })

    app.get('/', async() => {
        const users = await knex('users').select()
        return { users }

    })


}