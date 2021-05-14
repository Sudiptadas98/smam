const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    mid: {
        type: Number,
        required: true
    },
    mtype: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [
        {
            type: ObjectId,
            ref: "USER"
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: ObjectId,
                ref: "USER"
            }
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: "USER"
    },
    date: {
        type: Date,
        default: Date.now
    }
})



const Post = mongoose.model("POST", postSchema);

module.exports = Post;