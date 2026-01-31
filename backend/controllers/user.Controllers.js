import User from "../models/user.model.js"


async function handleSignUp(req, res) {
    try {
        const username = req.params
       const user = await User.findOne({username: username}) 
       if(user) {
        return res.json({
            message: "Username already taken"
        })
       }
       const userName = await User.create({
        username: username
       })
       return res.json({
        message: "username created succesfully",
        success: true
       })
    } catch (error) {
        console.log(error)
    }
}

export {handleSignUp}