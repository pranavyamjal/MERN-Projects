import mongoose, { Schema } from "mongoose";

const likeScheme = new Schema ({

    video: {

        type: Schema.Types.ObjectId,
        ref: "Video"

    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },

    likedBy: {
        type: Schema.Types.ObjectId,
        ref:"Like"
    }

}, {timestamps: true})

export const Like = mongoose.model("Like", likeScheme)