const Event = require("../../models/event")
const User = require("../../models/user")
const { dateToString} = require('../../helpers/date');


const transformEvent = event =>{
    console.log("THe 10",event,event._doc.date)
    return {
        ...event._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this,event.creator)
    };
};




const transformBooking = booking =>{
    return {
        ...booking._doc,
        user: user.bind(this,booking._doc.user),
        singleEvent:singleEvent.bind(this,booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt),
    }
}



const events = async eventIds =>{
    try{
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event => {
            return transformEvent(event);
        });
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
        return transformEvent(eventId);
    }catch(err){
        throw err
    }
};


exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;