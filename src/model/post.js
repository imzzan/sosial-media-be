import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema({
    body : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
})

const PostModel = mongoose.model('PostModel', Post);

export default PostModel;