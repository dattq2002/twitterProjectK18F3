export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  //name
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  //email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  //password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',
  //user
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  //login
  LOGIN_SUCCESS: 'Login successfully',
  //register
  REGISTER_SUCCESS: 'Register successfully',
  //accessToken
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  //refreshToken
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Refresh token is invalid or does not exist',
  //logout
  LOGOUT_SUCCESS: 'Logout successfully',
  //verifyEmail
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  USER_BANNED: 'User banned',
  EMAIL_VERIFY_TOKEN_IS_NOT_MATCH: 'Email verify token is not match',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify successfully',
  RESEND_EMAIL_VERIFY_SUCCESS: 'Resend email verify successfully',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token successfully',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully',
  GET_ME_SUCCESS: 'Get me successfully',
  USER_NOT_VERIFIED: 'User is not verified',
  IMAGE_MUST_BE_A_STRING: 'Image must be a string',
  IMAGE_LENGTH_MUST_BE_FROM_1_TO_400: 'Image length must be from 1 to 400',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 200',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50',
  UPDATE_ME_SUCCESS: 'Update me successfully',
  GET_PROFILE_SUCCESS: 'Get profile successfully',
  INVALID_FOLLOWED_USER_ID: 'Invalid followed user id',
  FOLLOWED_USER_NOT_FOUND: 'Followed user not found',
  FOLLOWED: 'Followed',
  FOLLOW_SUCCESS: 'Follow successfully',
  INVALID_user_id: 'Invalid user id',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow successfully',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successfully',
  EMAIL_NOT_VERIFY: 'Email not verify',
  UPLOAD_SUCCESS: 'Upload successfully'
} as const //để k ai chỉnh đc

export const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',
  CONTENT_MUST_BE_NULL: 'Content must be null',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non-empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_user_id: 'Mentions must be an array of user id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object',
  CONTENT_MUST_BE_EMPTY_STRING: 'Content must be empty string',
  TWEET_CREATED_SUCCESSFULLY: 'Tweet created successfully',
  INVALID_TWEET_ID: 'Invalid tweet id',
  TWEET_NOT_FOUND: 'Tweet not found',
  TWEET_IS_NOT_PUBLIC: 'Tweet is not public'
} as const

export const BOOKMARK_MESSAGES = {
  BOOKMARK_SUCCESSFULLY: 'Bookmark successfully',
  UNBOOKMARK_SUCCESSFULLY: 'Unbookmark successfully'
}
export const LIKE_MESSAGES = {
  LIKE_SUCCESSFULLY: 'Like successfully',
  UNLIKE_SUCCESSFULLY: 'Unlike successfully'
}
