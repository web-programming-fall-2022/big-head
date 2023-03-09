/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { runtimeError } from '../models/runtimeError';
import type { v1AddItemToFavoritesRequest } from '../models/v1AddItemToFavoritesRequest';
import type { v1AddItemToFavoritesResponse } from '../models/v1AddItemToFavoritesResponse';
import type { v1GetFavoritesResponse } from '../models/v1GetFavoritesResponse';
import type { v1RemoveItemFromFavoritesResponse } from '../models/v1RemoveItemFromFavoritesResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FavoriteServiceService {
  /**
   * @param body
   * @returns v1AddItemToFavoritesResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static favoriteServiceAddItemToFavorites(
    body: v1AddItemToFavoritesRequest
  ): CancelablePromise<v1AddItemToFavoritesResponse | runtimeError> {
    return __request(OpenAPI(), {
      method: 'POST',
      url: '/api/v1/favorite',
      body: body,
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param listName
   * @returns v1GetFavoritesResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static favoriteServiceGetFavorites(
    listName: string
  ): CancelablePromise<v1GetFavoritesResponse | runtimeError> {
    return __request(OpenAPI(), {
      method: 'GET',
      url: '/api/v1/favorite/{list_name}',
      path: {
        list_name: listName,
      },
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }

  /**
   * @param listName
   * @param productId
   * @returns v1RemoveItemFromFavoritesResponse A successful response.
   * @returns runtimeError An unexpected error response.
   * @throws ApiError
   */
  public static favoriteServiceRemoveItemFromFavorites(
    listName: string,
    productId: number
  ): CancelablePromise<v1RemoveItemFromFavoritesResponse | runtimeError> {
    return __request(OpenAPI(), {
      method: 'DELETE',
      url: '/api/v1/favorite/{list_name}/{product_id}',
      path: {
        list_name: listName,
        product_id: productId,
      },
      errors: {
        404: `Returned when the resource does not exist.`,
      },
    });
  }
}
