import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

    const filter = {
        ...(query && { title: { $regex: query, $options: "i" } }), // Case-insensitive title search
        ...(userId && { owner: userId }), // Filter by userId if provided
    };

    try {
        const videos = await Video.find(filter)
            .sort({ [sortBy]: sortType === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalVideos = await Video.countDocuments(filter);

        return res.status(200).json(
            new ApiResponse(200, { videos, total: totalVideos, page, limit }, "Videos fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error while fetching videos");
    }
});


const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { userId } = req.params;

    // Validate title and description
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    // Validate file uploads
    const videoFile = req.files?.videoFile?.[0]; // Assuming `videoFile` is uploaded using multer
    const thumbnail = req.files?.thumbnail?.[0]; // Assuming `thumbnail` is uploaded using multer

    if (!videoFile || !thumbnail) {
        throw new ApiError(400, "Video file and thumbnail are required");
    }

    try {
        // Upload video and thumbnail to Cloudinary
        const videoUpload = await uploadOnCloudinary(videoFile.path);
        const thumbnailUpload = await uploadOnCloudinary(thumbnail.path);

        if (!videoUpload.url || !thumbnailUpload.url) {
            throw new ApiError(400, "Error while uploading to Cloudinary");
        }

        // Create video entry in the database
        const videoInDb = await Video.create({
            videoFile: videoUpload.url,
            thumbnail: thumbnailUpload.url,
            title,
            description,
            isPublished: true,
            owner: userId,
        });

        if (!videoInDb) {
            throw new ApiError(400, "Error while creating video in database");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, videoInDb, "Video Published Successfully"));
    } catch (error) {
        throw new ApiError(500, "An error occurred while publishing the video");
    }

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // Get video by id

    // check for videoID
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Video id is not available ")
    }

    // Check video by video id in db
    const video = await Video.findById(videoId)

    if(!video)
    {
        throw new ApiError(400, "Video doesn't exist in db")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Video is fetched successfully")
    )

})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {title, description, thumbnail} = req.body
    //Update video details like title, description, thumbnail

    // Validate the video id
    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video ID is invalid")
    }

    // Check for the details in body
    if(!(title || description || thumbnail)){
        throw new ApiError(400, " Please provide what to update Title, Description or Thumbnail")
    }

    // Database operations

try {
        const editdetails = await Video.findByIdAndUpdate(
            videoId,
            {
                title: title,
                description: description,
                thumbnail: thumbnail
            },
            {new: true}
        )
    
        if(!editdetails){
            throw new ApiError(400, "Details not got updated in DB"
            )
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, editdetails, "Details successfully updated in video")
        )
} catch (error) {
    throw new ApiError(500, "Error while updating in the DB")
}

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    // Delete video

    // validate the video id
    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video id is invalid")
    }

    // database operations 
try {
        const deleteVideo = await Video.findByIdAndDelete(videoId)
    
        if(!deleteVideo){
            throw new ApiError(400, "Video not Deleted")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, deleteVideo, "Video deleted successfully")
        )
} catch (error) {
    throw new ApiError(500, "Error While Deleting the video in DB")
}


})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const { userId } = req.params

    // validate videoId
    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video id is not valid")
    }

    // find the video by ID and owner
try {
        const updatedVideo = await Video.findOneAndUpdate(
            { _id: videoId, owner: userId }, // Filter by video ID and owner
            [{ $set: { isPublished: { $not: "$isPublished" } } }], // Toggle `isPublished`
            { new: true } // Return the updated document
        );
    
        // If video not found, throw an error
        if (!updatedVideo) {
            throw new ApiError(404, "Video not found or unauthorized");
        }
    
        const message = updatedVideo.isPublished? "video is published" : "video is unpublished"
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, video, message)
        )
} catch (error) {
    console.log(error)
    throw new ApiError(500, "Error while updating videostatus in DB")
}

})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}