const bcrypt = require('bcryptjs')
// require('dotenv').config()

const Event = require('../../models/event')
const User = require('../../models/user')
const Booking = require('../../models/booking')




// const events = eventIds =>{
//     return Event.find({_id: {$in: eventIds}})
//     .then(events => {
//         return events.map(event => {
//             return {
//                 ...event._doc,
//                 date: new Date(event._doc.date).toISOString(),
//                 creator: user.bind(this,event.creator)
//             }
//         })
//     })
//     .catch()
// }


const events = async eventIds =>{
    try{
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this,event.creator)
            }
        })
    }catch(err){
        throw err
    }
};

// const user = userId =>{
//     return User.findById(userId)
//     .then(user =>{
//         return {...user._doc,
//             _id:user.id,
//             createdEvents:events.bind(this,user._doc.createdEvents)
//         }
//     })
//     .catch(err=>{
//         throw err;
//     })
// }


const user = async userId =>{
    try {
    const user = await User.findById(userId)
    
        return {...user._doc,
            _id:user.id,
            createdEvents:events.bind(this,user._doc.createdEvents)
        }
    }catch(err){

        throw err;
    }
    
    
};

const singleEvent = async eventId =>{
    try{
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            creator:user.bind(this,event.creator)
        }
    }catch(err){
        throw err
    }
}


module.exports = {
    events: async() => {
        // return events;
        try{
        const events = await Event.find()
        
            return events.map(event => {
                return {
                    ...event._doc,
                    _id:event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator:user.bind(this,event._doc.creator)
            };
                return event
            });
        }catch(err){
                throw err;
            }
       
    },
    booking: async ()=>{
        try{
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return{
                    ...booking._doc,
                    user: user.bind(this,booking._doc.user),
                    singleEvent:singleEvent.bind(this,booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                }
            })
        }catch(err){
throw err
        }
    },
    createEvent: async (args) => {
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
        try{
        const result = await event.save()
            // console.log(result);
            createdEvent = {
                ...result._doc,
                date: new Date(event._doc.date).toISOString(),
                creator:user.bind(this,result._doc.creator),
            
            }
            const creatorUser = await User.findById('605b0532814b257cfdee190f')
            // return {...result._doc}; // instead of final return below.
        
            if(!creatorUser){
                throw new Error('User Does not Exist')
            }
            creatorUser.createdEvents.push(event);
            await creatorUser.save();
            return createdEvent;
        }catch(err){
            throw err
        }
      
        // return event;
    },
    createUser: async args =>{
            try{
        const existing_user = await User.findOne({email: args.userInput.email})
            if(existing_user){
                throw new Error('User with a same email is Already Exist.')
            }
            const hPassword = await bcrypt.hash(args.userInput.password,12)
                const user = new User ({
                    email : args.userInput.email,
                    password : hPassword
                })
                const result = await user.save();
                    return {...result._doc, password: null, _id:result.id}
                    // return res,{...res._doc}
            }catch(err){
                throw err

            }
                
    },
    bookEvent:async args =>{
       
            const fetchedEvent = await Event.findOne({_id: args.eventId})
            const booking = new Booking({
                user:"605b3bf1073f679f0d9cfcd4",
                event: fetchedEvent
            })
            
            const result = await booking.save();
            console.log({...result._doc})
            console.log(result)

            return {
                ...result._doc,
                _id:result.id,
                user: user.bind(this,result.user),
                    singleEvent:singleEvent.bind(this,result.event),
                createdAt: new Date(result.createdAt).toISOString(),
                updatedAt: new Date(result.updatedAt).toISOString(),
            }

       
    },
    cancelBooking: async args =>{
        try{
            const booking = await (await Booking.findById(args.bookingId)).populate('event');
            console.log(booking)
            const event = {
                ...booking.event._doc,
                _id:     booking.event.id,
                creator : user.bind(this,booking.event.creator)
            }

            await Booking.deleteOne({_id: args.bookingId})   
                                    
            return event
        }catch(err){
            throw err
        }
    }
}







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