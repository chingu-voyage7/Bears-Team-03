const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required()
});

exports.registerSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required(),
  fullname: Joi.string()
    .trim()
    .min(2)
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required(),
  gender: Joi.string()
    .valid('male', 'female', 'other'),
  streetAddress: Joi.string()
    .trim()
    .allow('')
    .min(2),
  city: Joi.string()
    .trim()
    .allow('')
    .min(2),
  country:Joi.string()
    .trim()
    .allow('')
    .min(2),
  stateOrProvince: Joi.string()
    .trim()
    .allow('')
    .min(2),
  zipCode: Joi.string()
    .trim()
    .allow('')
    .min(2),
  phone: Joi.string()
    .trim()
    .allow('')
    .min(10),
  volunteerField: Joi.array().min(1).items(
    Joi.string().trim()
  )
    .required(),
  days: Joi.array().min(1).items(
                          Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' )
  ),
  hours: Joi.array().min(1).items(Joi.string().regex(/[:\d]+/))
});

exports.createProjectSchema = Joi.object({
  dueDate: Joi.string()
    .trim(),
  ownerId: Joi.string()
    .trim(),
  name: Joi.string()
    .trim()
    .min(3)
    .required(),
  description: Joi.string()
    .trim()
    .max(200),
  workFields: Joi.array().min(1).items(Joi.string()),
  address: Joi.string()
    .trim()
    .allow('')
    .min(3),
  country: Joi.string()
    .trim()
    .allow('')
    .min(2),
  workDays: Joi.array().min(1).items(
    Joi.string().valid('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' )
  ),
  from: Joi.string()
    .trim()
    .regex(/^\d{2}:\d{2}$/),
  to: Joi.string()
    .trim()
    .regex(/[:\d]+/),
  phone: Joi.string()
    .trim()
    .allow('')
    .min(10),
  email: Joi.string()
    .trim()
    .email()
    .required(),
  startDate:Joi.string().trim().allow(''),
  endDate:Joi.string().trim().allow(''),
  applicationRequirements:Joi.string().trim(),
  id:Joi.string().trim().allow(null).optional()
});