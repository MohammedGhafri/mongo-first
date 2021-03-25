const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./bookings');

const rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver
};

module.exports = rootResolver;







// module.exports = {
//     events: () => {
//         // return events;
//         return Event.find()
//         .then(events =>{
//             return events.map(event => {
//                 return {
//                     ...event._doc,
//                     _id:event.id,
//                     date: new Date(event._doc.date).toISOString(),
//                     creator:user.bind(this,event._doc.creator)
//             };
//                 return event
//             });
//         })
//         .catch(err =>{
//             throw err;
//         });
//     },
//     createEvent: (args) => {
//         // const event = {
//         //     _id: Math.random().toString(),
//         //     title: args.eventInput.title,
//         // description: args.eventInput.description,
//         // price: +args.eventInput.price,
//         // // date: args.eventInput.date
//         // date: new Date().toISOString()
//         // };
//         // console.log(args)
//         const event = new Event({
//                  title: args.eventInput.title,
//         description: args.eventInput.description,
//         price: +args.eventInput.price,
        
//         date: new Date(args.eventInput.date),
//         creator:'605b0532814b257cfdee190f'
//         })
//         // events.push(event)
//         let createdEvent;
//         return event.save().then(result =>{
//             // console.log(result);
//             createdEvent = {
//                 ...result._doc,
//                 date: new Date(event._doc.date).toISOString(),
//                 creator:user.bind(this,result._doc.creator),
            
//             }
//             return User.findById('605b0532814b257cfdee190f')
//             return {...result._doc}; // instead of final return below.
//         })
//         .then(user =>{
//             if(!user){
//                 throw new Error('User Does not Exist')
//             }
//             user.createdEvents.push(event);
//             return user.save();
//         })
//         .then(result =>{
//             return createdEvent;
//         })
//         .catch(err =>{
//             console.log(err);
//             throw err
//         });
//         // return event;
//     },
//     createUser: args =>{
//         return User.findOne({email: args.userInput.email}).then(user =>{
//             if(user){
//                 throw new Error('User with a same email is Already Exist.')
//             }
//             return bcrypt.hash(args.userInput.password,12).then(hPassword =>{
//                 const user = new User ({
//                     email : args.userInput.email,
//                     password : hPassword
//                 })
//                 return user.save();
//                 })
//                 .then(res =>{
//                     return {...res._doc, password: null, _id:res.id}
//                     // return res,{...res._doc}
//                 })
//                 .catch(err=>{
//                 throw err
//             });
//         })
//     }
// }