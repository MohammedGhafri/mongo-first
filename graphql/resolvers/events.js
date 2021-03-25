const Event = require('../../models/event')
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
        creator:'605b3bf1073f679f0d9cfcd4'
        })
        // events.push(event)
        let createdEvent;
        try{
        const result = await event.save()
            // console.log(result);
            createdEvent = transformEvent(result)
            const creatorUser = await User.findById('605b3bf1073f679f0d9cfcd4')
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