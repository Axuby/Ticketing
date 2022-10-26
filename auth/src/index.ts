import express from 'express'
import {json} from 'body-parser'
// import cors from 'cors'
// import expressJwt from 'express-jwt'
import mongoose, { connect } from 'mongoose';

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// app.all('*',async (req, res) => {
//     throw new NotFoundError();
// })
// app.use(errorHandler)

const start = async () => {
    // 'mongoose://auth-mongo-srv:27017/auth
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            // useUnifiedTopology: true,
        })
    console.log("connected to MongoDB")
    } catch (error) {
        console.log(error);
    }
        app.listen(3000,()=> {
        console.log('listening on port 3000')
    })
}

start();




