import { z } from "zod"
import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from "crypto"

export async function mealsRoutes(app: FastifyInstance) {

    app.post('/', async (request, reply) => {
        const createMealBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            created_at:  z.string().datetime(),
            isInDiet: z.boolean(),
            user_id: z.string(),            
        })

        const { name, description, created_at, isInDiet, user_id } = createMealBodySchema.parse(request.body)

        await knex('meals').insert({
            id: randomUUID(),
            name,
            description,
            created_at,
            isInDiet,
            user_id,
        })

        return reply.status(201).send()
    })

    app.get('/', async(request, reply) => {
        const meals = await knex('meals').select()
        return { meals }

    })

    app.get('/:id', async(request, reply) => {
        const getMealsParamsSchema = z.object({
            user_id: z.string().uuid(),
        })

        const { user_id } = getMealsParamsSchema.parse(request.params)

        const meals = await knex('meals')
            .where({
                user_id,
            })
            .first()
        return { meals }
    })
}