const LocalStrategy = require('passport-local').Strategy             //Authenticate the user locally
const bcrypt = require('bcrypt')                                  //A password hashing function

function initialize(passport,getUserByUsername, getUserById) {       //Checks and returns the error message if
    const authenticateUser = async (username, password, done) => {   // username or password is wrong
        const user = getUserByUsername(username)
        if (user.username == null){
            return done(null,false,{message:'No user with that username'})
        }
        try{
            if(await bcrypt.compare(password,user.password)){     //compare the password to the password had saved locally
                return done(null,user)
            }else{
                return done(null,false,{ message:'Password incorrect' })
            }
        } catch(e){
            return done(e)
        }
    }


    passport.use(new LocalStrategy({ usernameField: 'username'},              //Use local strategy and use function
        authenticateUser))
    passport.serializeUser((user,done) => done(null,user.id))
    passport.deserializeUser((id,done) => {
       return done(null, getUserById(id))

    })
}


module.exports = initialize