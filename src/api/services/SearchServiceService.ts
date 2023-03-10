/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { runtimeError } from '../models/runtimeError';
import type { runtimeStreamError } from '../models/runtimeStreamError';
import type { v1AsyncSearchResponse } from '../models/v1AsyncSearchResponse';
import type { v1CropRequest } from '../models/v1CropRequest';
import type { v1CropResponse } from '../models/v1CropResponse';
import type { v1SearchRequest } from '../models/v1SearchRequest';
import type { v1SearchResponse } from '../models/v1SearchResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { v1GetSearchHistoriesResponse } from '../models/v1GetSearchHistoriesResponse';

export class SearchServiceService {
  /**
   * @param body
   * @returns v1CropResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static searchServiceCrop(
    body: v1CropRequest
  ): CancelablePromise<v1CropResponse | runtimeError> {
    return __request(OpenAPI(), {
      method: 'POST',
      url: '/api/v1/crop',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param body
   * @returns v1SearchResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static searchServiceSearch(
    body: v1SearchRequest
  ): CancelablePromise<v1SearchResponse | runtimeError> {
    return __request(OpenAPI(), {
      method: 'POST',
      url: '/api/v1/search',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param body
   * @returns any A successful response.(streaming responses)
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static searchServiceAsyncSearch(
    body: v1SearchRequest
  ): CancelablePromise<
    | {
        result?: v1AsyncSearchResponse;
        error?: runtimeStreamError;
      }
    | runtimeError
  > {
    return __request(OpenAPI(), {
      method: 'POST',
      url: '/api/v1/search-async',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param offset
   * @param limit
   * @returns v1GetSearchHistoriesResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static searchServiceGetSearchHistories({
    offset,
    limit,
  }: {
    offset?: number;
    limit?: number;
  }): CancelablePromise<v1GetSearchHistoriesResponse | runtimeError> {
    return __request(OpenAPI(), {
      method: 'GET',
      url: '/api/v1/search-histories',
      query: {
        offset: offset,
        limit: limit,
      },
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }
}
