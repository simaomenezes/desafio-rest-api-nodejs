import { z } from "zod"
import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from "crypto"

export async function mealsRoutes(app: FastifyInstance) {

    app.post('/', async (request, reply) => {
        const createMealBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            isInDiet: z.boolean(),
            user_id: z.string(),            
        })

        const { name, description, isInDiet, user_id } = createMealBodySchema.parse(request.body)

        await knex('meals').insert({
            id: randomUUID(),
            name,
            description,
            isInDiet,
            user_id,
        })

        return reply.status(201).send()
    })

    app.get('/', async(request, reply) => {
        const meals = await knex('meals').select()
        return { meals }

    })

    app.get('/:id', async(request) => {
        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)
        
        const meals = await knex('meals')
            .where({
                user_id:id,
            })
        return { meals }
    })

    app.delete('/:id', async(request) => {
        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)
        
        const meals = await knex('meals')
            .where({
                id:id,
            })
            .delete()
        return { meals }
    })

    app.put('/', async (request, reply) => {
        const updateMealBodySchema = z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            isInDiet: z.boolean()           
        })

        const { id, name, description, isInDiet } = updateMealBodySchema.parse(request.body)

        await knex('meals').update({
            name,
            description,
            isInDiet,
        }).where({
            id:id
        })

        return reply.status(201).send()
    })

    app.get('/count-meals-registers/:id', async(request) => {

        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)

        const countMealByUser = await knex('meals')
            .where({
                user_id: id
            })
            .count({count: '*'})
            
        return { countMealByUser }
    })
}