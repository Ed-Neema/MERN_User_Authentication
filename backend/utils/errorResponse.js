/**
 * New class named ErrorResponse that extends the built-in Error class. By extending Error, the ErrorResponse class inherits all the properties and behaviors of the Error class.
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message); //properly initialize the error object with the provided message.
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;