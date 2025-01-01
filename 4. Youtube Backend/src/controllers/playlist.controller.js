import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createPlaylist = asyncHandler( async (req, res) => {
    const {name, description} = req.body
    const {userId} = req.params

    // Create Playlist
    
    // Check for name and description
    if((!name && description)){
        throw new ApiResponse(400, "Name and Description are required")
    }

    // database operation
    const playlist = await Playlist.create({
        name: name,
        description: description,
        owner:userId
    })

    if(!playlist){
        throw new ApiError(400,"Playlist not created")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlist, "Playlist created successfully")
    )


})

const getUserPlaylists = asyncHandler( async (req, res) => {
    const { userId } = req.params
    
    // Get user playlist

    // database operation
    const userPlaylist = await Playlist.findOne({
        owner: userId
    })

    if(!userPlaylist || userPlaylist.length === 0){
        throw new ApiError(400, "User has no playlist yet")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, userPlaylist, "Playlist by user fetched successfully")
    )

})

const getPlaylistById = asyncHandler( async (req, res) => {
    const { playlistId } = req.params

    // Get playlist by id

    // validate playlist ID
    if(!(isValidObjectId(playlistId))){
        throw new ApiError(400, "Playlist id is invalid")
    }

    // database operation
    const playlistById = await Playlist.findOne(playlistId)


    if(!playlistById || playlistById.length === 0){
        throw new ApiError(400, "Playlist doesn't Exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, playlistById, "Playlist by id fetched successfully")
    )

})

const addVideoToPlaylist = asyncHandler( async (req, res) => {
    const {playlistId, videoId} = req.params


    // validate playlist and video id
    if(!(isValidObjectId(playlistId))){
        throw new ApiError(400, "Playlist id is invalid")
    }

    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video id is invalid")
    }

    // database operation
    const addVideo = await Playlist.findByIdAndUpdate(
        playlistById,
        {
            videos: videoId,
        }
    )

    if(!addVideo){
        throw new ApiError(400, "Video not added to playlist")
    }

    return res 
    .status(200)
    .json(
        new ApiResponse(200, addVideo, "Video added to playlist successfully")
    )


})

const removeVideoFromPlaylist = asyncHandler( async (req, res) => {
    const {playlistId, videoId} = req.params

    // Remove video from playlist

    // validate playlist and video id
    if(!(isValidObjectId(playlistId))){
        throw new ApiError(400, "Playlist id is invalid")
    }

    if(!(isValidObjectId(videoId))){
        throw new ApiError(400, "Video id is invalid")
    }

    // database operation
    const removeVideo = await Playlist.findByIdAndUpdate(
        playlistById,
        {
            $pull: {
                videos: videoId
            }
        }
    )

    if(!removeVideo){
        throw new ApiError(400, "Video not removed from playlist")
    }

    return res 
    .status(200)
    .json(
        new ApiResponse(200, removeVideo, "Video removed from playlist successfully")
    )
})


const deletePlaylist = asyncHandler( async (req, res) => {
    const { playlistId } = req.params

    // delete playlist

    // validate playlist ID
    if(!(isValidObjectId(playlistId))){
        throw new ApiError(400, "Playlist id is invalid")
    }

    // database operation
    const deletePlaylist = await Playlist.findByIdAndDelete(playlistId)

    if(!deletePlaylist){
        throw new ApiError(400, "Playlist not deleted")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, deletePlaylist, "Playlist deleted successfully")
    )
})

const updatePlaylist = asyncHandler( async (req, res) => {
    const { PlaylistId } = req.params
    const { name, description } = req.body

    // update playlist

    // validate playlist ID
    if(!(isValidObjectId(playlistId))){
        throw new ApiError(400, "Playlist id is invalid")
    }

    // database operation
    const updatePlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            name: name,
            description: description
        }
    )

    if(!updatePlaylist){
        throw new ApiError(400, "Playlist not updated")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatePlaylist, "Playlist updated successfully")
    )
})


export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}