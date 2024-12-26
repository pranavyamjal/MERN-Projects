import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createPlaylist = asyncHandler( async (req, res) => {
    const {name, description} = req.body

    // Create Playlist

})

const getUserPlaylists = asyncHandler( async (req, res) => {
    const { userId } = req.params
    
    // Get user playlist

})

const getPlaylistById = asyncHandler( async (req, res) => {
    const { playlistId } = req.params

    // Get playlist by id

})

const addVideoToPlaylist = asyncHandler( async (req, res) => {
    const {playlistId, videoId} = req.params

})

const removeVideoFromPlaylist = asyncHandler( async (req, res) => {
    const {playlistId, videoId} = req.params

    // Remove video from playlist
})


const deletePlaylist = asyncHandler( async (req, res) => {
    const { playlistId } = req.params

    // delete playlist
})

const updatePlaylist = asyncHandler( async (req, res) => {
    const { PlaylistId } = req.params
    const { name, description } = req.body

    // update playlist
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