import mongoose, { isValidObjectId } from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler (async (req, res) => {
    
    // Get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

    // Validate the video ID
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Video ID is invalid")
    }

    try {
        // Pagination query for comments
        const comments = await Comment.find({ video: videoId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }) // Sort comments by creation date (latest first)

        return res
            .status(200)
            .json(
                new ApiResponse(200, comments, "Comments retrieved successfully")
            )
    } catch (error) {
        console.error(error)
        throw new ApiError(500, "Error while fetching comments")
    }  

})

const addComment = asyncHandler(async (req, res) => {
    // Add a comment to a video
    const {videoId, userId} = req.params
    const {content} = req.body

    // validate the video ID
    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video id is invalid")
    }

    // check for content
    if(!content){
        throw new ApiError(400, "Content is required")
    }

    // database operation
    const addComment = await Comment.create({ 
        content:content,
        owner: userId
    })

    if(!addComment){
        throw new ApiError(400, "Comment Not Added")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,addComment,"Comment added successfully")
    )

}) 

const updateComment = asyncHandler( async (req, res) => {
    // Update a comment

    const {videoId, commentId} = req.params
    const {content} = req.body

    // check for content
    if(!content){
        throw new ApiError(400, "Content is required")
    }

    // Validate videoId
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Video id is invalid")
    }

    // Validate commentId
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Comment id is invalid")
    }

    // database operation
try {
        const comment = await Comment.findOneAndUpdate(
            { _id: commentId, video: videoId }, // Ensure comment belongs to the video
            { $set: { content } },
            { new: true }
        );
    
        if(!comment){
            throw new ApiError(400, "Comment Not Updated")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200,comment,"Comment updated successfully")
        )
} catch (error) {
    console.log(error)
    throw new ApiError(500, "Error while updating the comment")
}


})

const deleteComment = asyncHandler(async (req, res) => {
    // Delete a comment 

    const {videoId, commentId} = req.params

    // validate videoId
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Video Id is invalid")
    }

    // validate commentId
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "comment ID is invalid")
    }


    // database operation
try {
        const comment = await Comment.findOneAndDelete({
            _id: commentId,
            author: userId // Ensure the comment belongs to the authenticated user
        });
    
        if(!comment){
            throw new ApiError(400, "Comment not deleted")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, "Comment deleted successfully")
        )
} catch (error) {
    console.log(error)
    throw new ApiError(500, "Error while deleting the comment in DB")
}
})


export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}