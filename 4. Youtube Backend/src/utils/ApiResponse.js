/**
* ApiResponse Class
* Standardizes API response format across the application
*/
class ApiResponse {
    /**
     * Creates a consistent response object for API endpoints
     * 
     * @param {number} statusCode - HTTP status code for the response
     * @param {any} data - The data payload to send back
     * @param {string} message - Response message (defaults to "Success")
     */
    constructor(statusCode, data, message = "Success") {
        // HTTP status code (200, 201, 400, 404, etc.)
        this.statusCode = statusCode
 
        // Response payload/data
        this.data = data 
 
        // Response message
        this.message = message
 
        // Automatically set success based on status code
        // Status codes < 400 indicate success (2xx, 3xx)
        // Status codes >= 400 indicate errors (4xx, 5xx) 
        this.success = statusCode < 400
    }
 }
 
 /**
 * Usage examples:
 * 
 * // Success response
 * new ApiResponse(200, {user: userData}, "User created successfully")
 * // Returns: {statusCode: 200, data: {user: ...}, message: "User created successfully", success: true}
 * 
 * // Error response 
 * new ApiResponse(404, null, "User not found")
 * // Returns: {statusCode: 404, data: null, message: "User not found", success: false}
 */