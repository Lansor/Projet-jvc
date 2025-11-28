export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: error.message,
        details: error.details.map((d) => d.message),
      });
    }

    req.body = value;
    next();
  };
};
