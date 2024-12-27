import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const healthcheck = asyncHandler( async (req, res) => {
    // Build a healthcheck response that simply returns OK status as json with a message

    
        return res
        .status(200)
        .json(
        new ApiResponse(200, req.body, "Good Health Requester data fetched successfully")
        );
    
});

export {
    healthcheck
}