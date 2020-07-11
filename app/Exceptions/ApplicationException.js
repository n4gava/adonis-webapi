"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");
const status = 401;
const code = "E_APPLICATION_ERROR";

class ApplicationException extends LogicalException {
  constructor(message) {
    super(message, status, code);
  }
}

module.exports = ApplicationException;
