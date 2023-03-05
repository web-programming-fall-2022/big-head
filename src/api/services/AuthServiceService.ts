/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { runtimeError } from '../models/runtimeError';
import type { v1LoginRequest } from '../models/v1LoginRequest';
import type { v1LoginResponse } from '../models/v1LoginResponse';
import type { v1LogoutRequest } from '../models/v1LogoutRequest';
import type { v1RefreshTokenRequest } from '../models/v1RefreshTokenRequest';
import type { v1RefreshTokenResponse } from '../models/v1RefreshTokenResponse';
import type { v1RegisterRequest } from '../models/v1RegisterRequest';
import type { v1RegisterResponse } from '../models/v1RegisterResponse';
import type { v1UserInfoRequest } from '../models/v1UserInfoRequest';
import type { v1UserInfoResponse } from '../models/v1UserInfoResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthServiceService {
  /**
   * @param body
   * @returns v1LoginResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static authServiceLogin(
    body: v1LoginRequest
  ): CancelablePromise<v1LoginResponse | runtimeError> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/login',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param body
   * @returns any A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static authServiceLogout(
    body: v1LogoutRequest
  ): CancelablePromise<any | runtimeError> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/logout',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param body
   * @returns v1RefreshTokenResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static authServiceRefreshToken(
    body: v1RefreshTokenRequest
  ): CancelablePromise<v1RefreshTokenResponse | runtimeError> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/refresh',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param body
   * @returns v1RegisterResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static authServiceRegister(
    body: v1RegisterRequest
  ): CancelablePromise<v1RegisterResponse | runtimeError> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/register',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param body
   * @returns v1UserInfoResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static authServiceUserInfo(
    body: v1UserInfoRequest
  ): CancelablePromise<v1UserInfoResponse | runtimeError> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/userinfo',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }
}
