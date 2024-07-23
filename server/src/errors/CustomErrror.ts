class CustomError extends Error {
  // message: string;
  statusCode: number;
  constructor (message: string, statusCode: number) {
    super(message);
    // this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;

// HttpException
// class CustomError extends Error {
//   name?: string;
//   status: number;

//   constructor ({ status, message }: CustomError) {
//     super(message);
//     this.name = 'Custom error';
//     this.status = status;
//   }
// }
// // USE THIS ONE FOR AL CASES IN CONTROLLERS TO RETURN ERRORS next(createError(...))

// export default CustomError;