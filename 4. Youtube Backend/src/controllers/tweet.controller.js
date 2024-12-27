import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const createTweet = asyncHandler( async (req, res) => {
    const {content, username} = req.body

    if(!username){
        throw new ApiError(400, "User is not logged In")
    }

    if(!content){
        throw new ApiError(400, "Content is required")
    }

    // check for the user in db
    const user = await User.findOne({username: username})

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const userId = user._id
    
    const tweet = await Tweet.create({
        content: content,
        owner: userId,
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweet, "Tweet created successfully!")
    )
})

const getUserTweets = asyncHandler( async (req, res) => {
    // Get user tweets

    const {userId} = req.params

    if(!userId){
        throw new ApiError(400, "UserId is Required")
    }

    // validate userId

    if(!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid User ID")
    }

    const user = await User.findOne({_id: userId})

    if(!user){
        throw new ApiError(400, "User Not Exists")
    }

    const tweets = await Tweet.findById({ owner: userId}).sort({ createdAt: -1}) // 1 = ascending & -1 = descending

    if(!tweets || tweets.length === 0) {
        throw new ApiError(400, "No tweet to show")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweets, "Tweets fetched Successfully ")
    )

})

const updateTweet = asyncHandler( async (req, res) => {
    // Update a specific tweet
    const { tweetId } = req.params
    const { content } = req.body

    // Check for the content
    if (!content) {
        throw new ApiError(400, "Content is required to update the tweet");
    }

    // validate tweetID
    if(!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID")
    }

    // Database operation
    const tweet = await User.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content
            },
        },
        {new: true}     // returns the updated tweet
    ).select("-owner") // excludes the owner field from result

        if (!tweet) {
            throw new ApiError(404, "Tweet not found or you are not authorized to update it");
        }
    
        
        return res
        .status(200)
        .json(new ApiResponse(200, "Tweet updated successfully", tweet));
})

const deleteTweet = asyncHandler( async (req, res) => {
    // Delete tweet

    const {tweetId} = req.params

    // check tweetid and content
    if(!(tweetId)) {
        throw new ApiError(400, "Tweet ID is required")
    }

    // Database operation
    const tweet = await Tweet.findByIdAndDelete(tweetId)

    // validate tweet
    if(!tweet){
        throw new ApiError(400, "Tweet Doesn't Exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, tweet, "Tweet Deleted Successfully")
    )

})


export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}