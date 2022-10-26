import express, { Request,Response} from 'express'
import { body, validationResult } from 'express-validator';
import { User } from '../models/user'
// import { RequestValidationError} from '../errors/bad-request-error';
// import { DatabaseConnectionError } from  '../errors/db-connection-errors';
const router  = express.Router()

router.post('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({
        min:4,
        max:32
    }).withMessage('Password must be btw 4 and 20 characters')
],async (req: Request,res: Response) => {
         const errors = validationResult(req);

        // if(!errors.isEmpty()) {
        //     throw new RequestValidationError(errors.array());
        // }

        const {email,password } = req.body;
        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            console.log(existingUser.email);
            console.log("Email already in use");
            return res.status(409).send({});
            

        }

        const user =   User.build({ email,password})
        await user.save();
        res.status(201).send({})


     
})

export { router as signupRouter }