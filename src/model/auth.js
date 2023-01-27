import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Auth = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    refresh_token : {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth Model", Auth);
export default AuthModel;
