class ApiResponse {
  constructor(success = true, message = '', data = null, code = 200) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.code = code;
  }

  static success(message = 'Success', data = null, code = 200) {
    return new ApiResponse(true, message, data, code);
  }

  static error(message = 'Something went wrong', data = null, code = 500) {
    return new ApiResponse(false, message, data, code);
  }
}

module.exports = ApiResponse;
