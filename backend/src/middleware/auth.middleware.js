import { verifyAccessToken } from '../services/token.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const authenticate = catchAsync(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new ApiError(401, 'Authentication required');

  try {
    req.userId = verifyAccessToken(header.split(' ')[1]).sub;
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired access token');
  }
});

export default authenticate;
