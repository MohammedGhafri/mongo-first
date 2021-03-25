const Event = require('../../models/event')
const User = require('../../models/user');

const {transformEvent} = require('./merge');



const { dateToString } = require('../../helpers/date')




module.exports = {
    events: async() => {
        // return events;
        try{
        const events = await Event.find()
        
            return events.map(event => {
                return transformEvent(event);
                return event
            });
        }catch(err){
                throw err;
            }
       
    },
    
    createEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error('UnAuthenticated')
        }
        const event = new Event({
                 title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        
        date: new Date(args.eventInput.date),
        creator: req.userId
        })
        // events.push(event)
        let createdEvent;
        try{
        const result = await event.save()
            // console.log(result);
            createdEvent = transformEvent(result)
            const creatorUser = await User.findById(req.userId)
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
    }
}