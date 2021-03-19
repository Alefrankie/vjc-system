import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import Invoice from '../schemas/Invoice'
import Lote from '../schemas/Lote'
import Product from '../schemas/Product'
import resolvers from './resolvers'
import * as typeDefs from './schema.graphql'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default graphqlHTTP({
  graphiql: true,
  schema,
  context: { Product, Invoice, Lote }
})
