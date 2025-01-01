import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler( async (req, res) => {
    // Get the channel stats like total video views, total subscribers, total 

    const totalViews = await Video.aggregate([
        {
            $match: {
                channel: mongoose.Types.ObjectId(req.channel._id)
            }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$views" }
            }
        }
    ])

    const totalSubscribers = await Subscription.aggregate([
        {
            $match: {
                channel: mongoose.Types.ObjectId(req.channel._id)
            }
        },
        {
            $group: {
                _id: null,
                totalSubscribers: { $sum: 1 }
            }
        }
    ])

    const totalLikes = await Like.aggregate([
        {
            $match: {
                channel: mongoose.Types.ObjectId(req.channel._id)
            }
        },
        {
            $group: {
                _id: null,
                totalLikes: { $sum: 1 }
            }
        }
    ])

    if(totalViews.length > 0 && totalSubscribers.length > 0 && totalLikes.length > 0){
        return res
        .status(200)
        .json(
            new ApiResponse(200, {
                totalViews: totalViews[0].totalViews,
                totalSubscribers: totalSubscribers[0].totalSubscribers,
                totalLikes: totalLikes[0].totalLikes
            }, "Channel stats fetched successfully")
        )
    } else {
        throw new ApiError(400, "Channel stats not found")
    }
})

const getChannelVideos = asyncHandler( async (req, res) => {
    // Get all the videos uploaded by the channel

    // validate channel id
    if(!(isValidObjectId(req.params.channelId))) {
        throw new ApiError(400, "Invalid Channel ID")
    }

    const videos = await Video.find({channel: req.params.channelId})

    if(videos.length > 0){
        return res
        .status(200)
        .json(
            new ApiResponse(200, videos, "Channel videos fetched successfully")
        )
    } else {
        throw new ApiError(400, "Channel videos not found")
    }
    
})

export {
    getChannelStats,
    getChannelVideos
}