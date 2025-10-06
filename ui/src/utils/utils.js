const { Prisma } = require("@prisma/client");
const multer = require("multer");

const formatZodError = (validationResult) => {
  const userFriendlyErrors = {};
  validationResult.error.errors.forEach((error) => {
    error.path.forEach((path) => {
      if (error.received === "undefined" || error.received === undefined) {
        userFriendlyErrors[path] = `${path} is Required`;
      } else {
        userFriendlyErrors[
          path
        ] = `${path} should be ${error.expected}, provided ${error.received}`;
      }
    });
  });

  return userFriendlyErrors;
};
const validateRequest = (schema) => (req, res, next) => {
  const validationResult = schema.safeParse(req.body);

  if (!validationResult.success) {
    const userFriendlyErrors = formatZodError(validationResult);
    return res.status(400).json({ error: userFriendlyErrors });
  }
  req.zBody = validationResult.data; // Attach validated data to request object
  next();
};

const getPrismaErrorMessage = (error) => {
  console.log(
    `[ProductRepository] Error creating getPrismaErrorMessage`,
    error
  );
  // if (!error.code){
  //     throw Error(`Error Object Not Found ${error}`);
  // }else{
  //     console.log(`Error Code : ${error.code}`);
  // }
  let errorBody = {};

  const errorMessages = {
    // ✅ Unique Constraint
    P2002: { message: "Record already exists", statusCode: 400 },

    // ✅ Foreign Key Constraint
    P2003: { message: "Record does not exist", statusCode: 400 },

    // ✅ Record Not Found
    P2025: { message: "Record not found", statusCode: 404 },

    // ✅ Missing Related Record
    P2017: { message: "Missing related record", statusCode: 400 },

    // ✅ Required Record Not Found
    P2018: { message: "Required record was not found", statusCode: 404 },

    // ✅ Query Interpretation Error
    P2016: { message: "Query interpretation error", statusCode: 400 },

    // ✅ Nested Connect/Create Failed
    P2014: { message: "Nested connect or create failed", statusCode: 400 },

    // ✅ Table or Column Not Found
    P2021: {
      message: "Table or column not found in database",
      statusCode: 500,
    },

    // ✅ Column Missing in Database
    P2022: { message: "Column missing in database", statusCode: 500 },

    // ✅ Inconsistent Database State
    P2023: { message: "Inconsistent database state", statusCode: 500 },

    // ✅ Transaction Conflict
    P2034: { message: "Transaction failed due to conflict", statusCode: 409 },

    // ✅ Database Connection Error
    P3000: { message: "Database connection error", statusCode: 500 },

    // ✅ Database Timeout
    P3001: { message: "Database operation timeout", statusCode: 500 },

    // ✅ Invalid Database Credentials
    P3002: { message: "Invalid database credentials", statusCode: 500 },

    // ✅ Invalid Prisma Schema
    P4000: { message: "Invalid Prisma schema detected", statusCode: 500 },

    // ✅ Invalid Input
    P5000: { message: "Invalid input provided", statusCode: 400 },
  };

  if (error.code && errorMessages[error.code]) {
    errorBody.message = errorMessages[error.code].message;
    errorBody.statusCode = errorMessages[error.code].statusCode;
  } else {
    errorBody = error;
    errorBody.message = error.message;
  }

  return errorBody;
};

const prismaErrorHandler = (error, req, res, next) => {
  console.log(error);
  console.log(
    `Prisma Error Handler ${
      error instanceof Prisma.PrismaClientKnownRequestError
    }`
  );
  if (
    !(
      error.name === "PrismaClientKnownRequestError" ||
      error.name === "PrismaClientValidationError"
    )
  ) {
    return next(error); // Not a Prisma error, pass to the next middleware
  }

  console.error(error.meta);

  if (error.name === "PrismaClientValidationError") {
    return res
      .status(400)
      .json({ success: false, message: `Invalid data format.`, meta: error });
  }
  let { message, statusCode } = getPrismaErrorMessage(error);
  message = message || "An unexpected error occurred";
  statusCode = statusCode || 500;
  return res
    .status(statusCode)
    .json({ success: false, message, meta: error.meta });
};

const globalErrorHandler = (error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  return res.status(500).json({ error: error.message });
};

function createRoleBasedRouting(roleHandlers) {
  return function roleBasedRouting(req, res, next) {
    const role = req.user.role; // Get the user's role

    // Check if the role exists in the handlers configuration
    if (roleHandlers[role]) {
      // If the role has a handler, invoke it
      roleHandlers[role](req, res);
    } else {
      // If the role is not recognized, send an error
      res.status(403).send("Forbidden: Role not recognized");
    }
  };
}

// Function to dynamically set the destination path for uploads
const storage = (subfolder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = `./uploads/${subfolder || "default"}`; // Set subfolder dynamically
      cb(null, folderPath); // Store file in the dynamic folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid duplicates
    },
  });

// Create a new multer instance with dynamic storage
const upload = (subfolder) => multer({ storage: storage(subfolder) });

module.exports = {
  validateRequest,
  prismaErrorHandler,
  upload,
  getPrismaErrorMessage,
  formatZodError,
  globalErrorHandler,
  createRoleBasedRouting,
  convertToLowercase,
};
