const Event = require("../../models/event")
const Booking = require('../../models/booking')
const { transformBooking, transformEvent } = require('./merge')








module.exports = {
  
    booking: async ()=>{
        try{
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking)
            })
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

            return transformBooking(result)

       
    },
    cancelBooking: async args =>{
        try{
            const booking = await (await Booking.findById(args.bookingId)).populate('event');
            console.log(booking,booking.event)
                // console.log(Event.findOne({_id:booking.event}))
            
            const event = transformEvent(booking.event)

            await Booking.deleteOne({_id: args.bookingId})   
                                    
            return event
        }catch(err){
            throw err
        }
    }
}
