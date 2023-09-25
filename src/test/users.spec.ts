import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../app";
import { execSync } from "node:child_process";
import request from 'supertest'

describe('Users routes', () => {
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

    it('Should be able to create a new user', async () => {
       await request(app.server)
        .post('/users')
        .send({
            name: 'User1',
            email: 'user@mail.com',
        })
        .expect(201)
    })
})