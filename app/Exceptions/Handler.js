"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  customErrorMessages = () => {
    const customMessages = [];
    customMessages.push({
      errorName: "PasswordMisMatchException",
      message: "Cannot verify user password",
    });

    return customMessages;
  };

  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  handle = async (error, { request, response }) => {
    var customError = this.customErrorMessages().find(
      (e) => e.errorName === error.name
    );
    response
      .status(error.status)
      .send({ Error: customError ? customError.message : error.message });
  };

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
