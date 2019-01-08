const validationSchemas = require("./validationSchemas");
const joi = require("joi");

const validator = (req, res, next) => {
  let schemaToCheckAgainst;
  switch (req.url) {
    case "/login":
      schemaToCheckAgainst = validationSchemas.loginSchema;
      break;
    case "/register":
      schemaToCheckAgainst = validationSchemas.registerSchema;
      break;
    case "/create-one":
      schemaToCheckAgainst = validationSchemas.createProjectSchema;
      break;
    default:
      schemaToCheckAgainst = null;
      break;
  }

  joi.validate(
    req.body,
    schemaToCheckAgainst,
    {
      abortEarly: false,
      allowUnknown: false
    },
    (err, validData) => {
      if (err) {
        /*
        Custom error structure: 
        fail {
          validationErrors: {
            {
              fieldname: ['error message 1', 'error message 2',...]
            },
            {
              ...
            }
          }
        }
        */

        const customErrors = {};
        for (let error of err.details) {
          let customMessage = error.message.replace(/\"/g, "");
          if(customMessage.includes("fails to match the required pattern:")) {
            customMessage = "Invalid format"
          }
          if (customErrors.hasOwnProperty(error.context.key)) {
            customErrors[error.context.key].push(customMessage);
          } else {
            customErrors[error.context.key] = [customMessage];
          }
        }

        return res.status(422).json({fail:{ validationErrors: customErrors }});
      } else {
        req.body = validData;
        next();
      }
    }
  );
};

module.exports = validator;
