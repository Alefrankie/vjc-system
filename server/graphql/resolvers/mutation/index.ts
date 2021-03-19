import { IResolvers } from 'graphql-tools'

export const Mutation: IResolvers = {
  holaM: () => {
    console.log('Hola')
  }
}
