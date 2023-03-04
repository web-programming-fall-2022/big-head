/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: 'include' | 'omit' | 'same-origin';
  TOKEN?: string | Resolver<string>;
  USERNAME?: string | Resolver<string>;
  PASSWORD?: string | Resolver<string>;
  HEADERS?: Headers | Resolver<Headers>;
  ENCODE_PATH?: (path: string) => string;
};

function getToken() {
  console.log('getToken', localStorage.getItem('auth'));
  return localStorage.getItem('auth') == null
    ? undefined
    : JSON.parse(localStorage.getItem('auth')!).authToken;
}

export const OpenAPI: OpenAPIConfig = {
  BASE: 'http://digivision.pouyaesmaili.ir:8082',
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: {
    Authorization: getToken(),
  },
  ENCODE_PATH: undefined,
};
