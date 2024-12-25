import mongoose, { Schema, Scheme } from "mongoose";

const playlistSchema = new Scheme({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    videos: [
        {
            type: Schema.types.ObjectId,
            ref: "Video"
        }
    ],
    
    owner: {
        type: Schema.types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Playlist = mongoose.model("Playlist", playlistSchema)