import mongoose, {isValidObjectId} from "mongoose";
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler( async (req, res) => {
    const { channelId } = req.params

    // Toggle subscription

    // validate channelId
    if(!(isValidObjectId(channelId))) {
        throw new ApiError(400, "Invalid Channel ID")
    }

    // database operation
    const subscription = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id
    })

    if(subscription) {
        await Subscription.findByIdAndDelete(subscription._id)
        return res
        .status(200)
        .json(
            new ApiResponse(200, subscription, "Unsubscribed Successfully")
        )
    }

    const newSubscription = await Subscription.create({
        channel: channelId,
        subscriber: req.user._id
    })

    if(!newSubscription) {
        throw new ApiError(400, "Subscription Failed")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, newSubscription, "Subscribed Successfully")
    )



})

// controller to return subsciber list of channel
const getUserChannelSubscribers = asyncHandler( async (req, res) => {
    const {channelId} = req.params

    // Validate channelId
    if(!(isValidObjectId(channelId))) {
        throw new ApiError(400, "Invalid Channel ID")
    }

    const subscribers = await Subscription.find({
        channel: channelId
    })

    if(!subscribers || subscribers.length === 0) {
        throw new ApiError(400, "No Subscribers to show")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, subscribers, "Subscribers Fetched Successfully")
    )

})


// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler( async (req, res) => {
    const { subscriberId } = req.params

    // Validate subscriberId
    if(!(isValidObjectId(subscriberId))) {
        throw new ApiError(400, "Invalid Subscriber ID")
    }

    const channels = await Subscription.find({
        subscriber: subscriberId
    })

    if(!channels || channels.length === 0) {
        throw new ApiError(400, "No Channels to show")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channels, "Channels Fetched Successfully")
    )


})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}