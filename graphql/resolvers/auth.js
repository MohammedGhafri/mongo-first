const bcrypt = require('bcryptjs')
const User = require('../../models/user')





module.exports = {

   
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
                
    }
}