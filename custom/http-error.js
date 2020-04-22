/**
 * Custom class to handle errors
 */
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message) // Adds a 'message' to the error instance
        this.code = errorCode // Adds a 'error code' to the error instance
    }
}

module.exports = HttpError