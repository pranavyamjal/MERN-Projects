import mongoose, { isValidObjectId } from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { userId } = req.params
    // Toggle like on video

    // validate the videoID
    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video is not available")
    }

    // Check if the like already exists
    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: userId
    })

    if(existingLike){
        // if the like exists, remove it (unlike)
        await existingLike.remove();

        return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Unliked the video successfully")
        )
    }

    // If the like doesn't exist, create it
    const newLike = await Like.create({
        video: videoId,
        likedBy: userId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, newLike, "Liked the video successfully")
    )
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const {userId} = req.params
    // Toggle like on comment
    
    // validate comment id
    if(!(isValidObjectId(commentId))) {
        throw new ApiError(200, "Comment doesn't exist | no comment id found")
    }

    // check for existing like on the comment
    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: userId
    })

    if(existingLike){
        // unlike
        existingLike.remove();

    return res
        .status(200)
        .json(
            new ApiResponse("Unliked the comment Successfully")
        )
    }

    // If the like doesn't exists, create it
    const newLike = await Like.create({
        commentId: commentId,
        likedBy: userId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, newLike, "Liked comment successfully!")
    )
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const {userId} = req.params
    // Toggle like on tweet

    //validate tweetId
    if(!(isValidObjectId(tweetId))){
        throw new ApiError(400, "Tweet ID doesn't Exists")
    }

    // check for existing like on the tweet 
    const existingLike = await Like.findOne({
        tweetId: tweetId,
        userId: userId
    })

    //unlike if exists like already
    if(existingLike){
        existingLike.remove();

        return res
        .status(200)
        .json(
                new ApiResponse(200, null, "Unliked tweet successfully")
            )
    }

    // no existing like then create one
    const newLike = await Like.create({
        tweetId: tweetId,
        likedBy: userId
        })
    

    return res
    .status(200)
    .json(
        new ApiResponse(200, newLike, "Liked the tweet successfully")
    )

})

const getLikedVideos = asyncHandler(async (req, res) => {

    // Get all liked videos by the user
    const userId = req.user._id; // Assuming `req.user` is populated after authentication

    // Validate the userId
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    // Fetch liked videos from the database
    const likedVideos = await Like.find({ likedBy: userId }).populate("video");

    // Check if no videos were liked
    if (!likedVideos || likedVideos.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, [], "No liked videos by user yet")
        );
    }

    // Return the liked videos
    return res.status(200).json(
        new ApiResponse(200, likedVideos, "Liked videos by user fetched successfully")
    );
})


export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}