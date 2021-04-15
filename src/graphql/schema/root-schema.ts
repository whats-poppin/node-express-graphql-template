import { buildSchema } from "graphql";

export default buildSchema(`
    
    type User {
        id: ID!
        name: String!
        phone: Int!
        email: String!
        password: String!
        following: [User!]!
        followers: [User!]!
        profileUrl: String!
    }
      
    input UserInputData {
        email: String!
        name: String!
        password: String!
        phone: Int!
    }
   
    type RootQuery {           
        user: User!
    }

    type RootMutation {
        registerUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
