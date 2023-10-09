import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../app";
import { execSync } from "node:child_process";
import request from 'supertest'

describe('Meals routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('Should be able to create a new meal', async () => {

       await request(app.server)
        .post('/meals')
        .send({
            name: 'meals 1',
            description: 'My meal 1',
            created_at: new Date(),
            isInDiet: false,
            user_id: 'user-id',
        })
        .expect(201)
    })

    it('Should be able to list all meals', async () => {

        await request(app.server)
            .post('/meals')
            .send({
                name: 'meals 1',
                description: 'My meal 1',
                created_at: new Date(),
                isInDiet: false,
                user_id: 'user-id',
            })

        await request(app.server)
            .post('/meals')
            .send({
                name: 'meals 2',
                description: 'My meal 2',
                created_at: new Date(),
                isInDiet: true,
                user_id: 'user-id',
            })

        const listMealsResponse = await request(app.server)
            .get('/meals')
            .expect(200)
        
        expect(listMealsResponse.body.meals).toEqual([
            expect.objectContaining({
                name: 'meals 1',
                description: 'My meal 1',
            }),
            expect.objectContaining({
                name: 'meals 2',
                description: 'My meal 2',
            }),        
        ])
    })

    it('Should be able to list meals by user', async () => {

        await request(app.server)
            .post('/meals')
            .send({
                name: 'meals x1',
                description: 'My meal x1',
                isInDiet: false,
                user_id: 'user-id',
            })

        const listMealsResponse = await request(app.server).get('/meals').expect(200)

        console.log("listMealsResponse:" , listMealsResponse.body)

        const id = listMealsResponse.body.meals[0].user_id

        console.log("id: ", id)
        
        const listMealsByUserIdResponse = await request(app.server)
        .get(`/meals/${id}`)
        .expect(200)

        expect(listMealsByUserIdResponse.body.meals).toEqual([
                expect.objectContaining({
                    name: 'meals x1',
                    description: 'My meal x1',
                }),
        ])
    })
})