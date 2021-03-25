const express = require('express');
const bodyParser = require('body-parser');
// const { graphqlHttp } = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const grapgQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index')
require('dotenv').config()
const isAuth = require('./middleware/is_auth')





const app = express();
// const events = [];
app.use(bodyParser.json());

// app.get('/',(req,res,next)=>{
//     res.send('Hello World!');
// })
app.use(isAuth);

app.use('/graphql',graphqlHTTP({
    schema: grapgQlSchema,
    rootValue:graphQlResolvers,
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