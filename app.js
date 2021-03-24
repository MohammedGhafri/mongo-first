const express = require('express');
const bodyParser = require('body-parser');
// const { graphqlHttp } = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const events = [];
app.use(bodyParser.json());

// app.get('/',(req,res,next)=>{
//     res.send('Hello World!');
// })
app.use('/graphql',graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            // date: args.eventInput.date
            date: new Date().toISOString()
            };
            console.log(args)
            events.push(event)
            return event;
        }
    },
    graphiql: true
}));

console.log(process.env.MONGO_USER,process.env.MONGO_PWD)
const database_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.s470n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(database_url).then(()=>{
    app.listen(3100, () => {
        console.log("Listening at :3100...");
    });

}).catch(err => {
    console.log(err)
})