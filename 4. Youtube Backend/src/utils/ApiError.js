/**
 * Custom API Error class that extends the built-in Error class
 * Used for handling API-specific errors with additional properties
 */
class ApiError extends Error {
    /**
     * Creates a new ApiError instance
     * @param {number} statusCode - HTTP status code for the error
     * @param {string} message - Error message (defaults to "Something went wrong")
     * @param {Array} error - Array of specific error details (defaults to empty array)
     * @param {string} statck - Custom error stack trace (optional)
     */
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        // Call parent Error constructor with message
        super(message)

        // Initialize class properties
        this.statusCode = statusCode  // HTTP status code
        this.data = null             // Placeholder for any error-related data
        this.message = message       // Error message
        this.success = false         // Indicates operation failure
        this.errors = errors         // Array of detailed errors

        // Handle stack trace
        if(stack) {
            // Use provided custom stack trace if available
            this.stack = stack
        }
        else {
            // Capture and set standard stack trace
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// Note: There are a few typos in the original code:
// 1. 'error' parameter is used but 'errors' property is set
// 2. 'statck' is misspelled (should be 'stack')
// 3. 'this.statusCode' line is incomplete (missing assignment)

export {ApiError}