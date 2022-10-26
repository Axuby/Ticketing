import mongoose from "mongoose";

// Interface for attributes required to create a new user
interface UserAttrs {
    email: string;
    password:string
}
//interface that describes the properties of a User Model(what the entire collection of Users looks like)
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc;
}
//interface that describes the properties of a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}
const userSchema = new  mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },

});


userSchema.statics.build = (attrs:UserAttrs) => {
    return new User(attrs)

}

const User = mongoose.model<UserDoc, UserModel>('User',userSchema)
// const user = User.build({
//     email:"test@example.com",
//     password: "ddd",
// })
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// }

// buildUser({
//     email:"test@example.com",
//     password: "ddd",
// })
export { User }
// export {User,buildUser}
// module.exports = User;