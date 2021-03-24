const express = require('express');
const bodyParser = require('body-parser');
// const { graphqlHttp } = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')
require('dotenv').config()

const Event = require('./models/event')
const User = require('./models/user')


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

        type User {
            _id: ID!
            email: String!
            password : String
        }



        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            
            email: String!
            password : String!
        }
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        events: () => {
            // return events;
            return Event.find()
            .then(events =>{
                return events.map(event => {
                    // return {...event._doc };
                    return event
                })
            })
            .catch(err =>{
                throw err;
            });
        },
        createEvent: (args) => {
            // const event = {
            //     _id: Math.random().toString(),
            //     title: args.eventInput.title,
            // description: args.eventInput.description,
            // price: +args.eventInput.price,
            // // date: args.eventInput.date
            // date: new Date().toISOString()
            // };
            // console.log(args)
            const event = new Event({
                     title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            
            date: new Date(args.eventInput.date),
            creator:'605b0532814b257cfdee190f'
            })
            // events.push(event)
            let createdEvent;
            return event.save().then(result =>{
                // console.log(result);
                createdEvent = {...result._doc}
                return User.findById('605b0532814b257cfdee190f')
                return {...result._doc}; // instead of final return below.
            })
            .then(user =>{
                if(!user){
                    throw new Error('User Does not Exist')
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result =>{
                return createdEvent;
            })
            .catch(err =>{
                console.log(err);
                throw err
            });
            // return event;
        },
        createUser: args =>{
            return User.findOne({email: args.userInput.email}).then(user =>{
                if(user){
                    throw new Error('User with a same email is Already Exist.')
                }
                return bcrypt.hash(args.userInput.password,12).then(hPassword =>{
                    const user = new User ({
                        email : args.userInput.email,
                        password : hPassword
                    })
                    return user.save();
                    })
                    .then(res =>{
                        return {...res._doc, password: null, _id:res.id}
                        // return res,{...res._doc}
                    })
                    .catch(err=>{
                    throw err
                });
            })
        }
    },
    graphiql: true
}));

console.log(process.env.MONGO_USER,process.env.MONGO_PWD)
const database_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.s470n.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
mongoose.connect(database_url).then(()=>{
    app.listen(3100, () => {
        console.log("Listening at :3100...");
    });

}).catch(err => {
    console.log(err)
})