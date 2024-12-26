import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler( async (req, res) => {
    // Get the channel stats like total video views, total subscribers, total 
})

const getChannelVideos = asyncHandler( async (req, res) => {
    // Get all the videos uploaded by the channel
})

export {
    getChannelStats,
    getChannelVideos
}