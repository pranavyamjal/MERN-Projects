/**
 * Async Handler Utility - Evolution of implementation:
 */

// Stage 1: Basic empty function
// const asyncHandler = () => {}

// Stage 2: Function that returns another function
// const asyncHandler = (func) => () => {}

// Stage 3: Async wrapper function
// const asyncHandler = (func) => async () => {}

/**
 * Stage 4: Complete implementation with try-catch
 * Handles API endpoints with error handling
 * This version explicitly handles errors and sends error responses
 */
/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/

/**
 * Stage 5: Final implementation using Promise resolution
 * Higher-order function that wraps request handlers to handle async operations
 * @param {Function} requestHandler - Express route handler function to wrap
 * @returns {Function} Wrapped handler that manages promises and errors
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {  // Returns middleware function
        Promise.resolve(requestHandler(req, res, next))  // Converts handler to Promise
        .catch((err) => next(err))  // Passes any errors to Express error handler
    }
}

export { asyncHandler }

/**
 * Usage example:
 * 
 * app.get('/users', asyncHandler(async (req, res) => {
 *     const users = await User.find({});
 *     res.json(users);
 * }));
 */

// Note: There's a syntax error in the final implementation:
// Missing 'return' statement before the middleware function.
// Here's the corrected version:

const correctedAsyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}