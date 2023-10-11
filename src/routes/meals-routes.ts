import { z } from "zod"
import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from "crypto"
import { checSessionIdExist } from "../midlewares/check-session-id-exsit"

export async function mealsRoutes(app: FastifyInstance) {

    app.post('/',
        { preHandler: [checSessionIdExist] },
     async (request, reply) => {

        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id

        const createMealBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            isInDiet: z.boolean(),
        })

        const { name, description, isInDiet } = createMealBodySchema.parse(request.body)

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

    app.get('/:id',
    { preHandler: [checSessionIdExist] },
     async(request) => {

        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id

        const meals = await knex('meals')
            .where({
                user_id,
            })
        return { meals }
    })

    app.delete('/:id',

    { preHandler: [checSessionIdExist] },
    
    async(request) => {

        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id





        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)
        
        const meals = await knex('meals')
            .where({
                id:id,
                user_id,
            })
            .delete()
        return { meals }
    })

    app.put('/',

    { preHandler: [checSessionIdExist] },
     async (request, reply) => {
        const updateMealBodySchema = z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            isInDiet: z.boolean()           
        })



        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id

        const { id, name, description, isInDiet } = updateMealBodySchema.parse(request.body)

        await knex('meals').update({
            name,
            description,
            isInDiet,
        }).where({
            id:id,
            user_id,
        })

        return reply.status(201).send()
    })

    app.get('/count-meals-registers/:id',
     { preHandler: [checSessionIdExist]}, async(request) => {

        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)


        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id


        const countMealByUser = await knex('meals')
            .where({
                user_id,
            })
            .count({count: '*'})
            
        return { countMealByUser }
    })

    app.get('/count-meals-in/:id', { preHandler: [checSessionIdExist] }, async(request) => {

        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id




        const countMealInDiet = await knex('meals')
            .where({
                user_id,
                isInDiet: true
            })
            .count({count: '*'})
            
        return { countMealInDiet }
    })

    app.get('/count-meals-out/:id', { preHandler: [checSessionIdExist] }, async(request) => {

        const getMealsParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getMealsParamsSchema.parse(request.params)


        const { sessionId } = request.cookies

        const [user] = await knex('users')
            .where({
                session_id:sessionId
            }).select('id')

        const user_id = user.id

        const countMealOutDiet = await knex('meals')
            .where({
                user_id,
                isInDiet: false
            })
            .count({count: '*'})
            
        return { countMealOutDiet }
    })
}