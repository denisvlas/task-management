import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './todogql-graphql-env.d'

export const graphql = initGraphQLTada<{
    introspection: introspection
    scalars: {
        timestamptz: string
        citext: string
        bpchar: string
        bigint: number
        smallint: number
        date: string
    }
}>()

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada'
export { readFragment } from 'gql.tada'
