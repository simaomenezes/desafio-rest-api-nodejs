// eslint-disable-next-line
import { Knex } from "knex";

declare module 'Knex/types/table' {
  export interface table {
    users: {
      id: string
      name: string
      email: string
    }
  }

  export interface table {
    meals: {
      id: string
      name: string
      description: string
      created_at: string
      isInDiet: boolean
      user_id: string
    }
  }
}
