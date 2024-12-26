import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createTweet = asyncHandler( async (req, res) => {
    // Create tweet
})

const getUserTweets = asyncHandler( async (req, res) => {
    // Get user tweets
})

const updateTweet = asyncHandler( async (req, res) => {
    // Update tweet
})

const deleteTweet = asyncHandler( async (req, res) => {
    // Delete tweet
})


export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}