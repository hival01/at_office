/**
 * common/constants/messages.constants.ts — Response Messages
 *
 * Centralized response messages for consistent API responses.
 * Keeps all user-facing strings in one place for easy i18n later.
 */

export const ResponseMessages = {
  // Generic
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  INTERNAL_ERROR: 'Internal server error',

  // Auth
  AUTH_REQUIRED: 'Authentication required',
  INVALID_TOKEN: 'Invalid or expired token',
  ACCESS_DENIED: 'Access denied. Insufficient permissions',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',

  // Validation
  VALIDATION_ERROR: 'Validation failed',

  // Rate Limit
  RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
};
