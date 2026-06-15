import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const details = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(new ApiError(400, 'Validation failed', details));
  }

  Object.assign(req, result.data);
  next();
};

export default validate;
