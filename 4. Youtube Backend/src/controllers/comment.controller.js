import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler (async (req, res) => {
    
    // Get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // Add a comment to a video
})

const updateComment = asyncHandler( async (req, res) => {
    // Update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // Delete a comment 
})


export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}