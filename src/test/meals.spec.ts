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
})