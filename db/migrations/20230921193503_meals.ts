import { table } from "console";
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').unique()
        table.text('name').notNullable()
        table.text('description').nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.boolean('isInDiet').notNullable()
        table.uuid('user_id').index().notNullable()
        table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('cascade')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meals')
}

