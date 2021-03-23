const express = require('express');
const bodyParser = require('body-parser');
// const { graphqlHttp } = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();

app.use(bodyParser.json());

// app.get('/',(req,res,next)=>{
//     res.send('Hello World!');
// })
app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        events: () => {
            return ['Cooking','sailing','Drawing']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));

app.listen(3100, () => {
    console.log("Listening at :3100...");
});