/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser,UserModel>(
  {
    
    name: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
      },
      required: true,
      default:'user'
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next){
const user=this
user.password=await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
)
next()
})
// set empty string after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
  
    // console.log(this);
    next();
  });
  
userSchema.static('isUserExistsByEmail', async function (email: string) {
    return await User.findOne({ email }).select('+password');
});

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };

export const User = model<TUser,UserModel>("User", userSchema);
