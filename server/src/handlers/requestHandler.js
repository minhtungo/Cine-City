import { validationResult } from 'express-validator';

//validate the request data
const validate = (req, res, next) => {
  //check the request data for any validation errors.
  const errors = validationResult(req);

  //check whether the errors list is empty or not
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  next();
};

export default { validate };
