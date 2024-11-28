import mongoose, { Model, Schema } from "mongoose"


interface IUser {
    name: string
    email: string
}

const userSchema = new Schema<IUser>({
    name: {type:String, required: true},
    email: {type: String, required: true, unique:true},
})

let User: Model<IUser>

try {
    User = mongoose.model<IUser>('User')
} catch {
    User = mongoose.model<IUser>('User', userSchema)
}

export default User

// User 가 있다면 그대로 사용, 없다면 userSchema로 생성해라